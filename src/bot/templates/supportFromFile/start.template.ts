import { FileTemplate } from './file.template';

export class StartTemplate extends FileTemplate {
  filename = 'start.txt';

  constructor() {
    super();
    this.text = `
Добро пожаловать в справочник сотрудников ПАО «Россети Сибирь» - «Красноярскэнерго»
    
Для авторизации введите:
/login <b><i>пробел</i></b> <b>[ВАШ СЕКРЕТНЫЙ КЛЮЧ]</b>`;
  }

  transformTemplateString(templateString: string): string {
    return templateString;
  }
}
