export function getStartAndEndOfDay(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
}

export function getStartAndEndOfMonth(month?: number, year?: number) {
  const now = new Date();
  const targetMonth = month ? month - 1 : now.getMonth();
  const targetYear = year || now.getFullYear();

  const startOfMonth = new Date(targetYear, targetMonth, 1);
  const endOfMonth = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59, 999);

  return { startOfMonth, endOfMonth };
}
``
export function createDateFilter(date?: Date, month?: number, year?: number) {
  if (date) {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date);
    return {
      'revenue.date': { $gte: startOfDay, $lte: endOfDay },
      'receivables.dueDate': { $gte: startOfDay, $lte: endOfDay },
      'expenses.date': { $gte: startOfDay, $lte: endOfDay },
    };
  }

  if (month || year) {
    const { startOfMonth, endOfMonth } = getStartAndEndOfMonth(month, year);
    return {
      'revenue.date': { $gte: startOfMonth, $lte: endOfMonth },
      'receivables.dueDate': { $gte: startOfMonth, $lte: endOfMonth },
      'expenses.date': { $gte: startOfMonth, $lte: endOfMonth },
    };
  }

  return {};
}
