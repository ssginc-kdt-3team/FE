import { error } from "../notification";

export const isEmpty = (title, contents) => {
  if(title === "" || contents === "") {
    error('내용을 입력하세요.');
    return true;
  }
  return false;
}

export const isPointSelected = (point) => {
  if(point === 0) {
    error('별점을 선택하세요.');
    return false;
  }
  return true;
}