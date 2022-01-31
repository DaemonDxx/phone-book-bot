import { Markup } from 'telegraf';
import { Employee } from '../../employee/employee.entity';
import { SimpleTextTemplate } from './simpleText.template';

export class SelectTemplate extends SimpleTextTemplate {
  constructor(private readonly findResult: Employee[]) {
    super();
    this.text = `Выберите сотрудника из списка...`;
    this.markup = this.getKeyboard();
  }

  private getKeyboard() {
    return Markup.inlineKeyboard(this.getInlineButtonsResult());
  }

  private getInlineButtonsResult() {
    return this.findResult.map((employee) => {
      return [
        Markup.button.callback(
          `${employee.firstname} ${employee.thirdname}`,
          `select ${employee._id}`,
        ),
      ];
    });
  }
}
