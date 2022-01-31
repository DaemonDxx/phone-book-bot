import { SimpleTextTemplate } from './simpleText.template';

export class StartTemplate extends SimpleTextTemplate {
  constructor() {
    super();
    this.text = `
Добро пожаловать в справочник сотрудников ПАО «Россети Сибирь» - «Красноярскэнерго»
    
Для авторизации введите:
/login <b><i>пробел</i></b> <b>[ВАШ СЕКРЕТНЫЙ КЛЮЧ]</b>`;
  }
}
