import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  _id: ObjectId;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  thirdname: string;

  @Prop()
  fullname: string;

  @Prop()
  department: string;

  @Prop()
  position: string;

  @Prop()
  work_phone: string;

  @Prop()
  home_phone: string;

  @Prop()
  email: string;

  @Prop()
  telegram: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
