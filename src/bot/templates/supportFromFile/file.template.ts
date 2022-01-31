import * as fs from 'fs/promises';
import { SimpleTextTemplate } from '../simpleText.template';

export abstract class FileTemplate extends SimpleTextTemplate {
  protected filename: string;
  private dirname = '../assets/TemplateMessages';

  // async getText(): Promise<string> {
  //   if (!process.env.EXTRACT_TEMPLATE_FROM_FILE) {
  //     return this.text;
  //   }
  //   const templateString = await this.extractStringTemplateFromFile();
  //   return this.transformTemplateString(templateString);
  // }

  // private async extractStringTemplateFromFile(): Promise<string> {
  //
  // }

  abstract transformTemplateString(templateString: string): string;
}
