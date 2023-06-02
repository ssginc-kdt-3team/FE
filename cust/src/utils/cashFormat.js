export const cashFormat = (cash) => {
  return cash.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}