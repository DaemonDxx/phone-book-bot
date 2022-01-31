import { FileTemplate } from './file.template';

export class LoginSuccesfulTemplate extends FileTemplate {
  filename = 'login.success.txt';

  constructor() {
    super();
    this.text = `
Поздравляем! Вы успешно авторизировались!
Можете пользоваться поиском.
Поддерживается поиск следующими форматами:
- <b>[Фамилия]</b>
- <b>[Фамилия]</b> <b><i>пробел</i></b> <b>[Имя]</b>
Регистр не важен!

Чтобы воспользоваться справкой введите <b>/help</b>`;
  }

  transformTemplateString(templateString: string): string {
    return templateString;
  }
}
