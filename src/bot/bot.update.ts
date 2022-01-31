import { Logger, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Action,
  Command,
  Ctx,
  Help,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { EmployeeService } from '../employee/employee.service';
import { BotService } from './bot.service';
import { AuthGuard } from './common/guards/auth.guard';
import { UnauthorizedFilter } from './common/filters/unauthorized.filter';
import { UpdaterService } from '../updater/updater.service';
import { TemplateInterceptor } from './common/interceptors/template.interceptor';
import { HelpTemplate } from './templates/supportFromFile/help.template';
import { StartTemplate } from './templates/start.template';
import { SimpleTextTemplate } from './templates/simpleText.template';
import { ExtractArgPipe } from './common/pipes/extractArg.pipe';
import { Query, SessionContext } from './types';
import { QueryPipe } from './common/pipes/query.pipe';
import { SelectTemplate } from './templates/select.template';
import { LoginSuccesfulTemplate } from './templates/login.succesful.template';
import { InfoTemplate } from './templates/info.template';
import { EmployeeNotFound } from '../employee/errors/employeeNotFound';

const extractIDFromData = (data: string) => {
  return data.split(' ')[1];
};

@Update()
@UseFilters(UnauthorizedFilter)
@UseInterceptors(TemplateInterceptor)
export class BotUpdate {
  private readonly logger: Logger;

  constructor(
    private readonly botService: BotService,
    private readonly updaterService: UpdaterService,
    private readonly employeeService: EmployeeService,
  ) {
    this.logger = new Logger('APP');
  }

  @Start()
  async startCommand() {
    return new StartTemplate();
  }

  @Help()
  async help() {
    return new HelpTemplate();
  }

  @Command('update')
  @UseGuards(AuthGuard)
  async updateDatabase() {
    try {
      await this.updaterService.updateDatabase();
      return new SimpleTextTemplate('База данных обновлена');
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Command('login')
  async login(
    @Message('text', new ExtractArgPipe()) key: string,
    @Ctx() ctx: SessionContext,
  ) {
    if (ctx.session.isAuth) {
      return new SimpleTextTemplate('Вы уже авторизованы');
    }
    let template: SimpleTextTemplate;
    if (!key) {
      template = new SimpleTextTemplate('Вы не указали ключ для входа');
    } else if (key !== (process.env.SECRET_KEY || 'TEST_KEY')) {
      template = new SimpleTextTemplate('Ключ не верный. Вы не авторизированы');
    } else {
      ctx.session.isAuth = true;
      this.logger.log(`Пользователь ${ctx.from.username} авторизовался`);
      template = new LoginSuccesfulTemplate();
    }
    return template;
  }

  @On('text')
  @UseGuards(AuthGuard)
  async findEmployeeQuery(
    @Message('text', new QueryPipe()) query: Query,
    @Ctx() ctx: Context,
  ) {
    try {
      const employee = await this.employeeService.findEmployees(query);
      let template: SimpleTextTemplate;

      if (employee.length === 0) {
        template = new SimpleTextTemplate('По вашему запросу нет результатов.');
      } else {
        template = new SelectTemplate(employee);
      }

      return template;
    } catch (e) {
      this.logger.error(e);
      await ctx.reply('Не удалось выполнить поиск. Попробуйте позже');
    }
  }

  @Action(new RegExp('^select'))
  @UseGuards(AuthGuard)
  async selectAction(ctx: Context) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const _id = extractIDFromData(ctx.callbackQuery.data);
      const employee = await this.employeeService.findEmployeeByID(_id);
      return new InfoTemplate(employee);
    } catch (e) {
      if (e instanceof EmployeeNotFound) {
        await ctx.editMessageText('Запрос устарел.', null);
      }
      this.logger.error(e);
    }
  }
}
