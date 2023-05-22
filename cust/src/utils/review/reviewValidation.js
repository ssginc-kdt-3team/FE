export const isEmpty = (title, contents) => {
  if(title === "" || contents === "") {
    alert('내용을 입력하세요.');
    return true;
  }
  return false;
}

export const isPointSelected = (point) => {
  if(point === 0) {
    alert('별점을 선택하세요.');
    return false;
  }
  return true;
}