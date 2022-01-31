import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './employee.entity';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeService {
  @InjectModel(Employee.name)
  private employeeModel: Model<EmployeeDocument>;

  async findEmployeeByID(_id: string): Promise<Employee> {
    return this.employeeModel.findById(_id).lean();
  }

  async findEmployees(query: Partial<Employee>): Promise<Employee[]> {
    return this.employeeModel.find(query);
  }

  async createEmployee(dto: Omit<Employee, '_id'>): Promise<Employee> {
    const model = new this.employeeModel(dto);
    return model.save();
  }

  async deleteEmployees(query: Partial<Employee>): Promise<number> {
    const result = await this.employeeModel.deleteMany(query);
    return result.deletedCount;
  }
}
