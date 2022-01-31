export class EmployeeNotFound extends Error {
  constructor() {
    super(`Не удалось найти данные о сотруднике`);
  }
}
