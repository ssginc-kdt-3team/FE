import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import styles from '../../../assets/css/pages/auth/Join.module.css';
import { useNavigate } from 'react-router-dom';
import { isEmailValid } from '../../../utils/auth/isEmailValid';

// action에 따라 안에 데이터를 어떻게 변화시킬지 설정
const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const initialUserInfo = { // 초기값을 가지는 객체
  name: "",
  phone: "", 
  email: "",
  password: "",
  birthday: "",
  gender: null,
  zipCode: "",
  city: "",
  district: "",
  detail: ""
};

function Join() {
  const [userInfo, dispatch] = useReducer(reducer, initialUserInfo);

  const handleInput = (e) => {
    // console.log(e.target);
    dispatch(e.target); // 데이터를 변화시키기 위한 동작을 할 dispatch, action 값을 보냄
  };

  const password = userInfo.password; // 사용자가 입력한 password
  const [confirmPassword, setConfirmPassword] = useState(""); // 사용자가 입력한 확인용 password

  const navigate = useNavigate(); // 페이지 이동을 위한 Hook

  // 빈 칸 처리
  const isInputEmpty = (userInfo) => {
    for (let key in userInfo) {
      if(userInfo[key] === "" || userInfo[key] === null) {
        alert('내용을 입력하세요.');
        return true;
      }
    }
    return false;
  }

  // 비밀번호 확인
  const passwordConfirm = useRef(); // 참고  
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  
  // 비밀번호 조건 확인
    const isPasswordValid = (password, target, stateSetter) => {
      // console.log(password.length);
      if(password.length >= 8 && password.length <= 16)
        return true;
      else {
        if(password.length === 0)
          passwordConfirm.current.innerText = ""; // 초기 상태에서는 안내 문구 안보이게
        else
          passwordConfirm.current.innerText = "비밀번호는 8자리 이상 16자리 이하로 설정해주세요.";
        target.current.style.color = 'red';

        stateSetter(false);
        return false;
      }
    }

    useEffect(() => {
      // console.log(isPasswordValid(password))
      if(isPasswordValid(password, passwordConfirm, setIsPasswordConfirmed)) {
        passwordConfirm.current.innerText = "";
        if(password !== "" && confirmPassword !== "") {
          if(password === confirmPassword) {
            passwordConfirm.current.innerText = "비밀번호가 일치합니다.";
            passwordConfirm.current.style.color = 'blue';
            setIsPasswordConfirmed(true);
          }
          else {
            passwordConfirm.current.innerText = "비밀번호가 일치하지 않습니다.";
            passwordConfirm.current.style.color = 'red';
            setIsPasswordConfirmed(false);
          }
        }
      }
    }, [password, confirmPassword])


  // 회원가입 처리  
  const handleJoin = () => {
    console.log(userInfo);

    if(!isInputEmpty(userInfo)) { // 빈칸 확인
      if(isEmailValid(userInfo.email)) { // 이메일 검증
        if(!isPasswordConfirmed) { // 비밀번호 확인
          alert("비밀번호를 확인해주세요.");
          return;
        }
      }
      else
        return;

      axios.post('/customer/join', userInfo)
      .then(res => { // 받아오는 정보가 있다
        console.log(res.data);
        if(res.data === "")
          alert("회원가입에 실패하였습니다.");
        else {
          alert('회원가입에 성공하였습니다.');
          navigate('/login', { replace: true });
        }
      })
      .catch(err => { // 오류 처리
        alert("오류가 발생하였습니다.");
        console.log(err);
      });
    }
  }

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title="회원가입"/>
        <form className={styles.joinForm}>
          {/* 이름 */}
          <div id={styles.nameWrap}>
            <label>NAME</label>
            <input className={styles.joinInput} name="name" type='text' placeholder='이름' onChange={handleInput}/>
          </div>
          
          {/* 휴대폰 번호 */}
          <div id={styles.phoneWrap}>
            <label>PHONE</label>
            <input className={styles.joinInput} name="phone" type='text' placeholder='휴대폰 번호' onChange={handleInput}/>
          </div>

          {/* 이메일 */}
          <div className='grid-2c flex-gap-40'>
            <div id={styles.emailWrap}>
              <label>EMAIL</label>
              <input className={styles.joinInput} name="email" type='email' placeholder='이메일' onChange={handleInput}/>
            </div>

            <div id={styles.confirmDupBtnWrap}>
              <div id={styles.confirmDupBtn} className='button buttonReverse' onClick={() => alert('이메일 중복확인')}>이메일 중복확인</div>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className='grid-2c flex-gap-40'>
            <div id={styles.passwordWrap}>
              <label>PASSWORD</label>
              <input className={styles.joinInput} name="password" type='password' placeholder='비밀번호' onChange={handleInput}/>
              <div ref={passwordConfirm}></div>
            </div>
            <div id={styles.confirmPasswordWrap}>
              <label>CONFIRM PASSWORD</label>
              <input className={styles.joinInput} name="confirmPassword" type='password' placeholder='비밀번호 확인' onChange={(e) => setConfirmPassword(e.currentTarget.value)}/>
            </div>
          </div>

          {/* 생년월일 */}
          <div id={styles.birthWrap}>
            <label>BIRTH</label>
            <input className={styles.joinInput} name="birthday" type='date' onChange={handleInput}/>
          </div>
          
          {/* 생별 */}
          <div id={styles.genderWrap}>
            <label>GENDER</label>
            <div style={{ display: 'flex' }}>
            <input type="radio" name="gender" value="true" onChange={handleInput}/><span>남</span>
            <input type="radio" name="gender" value="false" onChange={handleInput}/><span>여</span>
            </div>
          </div>

          {/* 주소 */}
          <div id={styles.addressWrap}>
            <label>ADDRESS</label>
            <input className={styles.joinInput} name="zipCode" type='text' placeholder='우편번호' onChange={handleInput}/>
            <div>
              <input className={styles.joinInput} name="city" type='text' placeholder='시' onChange={handleInput}/>
              <input className={styles.joinInput} name="district" type='text' placeholder='구' onChange={handleInput}/>
              <input className={styles.joinInput} name="detail" type='text' placeholder='상세주소' onChange={handleInput}/>
            </div>
          </div>

          {/* 버튼 */}
          <div id={styles.buttonWrap} className='center width-100 flex-gap-20'>
            <div className='button buttonReverse' onClick={() => navigate(-1)}>취소</div>
            <div className='button' onClick={handleJoin}>완료</div>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Join;