import { Inject } from '@nestjs/common';
import { getLoggerToken } from './getLoggerToken';

export const InjectLogger = (ctx) => {
  return Inject(getLoggerToken(ctx));
};
