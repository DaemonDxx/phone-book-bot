import { Logger, Provider } from '@nestjs/common';
import { getLoggerToken } from './getLoggerToken';

export const getLoggerProvider = (ctx): Provider => {
  return {
    provide: getLoggerToken(ctx),
    useValue: new Logger(ctx),
  };
};
