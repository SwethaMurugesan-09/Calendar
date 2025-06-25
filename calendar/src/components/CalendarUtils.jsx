import dayjs from "dayjs";

export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
  const arrayOfDate = [];

 const startDay = firstDateOfMonth.day();
for (let i = 0; i < startDay; i++) {
  arrayOfDate.push({
    currentMonth: false,
    date: firstDateOfMonth.subtract(startDay - i, "day")
  });
}

  for (let i=1;i<=lastDateOfMonth.date();i++) {
    const date = dayjs().year(year).month(month).date(i);
    arrayOfDate.push({
      currentMonth: true,
      date,
      today: date.isSame(dayjs(), "day"),
    });
  }
  const remaining = 42 - arrayOfDate.length;
  for (let i = 1; i <= remaining; i++) {
    arrayOfDate.push({ currentMonth: false, date: lastDateOfMonth.add(i, "day") });
  }

  return arrayOfDate;
};

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
