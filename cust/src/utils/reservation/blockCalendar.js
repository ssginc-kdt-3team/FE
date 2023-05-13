export const blockCalendar = ({ date }) => {
  // const currentDate = new Date(2023, 4, 14, 15, 30, 0);
  const currentDate = new Date(); // 오늘 날짜
  const currentMonth = currentDate.getMonth(); // 이번 달

  const firstDateOfCurrentMonth = new Date(currentDate.getFullYear(), currentMonth, 1); // 이번 달 1일
  const middleDateOfCurrentMonth = new Date(currentDate.getFullYear(), currentMonth, 15); // 이번 달 15일
  const middleDateOfNextMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 15); // 다음 달 15일
  const lastDateOfNextMonth = new Date(currentDate.getFullYear(), currentMonth + 2, 0); // 다음 달 마지막 날

  let minSelectableDate, maxSelectableDate;

  if (currentDate < middleDateOfCurrentMonth) { // 1일 ~ 14일 사이이면 예약 가능 범위는
    minSelectableDate = firstDateOfCurrentMonth; // 이번 달 1일 부터
    maxSelectableDate = middleDateOfNextMonth; // 다음 달 15일까지
  }
  else { // 15일 ~ 말일 사이라면 예약 가능 범위는
    minSelectableDate = middleDateOfCurrentMonth; // 이번 달 15일 부터
    maxSelectableDate = lastDateOfNextMonth; // 다음 달 마지막 날까지
  }
  
  return date < minSelectableDate || date > maxSelectableDate || date < currentDate; // 범위에서 벗어나고 현재 일 보다 이전은 선택 불가능
};