// 금액 표시
export const cashFormat = (cash) => {
  return cash.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 숫자만
export const onlyNum = (input) => {
  return input.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
}