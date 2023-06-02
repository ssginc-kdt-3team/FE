import { error } from "../notification"

export const isPointValid = (enteredPoint, remainedPoint, finalDeposit) => {
  if(enteredPoint > remainedPoint || enteredPoint > finalDeposit) {
    error('포인트 값 넘어감', '');
    return false;
  }
  return true;
}