import isSameDay from "date-fns/isSameDay";

export const dateComparison = (firstDate: Date, secondDate: Date) =>
  firstDate.getFullYear() === secondDate.getFullYear() &&
  firstDate.getMonth() === secondDate.getMonth() &&
  firstDate.getDate() === secondDate.getDate();

export const getStrFromDate = (date: Date) => {
  if (isSameDay(new Date(), date)) {
    return "Сегодня";
  }

  const str = new Date(date).toLocaleString("ru", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return str[0].toUpperCase() + str.slice(1);
};
