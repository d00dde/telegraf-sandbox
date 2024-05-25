import { Markup, Telegraf } from "telegraf";
import { TelegramSubscribe } from "./TelegramSubscribe.js"
import { TelegramContacts } from "./TelegramContacts.js"


export const Coins = ["btc", "eth", "usdt"];

export function getSubMenu() {
  return Markup.inlineKeyboard(Coins.map((item) =>  Markup.button.callback(item, item)), {columns: 2});
}

export const users = [];

class TelegramBot {
  constructor() {
    this.bot = new Telegraf("lol");
    this.subscribe = new TelegramSubscribe(this.bot);
    this.contacts = new TelegramContacts(this.bot);
  }

  async start() {
    this.bot.command("start", async (ctx) => {
      users.push({
        telegramId: ctx.update.message.from.id,
        userId: null,
        watchCoins: [],
      })
      ctx.reply("Добро пожаловать! Нажмите на кнопку ниже, чтобы начать.", getSubMenu());
    });

    this.subscribe.init();
    this.contacts.init();

    this.bot.on("text", async (ctx) => {
      console.log(ctx.update.message.chat.id);
      console.log(ctx.update.message.text);
      ctx.reply("Не понял запрос");
    });
    await this.bot.launch();
    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
  }

  broadcast() {
    setInterval(async () => {
      for (const user of users) {
        await this.bot.telegram.sendMessage(user.telegramId, `You subscribe to ${user.watchCoins.join(",")}`);
      }
    }, 5000);
  }
}

const telegramBot = new TelegramBot();
await telegramBot.start();
telegramBot.broadcast();


