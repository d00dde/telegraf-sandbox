import { users } from "./index.js";


export class TelegramContacts {
  constructor(bot) {
    this.bot = bot;
  }

  init() {
    this.bot.on("contact", (ctx) => {
      const user = users.find((item) => item.telegramId === ctx.message.contact.user_id);
      user.userId = ctx.message.contact.phone_number;
      // console.log(ctx.message.contact.phone_number);
      // console.log(ctx.message.contact.user_id);
      // const contact = ctx.message.contact;
      ctx.reply("Ваши данные сохранены");
    });
  }
}
