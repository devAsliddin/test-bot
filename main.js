const { Telegraf, Markup } = require("telegraf");
const bot = new Telegraf("7235249254:AAHyySjId4aHCp_cUCVKhtAK4-jNskjk4v8");

const gameSessions = {};
const truthQuestions = [
  "Sizning eng katta siringiz nima?",
  "Oxirgi marta kimni aldagansiz?",
  "Sizni eng hayratlantirgan voqea nima?",
  "Siz biror marta yuragingizni sindirganmisiz?",
  "Hayotingizdagi eng katta pushaymonligingiz nima?",
  "Do‘stlaringizdan nimani yashirgan bo‘lardingiz?",
  "Hech kim bilmaydigan biror odatingiz bormi?",
  "Qachon oxirgi marta yig‘lagansiz?",
  "Siz hozir kimni sog‘inyapsiz?",
  "Sizning eng katta qo‘rquvingiz nima?",
  "O‘zligingizni yo‘qotgan holatingiz bo‘lganmi?",
  "Yolg‘iz qolgan paytingizda eng ko‘p o‘ylaydigan narsangiz nima?",
  "Yoshlikdagi eng kulgili holatingiz nima edi?",
  "Sizga kim eng ko‘p ta’sir qilgan?",
  "Eng yoqtirmaydigan inson turi qanday?",
  "Haqiqiy sevgi haqida nima deb o‘ylaysiz?",
  "Biror marta qalbingizni aldab sevganmisiz?",
  "Kim bilan eng ko‘p tortishgansiz?",
  "Siz kimga yuragingizni ocholmaysiz?",
  "Siz uchun baxt nimani anglatadi?",
  "Ota-onangizdan yashirgan eng katta sir nima?",
  "Biror marta ikkiyuzlamachilik qilganmisiz?",
  "Hech kimga aytmagan sevgilingiz bo‘lganmi?",
  "Siz uchun do‘stlikning eng muhim jihati nima?",
  "Hayotingizda biror marta o‘zingizdan voz kechganmisiz?",
  "Eng oxirgi ko‘rgan tushingizni eslaysizmi?",
  "O‘zingiz haqingizda eshitgan eng g‘alati mish-mish nima?",
  "Eng katta g‘alabangiz qaysi?",
  "Kimning fikri siz uchun eng muhim?",
  "Sizningcha ideal inson qanday bo‘ladi?",
  "Hech kimga aytolmagan orzuyingiz nima?",
  "Yolg‘on gapirib, biror holatdan qutulgansizmi?",
  "Sizni eng ko‘p kamsitgan odam kim bo‘lgan?",
  "Hayotingizda biror marta o‘zingizni yolg‘iz his qilgansizmi?",
  "Qaysi insonni hech qachon kechirolmaysiz?",
  "Eng katta xatoyingiz nima edi?",
  "Kimdir sizni sevadiganini bilib, ataylab sovuq bo‘lgansizmi?",
  "Biror narsani o‘g‘irlagansizmi?",
  "Siz uchun eng romantik narsa nima?",
  "Hayotingizda sizni eng ko‘p yig‘latgan inson kim?",
  "Qaysi holatda qalbingiz eng ko‘p og‘rigan?",
  "Do‘stingizdan yashirayotgan haqiqat nima?",
  "O‘zingizni aldab yashayotganingizni sezganmisiz?",
  "Hech kimga ishonolmay qolgan holatingiz bo‘lganmi?",
  "Sevgan odamingiz sizni yoqtirmagan holat bo‘lganmi?",
  "Hech kimni ko‘rmasangiz ham yashay olasizmi?",
  "Qachon oxirgi marta o‘zingizdan faxrlangansiz?",
  "O‘zingiz haqingizda eshitib, ko‘nglingiz og‘rigan gap nima edi?",
  "Hech kimga aytolmagan qo‘rquvingiz nima?",
  "Hayotingizdagi eng go‘zal daqiqa qaysi edi?",
  "Sevgi uchun nimalardan voz kecha olasiz?",
  "Eng ko‘p afsuslangan so‘zlaringiz qaysilar?",
  "Do‘stlaringiz siz haqingizda bilmasligi kerak bo‘lgan sir bormi?",
  "Kimni yurakdan yoqtirasiz, lekin aytolmaysiz?",
  "Siz uchun 'kechirim' degani nima?",
  "Qanday voqea sizni ichki jihatdan o‘zgartirib yuborgan?",
  "Biror kishi sizni rad etganmi?",
  "Biror narsani yashirib, hozirgacha hech kimga aytmagansizmi?",
  "Qanday xatoni qayta-qayta qilaverasiz?",
  "Sizni kim chindan tushunadi deb hisoblaysiz?",
  "Qaysi vaqt siz uchun eng og‘ir bo‘lgan?",
  "Qanday odamlar sizga yoqmaydi?",
  "Kim bilan vaqt o‘tkazishni istamaysiz, lekin majbursiz?",
  "Siz uchun 'uy' nimani anglatadi?",
  "Hech kim sizdan kutmagan ishingiz nima bo‘lgan?",
  "Eng ko‘p pushaymon qilgan vaqtingiz?",
  "Eng yaqin insoningiz bilan bo‘lgan eng katta sir nima?",
  "Hech kim bilmaydigan qobiliyatingiz bormi?",
  "Hech kimga aytolmagan orzuingiz nima?",
  "Qanday so‘z yuragingizni tilka-pora qilgan?",
  "Hech qachon kimnidir sevishni istamasangiz ham sevib qolganmisiz?",
  "Siz uchun 'yolg‘izlik' qanday tuyg‘u?",
  "Eng ko‘p kimni sog‘ingansiz?",
  "Hayotingizdagi eng yomon qaroringiz qaysi?",
  "Sizni hayotingizda eng ko‘p kim asragan?",
  "Oxirgi marta kimdan ranjisiz?",
  "Hech kimga bildirmagan his-tuyg‘ularingiz bormi?",
  "O‘zingizga yoqmagan fe'l-atvoringiz?",
  "Biror marta o‘zingizni yo‘qotgan holatga tushganmisiz?",
  "Siz uchun eng muhim narsa nima?",
  "Qaysi insonni sog‘inmasangiz ham, har doim yodingizda?",
  "Hech qachon kechirishni istamagan insoningiz?",
  "Do‘stingizga aytolmagan gapni hozir ayta olasizmi?",
  "Hech kimga kerak emasdek his qilgan paytingiz bo‘lganmi?",
  "Hech kimga aytolmagan birinchi muhabbatingiz kim edi?",
  "Hayotingizni o‘zgartirgan bir voqea?",
  "Qachon sizni soxta do‘stlar tark etgan?",
  "Sizni chin dildan tushunadigan odam bormi?",
  "Hayotingizdagi eng katta qiyinchilik nima edi?",
  "Sevgi sizni qanday insonga aylantirgan?",
  "Qanday inson bilan bir umr birga bo‘lishni xohlaysiz?",
  "Hayotda eng ko‘p kimdan minnatdorsiz?",
  "O‘zingizni biror paytda noloyiq his qilganmisiz?",
  "Hech qachon unutolmaydigan so‘z?",
  "Oxirgi marta kim sizni kuldirdi?",
  "Kim uchun yuragingiz hali ham ochiq?",
  "Sizni biror narsa yig‘latgan film bormi?",
  "english or spanish ?",
  "Hech kim eslamasa ham, eslashni istagan holatingiz?",
  "Siz uchun haqiqatmi muhim yoki baxtmi?",
  "Hech kimga aytolmagan savolingiz nima?",
];
const dareChallenges = [
  "Biror kishiga kulgili ovozda 3 ta ovozli xabar jo‘nating!",
  "Guruhga rasmingizni emoji filter bilan joylang!",
  "Kimdir buyurgan narsani bajaring!",
  "Guruhdagi bir kishiga sevgi izhor qiling (soxta)!",
  "1 daqiqa ichida 5 ta meme yuboring!",
  "Ismingizni 3 xil kulgili tarzda yozing va joylang.",
  "Ovozli xabarda 10 soniya ichida o‘zingiz haqingizda 5 ta fakt ayting.",
  "Guruhdagi istalgan odamga 'men sizni doim kuzataman' deb yozing 😂",
  "Profil rasmingizni 10 daqiqaga multfilm qahramoniga o‘zgartiring.",
  "Biror kishidan “Sen menga yoqasan” deb so‘ralsin, nima deysiz?",
  "Telegram statusingizni 15 daqiqaga “Men hozir dars qilyapman” qilib qo‘ying (hatto dars qilmasangiz ham 😅)",
  "Boshqalar aytgan so‘zni rap qilib ayting va ovozli yuboring!",
  "O‘zingizni mashhur aktyor/aktrisadek tutib, 5 daqiqa shunaqa yozing.",
  "Guruhdagi bir kishiga “Siz haqingizda tush ko‘rdim...” deb yozing.",
  "Guruhga kulgili gif yuboring va nima uchun o‘zingizga o‘xshashini tushuntiring.",
  "Telefoningizda eng oxirgi olgan selfini joylang.",
  "'Bugun men tovuqman 🐔' deb status qo‘ying!",
  "Kimdir aytgan raqam bo‘yicha kontaktlaringizdan birortasiga “Salom, seni sog‘indim” deb yozing.",
  "Biror kishini xayoliy tanqid qilib voice yozing.",
  "Guruhdagi bir a’zoni maqtab she’r yozing.",
  "So‘nggi qaysi xatoni qildingiz? Hamma oldida yozing.",
  "Boshqalar aytgancha, birdaniga 3 ta emoji bilan o‘z holatingizni ifodalang.",
  "Telefon galereyangizdagi eng g‘alati rasmingizni guruhga tashlang.",
  "Guruhdagi bir a’zoga 'Sen men uchun maxsussan ❤️' deb yozing.",
  "O‘z tilingizdan boshqa tilda bir gap ayting (Google Translate bo‘lsa ham mayli 😆)",
  "1 daqiqada 10 ta hayvon ismini yozing!",
  "'Kim meni yoqtiradi?' deb guruhga yozing.",
  "Kimgadir “Bugun senga tush ko‘rdim” deb yozing.",
  "Raqam tanlang: 1-50. Shuncha push-up qiling (yolg‘ondan ham bo‘lsa, e’tirof eting 😅).",
  "Sevimli qo‘shig‘ingizni xonandalardek ayting va voice yuboring.",
  "Statusga “Men yutqazdim, endi barchaga kofe olib beraman” deb yozing.",
  "3 ta mashhur kishini o‘zingizga o‘xshatib yozing.",
  "Guruhda teskari yozuvda bir gap yozing.",
  "Eng oxirgi screenshotingizni tashlang.",
  "O‘zingizni robot deb tasavvur qilib gaplashing 5 daqiqa davomida.",
  "Kimgadir 'Ishonmasangiz ham, men kosmonavtman' deb yozing.",
  "O‘zingizni reklama qiluvchi sifatida tanishtiring.",
  "Profilingizga “Bugun g‘alati kun” deb yozing va 30 daqiqa saqlang.",
  "O‘zingiz haqingizda haqiqat bo‘lmagan 3 ta fakt yozing.",
  "5 soniyada o‘zingizni tanishtiring — voice orqali.",
  "Guruhdagi kim bilandir telefon orqali gaplashing (agar rozilik bersa).",
  "Guruhga 'kim meni eng yaxshi taniydi?' testi yozing.",
  "Kimnidir ijtimoiy tarmoqdagi suratini maqtang.",
  "10 ta kulgili so‘z topib, gap tuzing.",
  "Telefoningizdagi eng ko‘p yozilgan emoji qaysi? Guruhga yuboring.",
  "“Men muhabbatman” deb voice yozing.",
  "Boshqalar aytgan so‘z asosida she’r yozing.",
  "O‘zingizdan 5 yosh kichik insonga maslahat yozing.",
  "Guruhdagi kim bilandir tanishuv suhbatini boshlang (soxta bo‘lsa ham).",
  "Emoji bilan biror mashhur film nomini ifodalang.",
  "Guruhdagi barcha a’zolarga o‘zbekcha laqab qo‘ying.",
  "3 ta haqiqat, 1 ta yolg‘on yozing – boshqalar topsin.",
  "So‘nggi marotaba qachon ko‘nglingiz qolganini voice orqali ayting.",
  "Guruhga qiziqarli fakt yozing.",
  "2 ta qarama-qarshi his-tuyg‘uni bir gapda ifodalang.",
  "O‘zingizni muallim deb tasavvur qilib, dars o‘ting.",
  "Siz bilan 1 daqiqa suhbat qurishni istagan odamni tanlang.",
  "Telefoningizdagi eng eski selfini yuboring.",
  "Sevgi haqida o‘zingiz yozgan bir gapni ulashing.",
  "Guruhdagi 1 kishiga kulgili intervyu yozing.",
  "Kimgadir “Menga yordam kerak” deb yozing, nima deydi?",
  "5 ta g‘alati emoji bilan gap tuzing.",
  "Statusga “Meni kim sevadi?” deb yozing.",
  "Kimgadir tasodifiy “salom 😏” deb yozing.",
  "O‘zingizni yulduz deb tasavvur qilib, intervyu bering.",
  "Ismingizdan iborat shior uylab toping.",
  "Guruhdagi eng kulgili inson kim? Voice ayting!",
  "O‘zingizni dinozavr deb tasavvur qilib gaplashing.",
  "Biror a’zoning ismiga she’r bag‘ishlang.",
  "'Bugun menga omad kulib boqdi 😎' deb status yozing.",
  "Bir daqiqa ichida 5 ta mashhur TikTok trendlari sanab bering.",
  "Eng yoqtirmagan taomingizni tan oling.",
  "O‘zingizni ko‘zgu oldida maqtang va tasvirlab yozing.",
  "10 ta sevgi so‘zini boshqa tilda yozing.",
  "Hech kimga aytmagan sirni yozing (yolg‘on bo‘lsa ham).",
  "Guruhda 'bugun men jamiyatga foyda keltirdim' deb yozing va sababini ayting.",
  "Guruhga “bugun men yulduzman ⭐️” deb voice yozing.",
  "Harflarni teskari yozing: “salom” → “molas”.",
  "O‘zingizga laqab o‘ylab toping va 1 soat ushlab turing.",
  "Voice-da kulgili tovush bilan “men senga oshiqman” deb ayting.",
  "'Men bugun yulduzlar bilan gaplashdim' deb status yozing.",
  "Biror odamga “sizni tushimda ko‘rdim” deb yozing.",
  "3 ta kinoni emoji bilan ifodalang.",
  "Guruhdagi 2 kishining ismiga sherik ismlar uylab toping.",
  "O‘zingizni prezident deb tasavvur qilib, qaror chiqaring.",
  "Guruhdagi eng jiddiy a’zoga kulgili laqab bering.",
  "10 soniyada 5 ta ism ayting (video/voice).",
  "Guruhdagi kim bilandir hazil tariqasida urushib oling 😄",
  "Voice yuboring: “Men sizga sir aytmoqchiman...”",
  "3 ta emoji yordamida bugungi kayfiyatingizni tushuntiring.",
  "'Bugun hamma mendan ko‘proq sevadi' deb guruhga yozing.",
  "O‘zingiz haqingizda maqol to‘qib yozing.",
  "1 daqiqada 10 ta raqamni teskari sanang – ovozli.",
  "Kimdir sizga buyruq bersin – siz bajarishingiz kerak.",
  "Guruhga 3 ta eng g‘alati so‘zni yozing.",
  "So‘nggi yozgan SMS’ingizni nusxalab guruhga yuboring.",
  "Eng sevgan hayvoningizni taqlid qiling – voice.",
  "5 ta emoji bilan o‘zingizni tanishtiring.",
  "Kim bilandir duet yozuv (she’r, rap yoki hikoya) boshlang.",
  "Guruhga “Men bugun dare yutqazdim...” deb voice yozing 😂",
];

// /game
bot.command("game", async (ctx) => {
  const chatId = ctx.chat.id;
  if (ctx.chat.type === "private") return;

  if (gameSessions[chatId])
    return ctx.reply("⏳ O'yin allaqachon boshlanmoqda...");

  gameSessions[chatId] = {
    registered: [],
    started: false,
    extraTime: 0,
    timer: null,
    pairs: [],
    currentPairIndex: 0,
    timeoutId: null,
    reminderInterval: null,
    playersListMessageId: null,
    hasEnded: false,
  };

  const link = `https://t.me/${ctx.botInfo.username}?start=join_${chatId}`;
  const msg = await ctx.reply(
    `🎮 O'yin boshlandi! 2 daqiqa ichida qo‘shiling.\n👇 Tugmani bosing:`,
    Markup.inlineKeyboard([Markup.button.url("➕ O‘yinga qo‘shilish", link)])
  );
  gameSessions[chatId].messageId = msg.message_id;

  startJoinTimer(ctx, chatId, 2 * 60 * 1000);
});

// Join timer
function startJoinTimer(ctx, chatId, time) {
  if (gameSessions[chatId].timer) clearTimeout(gameSessions[chatId].timer);
  gameSessions[chatId].timer = setTimeout(() => {
    const session = gameSessions[chatId];
    if (!session || session.registered.length < 4) {
      ctx.reply("❌ Yetarli o'yinchi yo‘q. O‘yinni boshlash bekor qilindi.");
      delete gameSessions[chatId];
      return;
    }
    session.started = true;
    ctx.reply(
      `✅ ${session.registered.length} o'yinchi ro‘yxatdan o‘tdi. O‘yin boshlanmoqda...`
    );
    startGame(ctx, chatId);
  }, time);
}

// /moretime — vaqtni 1 daqiqaga uzaytirish
bot.command("moretime", async (ctx) => {
  const chatId = ctx.chat.id;
  const session = gameSessions[chatId];
  if (!session || session.started)
    return ctx.reply("❌ Vaqt uzaytirib bo‘lmaydi.");

  if (session.extraTime >= 3)
    return ctx.reply("⛔ Vaqt maksimal darajaga yetgan (5 daqiqa).");

  session.extraTime += 0.3;
  const extraMillis = session.extraTime * 60 * 1000;
  const newTime = 2 * 60 * 1000 + extraMillis;

  startJoinTimer(ctx, chatId, newTime);

  ctx.reply(
    `⏳ Vaqt yana 30 sekunga uzaytirildi. Umumiy kutish vaqti: ${
      2 + session.extraTime
    } daqiqa.`
  );
});

// /startnow — hozir o‘yinni boshlash
bot.command("startnow", async (ctx) => {
  const chatId = ctx.chat.id;
  const session = gameSessions[chatId];
  if (!session || session.started)
    return ctx.reply("❌ O'yin boshlanmagan yoki allaqachon boshlangan.");
  if (session.registered.length < 4)
    return ctx.reply("⚠️ Kamida 4 o‘yinchi kerak.");

  clearTimeout(session.timer);
  session.started = true;
  ctx.reply(`🚀 O'yin oldinroq boshlanmoqda!`);
  startGame(ctx, chatId);
});

// /start orqali o‘yinga qo‘shilish
bot.start(async (ctx) => {
  const payload = ctx.startPayload;
  if (!payload || !payload.startsWith("join_"))
    return ctx.reply(
      "👋 Salom! Guruhda /game buyrug‘i orqali o‘yinga qo‘shiling."
    );

  const chatId = Number(payload.replace("join_", ""));
  const session = gameSessions[chatId];
  if (!session || session.started)
    return ctx.reply("❌ O‘yinga qo‘shib bo‘lmaydi.");

  const already = session.registered.find((u) => u.id === ctx.from.id);
  if (already) return ctx.reply("✅ Siz allaqachon qo‘shilgansiz.");
  if (session.registered.length >= 20) return ctx.reply("⚠️ O‘yin to‘la.");

  session.registered.push({ id: ctx.from.id, name: ctx.from.first_name });

  const list = session.registered.map((u) => `✅ ${u.name}`).join("\n");
  const text = `📋 Ro‘yxatdan o‘tganlar (${session.registered.length}/20):\n${list}`;

  if (session.playersListMessageId) {
    try {
      await bot.telegram.editMessageText(
        chatId,
        session.playersListMessageId,
        undefined,
        text
      );
    } catch {}
  } else {
    const msg = await bot.telegram.sendMessage(chatId, text);
    session.playersListMessageId = msg.message_id;
  }

  ctx.reply(`🎉 Salom, ${ctx.from.first_name}! Siz o‘yinga qo‘shildingiz.`);
});

// O‘yinni boshlash
function startGame(ctx, chatId) {
  const session = gameSessions[chatId];
  const players = [...session.registered].sort(() => Math.random() - 0.5);

  while (players.length >= 2) {
    session.pairs.push([players.pop(), players.pop()]);
  }

  sendNextPair(ctx, chatId);
}

// Navbatdagi juftlik
function sendNextPair(ctx, chatId) {
  const session = gameSessions[chatId];
  if (session.reminderInterval) clearInterval(session.reminderInterval);
  if (session.timeoutId) clearTimeout(session.timeoutId);

  if (session.currentPairIndex >= session.pairs.length) {
    ctx.reply("🎉 Barcha juftliklar o‘ynadi! O‘yin tugadi.");
    delete gameSessions[chatId];
    return;
  }

  const [a, b] = session.pairs[session.currentPairIndex];

  ctx.reply(
    ` ${a.name} savol beradi\n ${b.name} javob beradi\n👇 Tanlang yoki botdan savol yoki shartni oling:`,
    Markup.inlineKeyboard([
      Markup.button.callback("🧐 Savol tanlash", `question_${chatId}`),
      Markup.button.callback("🔥 Shart tanlash", `dare_${chatId}`),
      Markup.button.callback("🤖 Bot tanlasin", `bot_choice_${chatId}`),
      Markup.button.callback("❌ O‘yin tugadi", `end_${chatId}`),
    ])
  );

  session.hasEnded = false;

  // Avtomatik yakun: 2 daqiqa
  session.timeoutId = setTimeout(() => {
    if (!session.hasEnded) {
      ctx.reply(`⏳ Juftlik vaqt tugadi. Navbatdagilar chiqmoqda.`);
      session.currentPairIndex++;
      sendNextPair(ctx, chatId);
    }
  }, 2 * 60 * 1000);

  // 30s eslatma
  session.reminderInterval = setInterval(() => {
    if (!session.hasEnded) {
      ctx.reply(`🔔 ${a.name} va ${b.name}, tugmalardan birini tanlang!`);
    }
  }, 30 * 1000);
}

// Savol yoki shartni tanlash yoki bot tanlashi
bot.on("callback_query", async (ctx) => {
  const data = ctx.callbackQuery.data;
  const [type, chatIdStr] = data.split("_");
  const chatId = Number(chatIdStr);
  const session = gameSessions[chatId];
  if (!session) return ctx.answerCbQuery("❌ O‘yin topilmadi.");

  const [a, b] = session.pairs[session.currentPairIndex];
  if (![a.id, b.id].includes(ctx.from.id))
    return ctx.answerCbQuery("⛔ Siz bu juftlikda emassiz.");

  if (type === "question") {
    const q = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
    await ctx.reply(`🧐 Savol: ${q}`);
  }

  if (type === "dare") {
    const q = dareChallenges[Math.floor(Math.random() * dareChallenges.length)];
    await ctx.reply(`🔥 Shart: ${q}`);
  }

  if (type === "bot_choice") {
    const randomChoice = Math.random() < 0.5 ? "question" : "dare"; // Randomly pick question or dare
    if (randomChoice === "question") {
      const q =
        truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
      await ctx.reply(`🧐 Savol: ${q}`);
    } else {
      const q =
        dareChallenges[Math.floor(Math.random() * dareChallenges.length)];
      await ctx.reply(`🔥 Shart: ${q}`);
    }
  }

  if (type === "end") {
    session.hasEnded = true;
    clearTimeout(session.timeoutId);
    clearInterval(session.reminderInterval);
    session.currentPairIndex++;
    sendNextPair(ctx, chatId);
  }

  ctx.answerCbQuery();
});

// Savol yoki shartni tanlash
bot.on("callback_query", async (ctx) => {
  const data = ctx.callbackQuery.data;
  const [type, chatIdStr] = data.split("_");
  const chatId = Number(chatIdStr);
  const session = gameSessions[chatId];
  if (!session) return ctx.answerCbQuery("❌ O‘yin topilmadi.");

  const [a, b] = session.pairs[session.currentPairIndex];
  if (![a.id, b.id].includes(ctx.from.id))
    return ctx.answerCbQuery("⛔ Siz bu juftlikda emassiz.");

  if (type === "question") {
    const q = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
    await ctx.reply(`🧐 Savol: ${q}`);
  }

  if (type === "dare") {
    const q = dareChallenges[Math.floor(Math.random() * dareChallenges.length)];
    await ctx.reply(`🔥 Shart: ${q}`);
  }

  if (type === "end") {
    session.hasEnded = true;
    clearTimeout(session.timeoutId);
    clearInterval(session.reminderInterval);
    session.currentPairIndex++;
    sendNextPair(ctx, chatId);
  }

  ctx.answerCbQuery();
});

bot.launch().then(() => console.log("✅ Bot ishga tushdi"));
