const { Telegraf, Markup } = require("telegraf");
const bot = new Telegraf("7816861878:AAEJpgBFQ-gZSI7lvJBAR1-WjNKme3FL2xk");

const gameSessions = {}; // chatId => session

const truthQuestions = [
  "Sizning eng katta siringiz nima?",
  "Oxirgi marta kimni aldagansiz?",
  "Sizni eng hayratlantirgan voqea nima?",
];

const dareChallenges = [
  "Biror kishiga kulgili ovozda 3 ta ovozli xabar jo‘nating!",
  "Guruhga rasmingizni emoji filter bilan joylang!",
  "Kimdir buyurgan narsani bajaring!",
];

// /game komandasi
bot.command("game", async (ctx) => {
  const chatId = ctx.chat.id;
  if (ctx.chat.type === "private") return;

  // ✅ Yangi tekshiruv: o‘yinda davom etayotgan session bor-yo‘qligini tekshiramiz
  const existingGame = gameSessions[chatId];
  if (existingGame && (!existingGame.started || existingGame.started)) {
    return ctx.reply(
      "⚠️ O'yin allaqachon boshlangandi yoki hali tugamadi. Iltimos, mavjud o‘yinni yakunlang."
    );
  }

  // ✅ Yangi session boshlaymiz
  gameSessions[chatId] = {
    registered: [],
    started: false,
    messageId: null,
    playersListMessageId: null,
    pairs: [],
    currentPairIndex: 0,
  };

  const link = `https://t.me/${ctx.botInfo.username}?start=join_${chatId}`;

  const sentMsg = await ctx.reply(
    `🎮 O'yin boshlandi! 2 daqiqa ichida qo‘shiling!\n👇 Tugmani bosing:`,
    Markup.inlineKeyboard([Markup.button.url("➕ O‘yinga qo‘shilish", link)])
  );

  gameSessions[chatId].messageId = sentMsg.message_id;

  // 2 daqiqa kutish
  setTimeout(() => {
    const session = gameSessions[chatId];
    if (!session || session.registered.length < 4) {
      ctx.reply("❌ Yetarli o'yinchi yo‘q. O'yin bekor qilindi.");
      delete gameSessions[chatId];
      return;
    }

    session.started = true;
    ctx.reply(
      `✅ ${session.registered.length} o'yinchi ro'yxatdan o'tdi. O‘yin boshlanmoqda...`
    );
    startGame(ctx, chatId);
  }, 2 * 60 * 1000);
});

// /start komandasi orqali ro'yhatdan o'tish
bot.start(async (ctx) => {
  const payload = ctx.startPayload;
  if (!payload || !payload.startsWith("join_")) {
    return ctx.reply("👋 Salom! o'ynash uchun /game ni yozing.");
  }

  const chatId = Number(payload.replace("join_", ""));
  const session = gameSessions[chatId];

  if (!session) return ctx.reply("❌ O'yin topilmadi yoki tugagan.");
  if (session.started)
    return ctx.reply(
      "⛔ O'yin allaqachon boshlangan. Endi qo‘shilish mumkin emas."
    );

  const exists = session.registered.find((u) => u.id === ctx.from.id);
  if (exists) return ctx.reply("✅ Siz allaqon o‘yinga qo‘shilgansiz.");

  if (session.registered.length >= 20) {
    return ctx.reply("⚠️ O‘yin to‘la.");
  }

  session.registered.push({ id: ctx.from.id, name: ctx.from.first_name });

  const namesList = session.registered.map((u) => `✅ ${u.name}`).join("\n");
  const text = `📋 Ro‘yxatdan o‘tganlar (${session.registered.length}/20):\n${namesList}`;

  // Bitta xabarni yangilab turish
  if (session.playersListMessageId) {
    try {
      await bot.telegram.editMessageText(
        chatId,
        session.playersListMessageId,
        undefined,
        text
      );
    } catch (e) {
      console.error("❌ Ro'yxatni yangilashda xatolik:", e);
    }
  } else {
    const listMsg = await bot.telegram.sendMessage(chatId, text);
    session.playersListMessageId = listMsg.message_id;
  }

  ctx.reply(`🎉 Salom, ${ctx.from.first_name}! Siz o‘yinga qo‘shildingiz.`);
});

// O'yinni boshlash
function startGame(ctx, chatId) {
  const session = gameSessions[chatId];
  const players = [...session.registered].sort(() => 0.5 - Math.random());

  while (players.length >= 2) {
    const p1 = players.pop();
    const p2 = players.pop();
    session.pairs.push([p1, p2]);
  }

  sendNextPair(ctx, chatId);
}

// Keyingi juftlikni yuborish
function sendNextPair(ctx, chatId) {
  const session = gameSessions[chatId];
  if (session.currentPairIndex >= session.pairs.length) {
    ctx.reply("🎉 Barcha juftliklar tugadi! O‘yiningiz uchun rahmat!");
    delete gameSessions[chatId];
    return;
  }

  const [asker, answerer] = session.pairs[session.currentPairIndex];

  ctx.reply(
    `🙋‍♂️ ${asker.name} savol beradi\n🙋‍♀️ ${answerer.name} javob beradi\nTanlang:`,
    Markup.inlineKeyboard([
      Markup.button.callback("🧐 Haqiqat", `truth_${chatId}`),
      Markup.button.callback("🔥 Jasorat", `dare_${chatId}`),
      Markup.button.callback("✅ End", `end_${chatId}`),
    ])
  );
}

// Callbacklar
bot.on("callback_query", async (ctx) => {
  const data = ctx.callbackQuery.data;
  const [type, chatId] = data.split("_");
  const session = gameSessions[Number(chatId)];
  if (!session) return ctx.answerCbQuery("O'yin topilmadi!");

  // Check if the user is part of the current pair
  const [asker, answerer] = session.pairs[session.currentPairIndex];
  if (![asker.id, answerer.id].includes(ctx.from.id)) {
    return ctx.answerCbQuery("Siz hozirgi juftlikda emassiz. Iltimos kuting.");
  }

  if (type === "truth") {
    const q = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
    await ctx.reply(`🧐 Haqiqat savoli: ${q}`);
  }

  if (type === "dare") {
    const q = dareChallenges[Math.floor(Math.random() * dareChallenges.length)];
    await ctx.reply(`🔥 Jasorat topshirig‘i: ${q}`);
  }

  if (type === "end") {
    session.currentPairIndex++;
    sendNextPair(ctx, Number(chatId));
  }

  ctx.answerCbQuery();
});

bot.launch();
