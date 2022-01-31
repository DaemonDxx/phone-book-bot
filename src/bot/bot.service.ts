import { Injectable } from '@nestjs/common';
import { Employee } from '../employee/employee.entity';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class BotService {
  constructor(private readonly employeeService: EmployeeService) {}

  extractIDFromData(data: string) {
    return data.split(' ')[1];
  }

  async getEmployeeByID(_id: string): Promise<Employee> {
    return this.employeeService.findEmployeeByID(_id);
  }

  async getEmployeesByName(
    query: Partial<Pick<Employee, 'lastname' | 'firstname'>>,
  ): Promise<Employee[]> {
    return this.employeeService.findEmployees(query);
  }
}
