import { Injectable } from '@nestjs/common';
import { Employee } from '../employee/employee.entity';
import { EmployeeService } from '../employee/employee.service';
import { InjectSource } from './common/decorators/injectSource.decorator';
import { DataSource } from '../types/updater/dataSource.interface';
import { InjectUpdateOption } from './common/decorators/injectUpdateOption.decoreator';

@Injectable()
export class UpdaterService {
  @InjectSource()
  private readonly source: DataSource;

  @InjectUpdateOption()
  private readonly isNeedUpdateOnStart: boolean;

  private readonly logger = console;

  constructor(private readonly employeeService: EmployeeService) {}

  async updateDatabase() {
    this.logger.log(`Обновление базы данных...`);
    await this.clearDatabase();
    const employees = await this.source.extractData();
    this.logger.log(`Получено ${employees.length} записей из таблицы`);
    if (employees.length === 0) return;
    await this.saveEmployees(employees);
    this.logger.log(`База данных обновлена`);
  }

  private async clearDatabase() {
    await this.employeeService.deleteEmployees({});
    this.logger.log(`База данных очищена`);
  }

  private async saveEmployees(employees: Employee[]) {
    const promises = employees.map((employee: Employee) => {
      return this.employeeService.createEmployee(employee);
    });
    const results = await Promise.allSettled(promises);
    results.forEach((result) => {
      if (result.status === 'rejected') {
        this.logger.warn(`Ошибка сохранения ${result.reason}`);
      }
    });
  }

  async onApplicationBootstrap() {
    if (this.isNeedUpdateOnStart) {
      await this.updateDatabase();
    }
  }
}
