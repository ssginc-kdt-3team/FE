import React, { useEffect, useReducer, useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import styles from '../../../assets/css/auth/Join.module.css';

// action에 따라 안에 데이터를 어떻게 변화시킬지 설정
const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const initialUserInfo = { // 초기값을 가지는 객체
  name: "",
  email: "",
  password: "",
  date: "",
  gender: true,
  zipCode: "11111",
  city: "",
  district: "",
  detail: ""
};

function Join() {
  // const [name, setName] = useState(''); // 사용자가 입력한 이름
  // const [email, setEmail] = useState(''); // 사용자가 입력한 email
  // const [password, setPassword] = useState(''); // 사용자가 입력한 password
  // const [checkPassword, setCheckPassword] = useState(''); // 사용자가 입력한 확인용 password
  // const [date, setDate] = useState(''); // 사용자가 입력한 날짜
  // const [temp, setTemp] = useState(); // DB에서 가져온 사용자 정보

  const [userInfo, dispatch] = useReducer(reducer, initialUserInfo);

  const handleInput = (e) => {
    // 데이터를 변화시키기 위한 동작을 할 dispatch
    // action 값을 보냄
    // console.log(e.target);
    dispatch(e.target);
  };

  const { name, email, password, date, gender, zipCode, city, district, detail } = userInfo;

  const [checkPassword, setCheckPassword] = useState(""); // 사용자가 입력한 확인용 password

  // 회원가입 처리
  const handleJoin = () => {
    console.log(userInfo);
    console.log(checkPassword);
  }

  // 비밀번호 확인
  useEffect(() => {
    
  }, [password, checkPassword])

  return (
    <div className='center flex-col'>
      <PageTitle title="회원가입" fontSize="1.8rem" marginBottom="75px"/>
      <form className={styles.joinForm}>
        <div>
          <label>이름</label>
          <input className={`${styles.joinInput} width-50`} name="name" type='text' placeholder='이름' onChange={handleInput}/>
        </div>

        <div>
          <label>이메일</label>
          <input className={`${styles.joinInput} width-100`} name="email" type='email' placeholder='이메일' onChange={handleInput}/>
        </div>

        <div>
          <div className='button'>이메일 중복확인</div>
        </div>

        <div>
          <label>비밀번호</label>
          <input className={`${styles.joinInput} width-100`} name="password" type='password' placeholder='비밀번호' onChange={handleInput}/>
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input className={`${styles.joinInput} width-50`} name="checkPassword" type='password' placeholder='비밀번호 확인' onChange={(e) => setCheckPassword(e.currentTarget.value)}/>
        </div>

        <div>
          <label>생년월일</label>
          <input className={`${styles.joinInput} width-50`} name="date" type='date' onChange={handleInput}/>
        </div>
        
        <div>
          <label>성별</label>
          <input type="radio" name="gender" value="true" onChange={handleInput}/><span>남</span>
          <input type="radio" name="gender" value="false" onChange={handleInput}/><span>여</span>
        </div>

        <div>
          <label>주소</label>
          <input className={styles.joinInput} name="zipCode" type='text' placeholder='우편번호' onChange={handleInput}/>
          <div>
            <input className={styles.joinInput} name="city" type='text' placeholder='시' onChange={handleInput}/>
            <input className={styles.joinInput} name="district" type='text' placeholder='구' onChange={handleInput}/>
            <input className={styles.joinInput} name="detail" type='text' placeholder='상세주소' onChange={handleInput}/>
          </div>
        </div>

        <div className='center width-100'>
          <div className='button'>취소</div>
          <div className='button' onClick={handleJoin}>완료</div>
        </div>
      </form>
    </div>
  );
}

export default Join;