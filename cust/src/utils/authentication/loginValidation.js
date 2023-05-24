// 빈 칸 처리
export const isInputEmpty = (email, password) => {
  if(email === "" || password === "") {
    alert('내용을 입력하세요.');
    return true;
  }
  return false;
}