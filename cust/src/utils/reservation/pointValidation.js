import { error } from "../notification"

// 포인트 범위 검증
export const isPointValid = (enteredPoint, remainedPoint, finalDeposit) => {
  if(enteredPoint > remainedPoint || enteredPoint > finalDeposit) {
    error('가용 포인트 범위를 벗어났습니다.', '');
    return false;
  }
  return true;
}

// 포인트 1000점 이상인지 검증
export const canUsePoint = (enteredPoint) => {
  if(enteredPoint < 1000) {
    error('포인트는 1000점 이상 사용 가능합니다.');
    return false;
  }
  return true;
}

// 입력값 숫자만
