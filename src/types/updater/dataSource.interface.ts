import { Employee } from '../../employee/employee.entity';
import { DynamicModule } from '@nestjs/common';

export type ApplySourceModuleFn = (option) => DynamicModule;

export interface DataSource {
  extractData(): Promise<Employee[]>;
}
