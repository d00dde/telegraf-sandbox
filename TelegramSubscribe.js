import { Markup } from "telegraf";
import { Coins, getSubMenu, users } from "./index.js";


export class TelegramSubscribe {
  constructor(bot) {
    this.bot = bot;
  }

  init() {
    this.bot.action(Coins, (ctx) => {
      // console.log(ctx.update.callback_query.data);
      // console.log(ctx.update.callback_query.from.id);.
      console.log(ctx.match[0])
      const user = users.find((item) => item.telegramId === ctx.update.callback_query.from.id);
      user.watchCoins.push(ctx.update.callback_query.data);
      ctx.reply("Вы успешно подписались на обновление курсов!", Markup.keyboard([
        Markup.button.text("Отписаться"),
        Markup.button.contactRequest("Авторизация", !!user.userId),
        Markup.button.text("Портфель", !user.userId),
      ], { columns: 2 }));
    });

    this.bot.hears("Отписаться", async (ctx) => {
      // users = users.filter((item) => item.telegramId !== ctx.update.message.chat.id);
      await ctx.reply("Вы успешно отписались от обновления курсов!", Markup.removeKeyboard());
      await ctx.reply("Вы можете подписаться снова.", getSubMenu());
    });

    this.bot.hears("lol", async (ctx) => {
      const user = users.find((item) => item.telegramId === ctx.update.message.chat.id);
      await ctx.reply(`Вот тебе портфель по номеру ${user.userId}`, Markup.keyboard([
        Markup.button.text("Купить биткоин"),
        Markup.button.text("Купить догикоин", !!user.userId),
      ], { columns: 4 }));
    });
  }
}
