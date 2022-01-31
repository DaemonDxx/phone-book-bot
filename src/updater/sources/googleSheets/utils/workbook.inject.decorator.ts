import { Inject } from '@nestjs/common';
import { ACTIVE_WORKBOOK_TOKEN } from './constants';

export const InjectWorkbook = () => {
  return Inject(ACTIVE_WORKBOOK_TOKEN);
};
