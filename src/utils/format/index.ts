export function formatTemplate(str: string, source: any): string {
  if (typeof source !== 'object')
    throw new Error('Второй аргумент должен быть объектом');
  let result: string = str;
  for (const field in source) {
    let value = source[field];
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (typeof value === 'string') {
      result = result.replaceAll(new RegExp('{{' + field + '}}', 'g'), value);
    }
  }
  return result;
}
