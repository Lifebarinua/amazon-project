function isWeekend(date) {
  const dayName = date.format('dddd');
  return dayName === 'Saturday' || dayName === 'Sunday';
}
const testDates = [
  dayjs('2025-06-21'), // Saturday
  dayjs('2025-06-22'), // Sunday
  dayjs('2025-06-24'), // Tuesday
  dayjs('2025-06-20')  // Friday
];

testDates.forEach((date) => {
  console.log(`${date.format('dddd, MMMM D YYYY')} is weekend? ${isWeekend(date)}`);
});

