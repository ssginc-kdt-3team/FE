export const isEmailValid = (email) => {
  const reg_email = /^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  if(!reg_email.test(email)) {
    alert('이메일 형식으로 입력하세요.');
    return false;
  }
  
  return true;
}