import { add } from "date-fns";

const plusRandom = (current, base) =>
  current + Math.round(Math.random() * base);

const generate = (startDate, endDate, baseValue = 0, velocity = 100) => {
  let cursor = startDate;
  const data = [];
  let currentValue = baseValue;
  while (endDate > cursor) {
    currentValue = plusRandom(currentValue, velocity);
    data.push({
      date: cursor,
      val: currentValue
    });
    cursor = add(cursor, { days: 1 });
  }
  return data;
};

const days = (startDate, num = 1) =>
  generate(startDate, add(startDate, { days: num }));
const months = (startDate, num = 1) =>
  generate(startDate, add(startDate, { months: num }));
const years = (startDate, num = 1) =>
  generate(startDate, add(startDate, { years: num }));

export default {
  generate,
  days,
  months,
  years
};