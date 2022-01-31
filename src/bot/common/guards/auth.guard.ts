import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { SessionContext } from '../../types';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger('Guard');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const tgCtx = ctx.getContext<SessionContext>();
    if (tgCtx.session.isAuth) return true;
    this.logger.warn(`${tgCtx.from.username} - Неудачная попытка доступа`);
    throw new UnauthorizedException();
  }
}
