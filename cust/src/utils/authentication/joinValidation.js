import axios from "axios";
import { isEmailValid } from "./emailValidation";
import { error, success } from "../notification";

// 빈 칸 처리
export const isInputEmpty = (userInfo) => {
  for (let key in userInfo) {
    if(userInfo[key] === "" || userInfo[key] === null) {
      error('내용을 입력하세요.');
      return true;
    }
  }
  return false;
}


// 비밀번호 조건 확인
export const isPasswordValid = (password, target, stateSetter) => {
  // console.log(password.length);
  if(password.length >= 8 && password.length <= 16)
    return true;
  else {
    if(password.length === 0)
      target.current.innerText = ""; // 초기 상태에서는 안내 문구 안보이게
    else
      target.current.innerText = "비밀번호는 8자리 이상 16자리 이하로 설정해주세요.";
    target.current.style.color = 'red';

    stateSetter(false);
    return false;
  }
}


// 이메일 중복 확인
export const checkEmailDup = (email, stateSetter, emailSetter) => {
  // console.log('중복 확인용 이메일: ' + email);

  if(isEmailValid(email)) { // 이메일 형식이 맞으면
    axios.post('/customer/emailCheck', { // 이메일 중복 확인 수행
      email: email
    })
    .then(res => { // 받아오는 정보가 있다
      // console.log(res.data);
      if(res.data === true) { // DB에 없다
        success("사용가능한 이메일 입니다.");
        stateSetter(true);
      }
      else { // DB에 있다
        error('이미 사용중인 이메일 입니다.');
        // email = ""; // 이메일 정보 초기화
        emailSetter("");
        stateSetter(false);
      }
    })
    .catch(err => { // 오류 처리
      error("오류가 발생하였습니다.");
      console.log(err);
    });
  }
  return false;  
}