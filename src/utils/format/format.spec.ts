import { formatTemplate } from './index';

describe('Test format function', () => {
  const source = {
    username: 'ivan',
    phone: '+ 7902 911 8822',
  };

  const templates = [
    `Проверка работы функции {{username}}`,
    `Проверка работы функции {{phone}}`,
    `Проверка работы функции   {{username}} {{phone}}`,
    `Проверка работы функции !{{username}}! {{phone}} {{username}} {{phone}}`,
  ];

  const results = [
    `Проверка работы функции ${source.username}`,
    `Проверка работы функции ${source.phone}`,
    `Проверка работы функции   ${source.username} ${source.phone}`,
    `Проверка работы функции !${source.username}! ${source.phone} ${source.username} ${source.phone}`,
  ];

  it('should match with result', () => {
    templates.forEach((str, i) => {
      expect(formatTemplate(str, source)).toEqual(results[i]);
    });
  });
});
