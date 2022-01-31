import { Inject } from '@nestjs/common';
import { ON_START_UPDATE_TOKEN } from '../../constants';

export const InjectUpdateOption = () => {
  return Inject(ON_START_UPDATE_TOKEN);
};
