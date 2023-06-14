export const canUpdate = (resvDate) => {
  console.log('함수 실행됨');

  const currentDate = new Date();
  const targetDate = new Date(resvDate);
  const timeDiff = Math.abs(targetDate.getTime() - currentDate.getTime());
  const hoursDiff = timeDiff / (1000 * 60 * 60);

  console.log(hoursDiff > 24);

  return hoursDiff > 24;
}