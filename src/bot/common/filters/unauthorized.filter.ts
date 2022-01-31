import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
  async catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const telegraf = TelegrafArgumentsHost.create(host);
    const ctx = telegraf.getContext<Context>();
    await ctx.reply(`Ошибка доступа`);
  }
}
