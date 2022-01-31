import { Template } from './template';

export class SimpleTextTemplate implements Template {
  protected text: string;
  protected markup: any;

  constructor(text?: string) {
    this.text = text || 'empty answer';
    this.markup = null;
  }

  getMarkup(): any {
    return this.markup;
  }

  async getText(): Promise<string> {
    return this.text;
  }
}
