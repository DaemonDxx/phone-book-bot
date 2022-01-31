import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './employee.entity';
import { getLoggerProvider } from '../defaultLogger/getLoggerProvider';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
  ],
  providers: [EmployeeService, getLoggerProvider('EmployeeModule')],
  exports: [EmployeeService],
})
export class EmployeeModule {}
