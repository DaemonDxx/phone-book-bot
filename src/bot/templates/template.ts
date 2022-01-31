export interface Template {
  getText(): Promise<string>;
  getMarkup(): any;
}
