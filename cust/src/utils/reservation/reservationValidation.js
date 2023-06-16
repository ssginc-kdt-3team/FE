export const canUpdate = (resvDate) => {
  // console.log('함수 실행됨');

  const currentDate = new Date();
  const targetDate = new Date(resvDate);
  const timeDiff = Math.abs(targetDate.getTime() - currentDate.getTime());
  const hoursDiff = timeDiff / (1000 * 60 * 60);

  // console.log(hoursDiff > 24);

  return hoursDiff > 24;
}

// textarea 최대 입력
export const maxLengthCheck = (text) => {
  // console.log(text)
  if (text.length > text.max.length)
    text.value = text.value.slice(0, text.max.length)
}