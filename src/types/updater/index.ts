import { DynamicModule } from '@nestjs/common';

export type UpdaterOption = {
  source: DynamicModule;
  updateOnApplicationStart?: boolean;
  autoUpdate: any;
};
