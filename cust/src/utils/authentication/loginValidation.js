import { error } from "../notification";

// 빈 칸 처리
export const isInputEmpty = (email, password) => {
  if(email === "" || password === "") {
    error('내용을 입력하세요.');
    return true;
  }
  return false;
}