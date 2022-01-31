import { Context } from 'telegraf';
import { Employee } from '../../employee/employee.entity';

export type UserSession = {
  isAuth: boolean;
};

export type SessionContext = Context & {
  session: UserSession;
};

export type Query = Partial<Pick<Employee, 'lastname' | 'firstname'>>;
