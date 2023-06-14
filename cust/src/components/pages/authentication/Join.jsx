import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import styles from '../../../assets/css/pages/authentication/Join.module.css';
import { useNavigate } from 'react-router-dom';
import { isEmailValid } from '../../../utils/authentication/emailValidation';
import { isInputEmpty, isPasswordValid, checkEmailDup } from '../../../utils/authentication/joinValidation';
import { onlyNum } from '../../../utils/format';
import Postcode from '../../popUp/authentication/PostCode';
import { Button } from 'antd';
import { error, success } from '../../../utils/notification';

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
  address : {
    zipCode: "",
    address: "",
    extraAddress: "",
    detail: ""
  }
};

function Join() {
  const navigate = useNavigate(); // 페이지 이동을 위한 Hook

  const [userInfo, dispatch] = useReducer(reducer, initialUserInfo);

  const handleInput = (e) => {
    // console.log(e.target);

    if(e.target.name === "detail") {// 주소에서 상세가 바뀐경우
      dispatch({ name: 'address', value: { ...userInfo.address, detail: e.target.value } });
      return;
    }

    if(e.target.name === "email") // 이메일이 바뀐 경우
      setEnteredEmail(e.target.value); // 이메일 변경값 설정

    dispatch(e.target); // 데이터를 변화시키기 위한 동작을 할 dispatch, action 값을 보냄
  };

  const [canUseEamil, setCanUseEmail] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const password = userInfo.password; // 사용자가 입력한 password
  const [confirmPassword, setConfirmPassword] = useState(""); // 사용자가 입력한 확인용 password

  // 비밀번호 확인
  const passwordConfirm = useRef(); // 참고  
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  
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

  
  // 주소 검색
  const handleAddressChange = (data) => {
    console.log(data);
    
    dispatch({ 
      name: 'address', 
      value: {
        ...userInfo.address,
        zipCode: data.zipCode,
        address: data.city,
        extraAddress: data.district,
      } 
    });
  };


  // useEffect(() => {
  //   console.log(userInfo.zipCode);
  //   console.log(userInfo.address);
  //   console.log(userInfo.extraAddress);
  //   console.log(userInfo.detail);
  // }, [userInfo])

  // 회원가입 처리  
  const handleJoin = () => {
    if(!isInputEmpty(userInfo)) { // 빈칸 확인
      // if(isEmailValid(userInfo.email)) { // 이메일 검증
      if(!canUseEamil) { // 이메일이 이미 사용중이면
        error("이메일 중복확인을 해주세요.");
        return;
      }
      
      if(!isPasswordConfirmed) { // 비밀번호 확인
        error("비밀번호를 확인해주세요.");
        return;
      }
      
      console.log(userInfo);

      axios.post('/customer/join', userInfo)
      .then(res => { // 받아오는 정보가 있다
        console.log(res.data);
        if(res.data === "")
          error("회원가입에 실패하였습니다.");
        else {
          success('회원가입에 성공하였습니다.');
          navigate('/login', { replace: true });
        }
      })
      .catch(err => { // 오류 처리
        error("오류가 발생하였습니다.");
        console.log(err);
      });
    }
  }

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title='JOIN' phrase='회원가입'/>
        <form className={styles.joinForm}>
          {/* 이름 */}
          <div id={styles.nameWrap}>
            <label>NAME</label>
            <input className={styles.joinInput} name="name" type='text' placeholder='이름' onChange={handleInput}/>
          </div>
          
          {/* 휴대폰 번호 */}
          <div id={styles.phoneWrap}>
            <label>PHONE</label>
            <input 
              className={styles.joinInput} 
              name="phone" 
              type='text' 
              placeholder='휴대폰 번호' 
              onInput={(e) => { e.target.value = onlyNum(e.target.value) }} 
              onChange={handleInput}
            />
          </div>

          {/* 이메일 */}
          <div className='grid-2c flex-gap-40'>
            <div id={styles.emailWrap}>
              <label>EMAIL</label>
              <input className={styles.joinInput} name="email" type='email' value={enteredEmail} placeholder='이메일' onChange={handleInput}/>
            </div>

            <div id={styles.confirmDupBtnWrap}>
              <Button 
                id={styles.confirmDupBtn} 
                className='button buttonReverse' 
                onClick={() => checkEmailDup(userInfo.email, setCanUseEmail, setEnteredEmail)}
              >
                이메일 중복확인
              </Button>
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
          <div id={styles.addressWrap} className='flex flex-col'>
            <label>ADDRESS</label>
            <div id={styles.zipCodeWrap} className='space-between flex-gap-40'>
              <input 
                className={styles.joinInput} 
                name="zipCode" 
                type='text' 
                value={userInfo.address.zipCode} 
                placeholder='우편번호' 
                onChange={handleAddressChange}
                readOnly
              />
              <Postcode onChange={handleAddressChange}/>
            </div>

            <div id={styles.detailAddressWrap}>
              <input 
                className={styles.joinInput} 
                name="address" 
                type='text' 
                value={userInfo.address.address + ' ' + userInfo.address.extraAddress} 
                placeholder='' 
                onChange={handleAddressChange}
                readOnly
              />
              <input className={styles.joinInput} name="detail" type='text' placeholder='상세주소' onChange={handleInput}/>
            </div>
          </div>

          {/* 버튼 */}
          <div id={styles.buttonWrap} className='center width-100 flex-gap-20'>
            <Button className='button buttonReverse' onClick={() => navigate(-1)}>취소</Button>
            <Button type='primary' className='button' onClick={handleJoin}>완료</Button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Join;