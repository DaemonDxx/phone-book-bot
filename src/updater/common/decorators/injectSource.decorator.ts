import { Inject } from '@nestjs/common';
import { ACTIVE_SOURCE_TOKEN } from '../../constants';

export const InjectSource = () => {
  return Inject(ACTIVE_SOURCE_TOKEN);
};
