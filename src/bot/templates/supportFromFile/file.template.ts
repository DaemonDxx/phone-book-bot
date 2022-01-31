import * as fs from 'fs/promises';
import * as path from 'path';
import { SimpleTextTemplate } from '../simpleText.template';

export abstract class FileTemplate extends SimpleTextTemplate {
  protected filename: string;

  async getText(): Promise<string> {
    if (!process.env.EXTRACT_TEMPLATE_FROM_FILE) {
      return this.text;
    }
    const templateString = await this.extractStringTemplateFromFile();

    return templateString
      ? this.transformTemplateString(templateString)
      : this.text;
  }

  private async extractStringTemplateFromFile(): Promise<string> {
    try {
      const filepath = path.join(process.env.PATH_TO_TEMPLATE, this.filename);
      const file = await fs.readFile(filepath, { encoding: 'utf-8' });
      return file.toString();
    } catch (e) {
      console.error(e);
      return;
    }
  }

  abstract transformTemplateString(templateString: string): string;
}
