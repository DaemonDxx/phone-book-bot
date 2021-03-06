import { Employee } from '../../../employee/employee.entity';
import { FileTemplate } from './file.template';
import { formatTemplate } from '../../../utils/format';

export class InfoTemplate extends FileTemplate {
  filename = 'employee.txt';

  constructor(private readonly employee: Employee) {
    super();
    const info = this.employee;
    this.text = `\u{2705} <b>${info.fullname}</b> - ${info.position}\n\r
\u{1F3EB} <b>Структура</b> - ${info.department}
\n\r\u{1F4F1} <b>Сотовый тел.</b> - ${info.home_phone}
\n\r\u{260E}  <b>Городской тел.</b> - ${info.work_phone}
\n\r\u{1F4E8} <b>Почта</b> - ${info.email}
\n\r\u{1F48E} <b>Телеграм</b> - ${info.telegram}`;
  }

  transformTemplateString(templateString: string): string {
    return formatTemplate(templateString, this.employee);
  }
}
