import { DynamicModule, Module } from '@nestjs/common';
import { UpdaterService } from './updater.service';
import { EmployeeModule } from '../employee/employee.module';
import { UpdaterOption } from '../types/updater';
import { ON_START_UPDATE_TOKEN } from './constants';

const moduleOption: Partial<UpdaterOption> = {
  updateOnApplicationStart: false,
};

@Module({})
export class UpdaterModule {
  static forRoot(option: UpdaterOption): DynamicModule {
    Object.assign(moduleOption, option);
    return {
      module: UpdaterModule,
      imports: [moduleOption.source, EmployeeModule],
      providers: [
        {
          provide: ON_START_UPDATE_TOKEN,
          useValue: option.updateOnApplicationStart,
        },
        UpdaterService,
      ],
      exports: [UpdaterService],
    };
  }
}
