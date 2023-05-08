import axios from 'axios';
import React, { useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import styles from '../../../assets/css/pages/auth/Login.module.css';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../../state/loginState';
import { userInfo } from '../../../state/userInfo';
import { useNavigate } from 'react-router-dom';
import next from '../../../assets/images/icons/next.png';

function Login() {
  const setLoginState = useSetRecoilState(loginState);
  const setUserInfo = useSetRecoilState(userInfo);

  const [email, setEmail] = useState(''); // 사용자가 입력한 email
  const [password, setPassword] = useState(''); // 사용자가 입력한 password                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

  const navigate = useNavigate(); // 페이지 이동을 위한 Hook

  // 빈 칸 처리
  const isInputEmpty = (email, password) => {
    if(email === "" || password === "") {
      alert('내용을 입력하세요.');
      return true;
    }
    return false;
  }

  // 로그인 처리
  const handleLogin = (e) => {
    if(!isInputEmpty(email, password)) { // 입력칸이 모두 채워져 있으면
      axios.post('http://localhost:8080/admin/login', {
        email: email, // email
        password: password, // password
      })
      .then(res => { // 받아오는 정보가 있다
        // console.log(res);
        // console.log(res.data);
        if(res.data === "")
          alert('로그인에 실패하였습니다.\n아이디와 비밀번호를 확인하세요.');
        else {
          setLoginState(true); // 로그인된 상태로 변경
          setUserInfo({ // 사용자 정보 저장
            // Parsing
            id: 1,
            name: "temp.name",
            email: "temp.email"
          })
          alert('로그인에 성공하였습니다.');
          navigate('/'); // 메인화면으로 이동
        }
      })
      .catch(err => { // 오류 처리
        alert("오류가 발생하였습니다.");
        console.log(err);
      });
    }
    else
      return;
  }

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title="로그인" fontSize="1.6rem" marginTop="80px" marginBottom="100px"/>
        <form className={styles.loginForm}>
          <input className={styles.loginInput} type='email' value={email} placeholder='이메일' onChange={(e) => setEmail(e.currentTarget.value)}/>

          <input className={styles.loginInput} type='password' value={password} placeholder='비밀번호' onChange={(e) => setPassword(e.currentTarget.value)}/>

          <div className='button' onClick={handleLogin}>로그인</div>
          <div id={styles.findIdPasswordWrap}>
            <div onClick={() => alert('아이디 찾기로 이동')}>
              아이디 찾기
              <img src={next} alt="find id" />
            </div>
            <div onClick={() => alert('비밀번호 찾기로 이동')}>
              비밀번호 찾기
              <img src={next} alt="find password" />
            </div>
          </div>
          <div>아직 회원이 아니신가요? <span onClick={() => navigate('/join')}>회원가입</span></div>
        </form>
      </div>
    </div>
  );
}

export default Login;