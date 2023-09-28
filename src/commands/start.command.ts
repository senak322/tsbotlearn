import { Telegraf, Markup } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx.session);
      ctx.reply(
        "Вам понравилось обслуживание?",
        Markup.inlineKeyboard([
          Markup.button.callback("👍", "course_like"),
          Markup.button.callback("👎", "course_dislike"),
        ])
      );
    });
    this.bot.action("course_like", (ctx) => {
        ctx.session.courseLike = true
        ctx.editMessageText("Рады, что Вам понравилось")
    })
    this.bot.action("course_dislike", (ctx) => {
        ctx.session.courseLike = false
        ctx.editMessageText("Жаль, что Вам не понравилось. Мы обязательно сделаем наш сервис лучше")
    })
  }
}
