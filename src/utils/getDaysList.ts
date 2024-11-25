export function getDaysList() {
  const dayLabels = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const endDay =
    today.getDate() === lastDayOfMonth ? lastDayOfMonth : today.getDate();

  for (let day = 1; day <= endDay; day++) {
    dayLabels.push(day.toString().padStart(2, '0'));
  }

  return dayLabels;
}
