import { FileTemplate } from './file.template';

export class HelpTemplate extends FileTemplate {
  constructor() {
    super(`
Формат поиска:
- <b>[Фамилия]</b>
- <b>[Фамилия]</b> <b><i>пробел</i></b> <b>[Имя]</b>
Регистр не важен!
`);
    this.filename = 'help.txt';
  }

  transformTemplateString(templateString: string): string {
    return templateString;
  }
}
