import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { SessionContext } from '../../types';
import { SimpleTextTemplate } from '../../templates/simpleText.template';
import { Template } from '../../templates/template';

@Injectable()
export class TemplateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(async (data) => {
        if (!TemplateInterceptor.isTemplate(data)) return data;
        const template: Template = data;
        const tgCtx = TemplateInterceptor.getTelegrafContext(context);
        if (TemplateInterceptor.isNewMessage(tgCtx)) {
          await tgCtx.replyWithHTML(
            await template.getText(),
            template.getMarkup(),
          );
        } else {
          await tgCtx.editMessageText(await template.getText(), {
            reply_markup: template.getMarkup(),
            parse_mode: 'HTML',
          });
        }
        return;
      }),
    );
  }

  private static isTemplate(data: any): boolean {
    return data instanceof SimpleTextTemplate;
  }

  private static getTelegrafContext(context: ExecutionContext): SessionContext {
    const ctx = TelegrafExecutionContext.create(context);
    return ctx.getContext<SessionContext>();
  }

  private static isNewMessage(ctx: SessionContext): boolean {
    return !ctx.callbackQuery;
  }
}
