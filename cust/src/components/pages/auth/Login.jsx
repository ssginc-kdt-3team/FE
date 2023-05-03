import axios from 'axios';
import React, { useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import styles from '../../../assets/css/auth/Login.module.css';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../../state/loginState';
import { useNavigate } from 'react-router-dom';

function Login() {
  const setLoginState = useSetRecoilState(loginState);

  const [email, setEmail] = useState(''); // 사용자가 입력한 email
  const [password, setPassword] = useState(''); // 사용자가 입력한 password

  const navigate = useNavigate();

  // 로그인 처리
  const handleLogin = (e) => {
    // e.preventDefault();
    // console.log(email, password, temp);

    // if(temp && password === temp.password) {
    //   alert('로그인에 성공하였습니다.')
    //    // 로그인된 상태로 변경
    
    //    // 메인화면으로 이동
    // }
    // else {
    //   alert('로그인에 실패하였습니다.')
    // }


    // fetch('https://dummyjson.com/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
        
    //     username: 'kminchelle',
    //     password: '0lelplR',
    //     // expiresInMins: 60, // optional
    //   })
    // })
    // .then(res => res.json())
    // .then(console.log);

    axios.post('https://dummyjson.com/auth/login', {
      username: 'kminchelle',
      password: '0lelplR',
    })
    .then(res => {
      console.log(res.data);
      setLoginState(true); // 로그인된 상태로 변경
      alert('로그인에 성공하였습니다.');

      navigate('/'); // 메인화면으로 이동
    })
    .catch(err => {
      console.log(err);
      alert('로그인에 실패하였습니다.');
    });
  }

  return (
    <div className='center flex-col'>
      <PageTitle title="로그인" fontSize="1.8rem" marginBottom="75px"/>
      <form className={styles.loginForm}>
        <input className={styles.loginInput} type='email' value={email} placeholder='이메일' onChange={(e) => setEmail(e.currentTarget.value)}/>

        <input className={styles.loginInput} type='password' value={password} placeholder='비밀번호' onChange={(e) => setPassword(e.currentTarget.value)}/>

        <div className='button' onClick={handleLogin}>로그인</div>
        <div>
          <div onClick={() => alert('아이디 찾기로 이동')}>아이디 찾기 &gt;</div>
          <div onClick={() => alert('비밀번호 찾기로 이동')}>비밀번호 찾기 &gt;</div>
        </div>
        <div>아직 회원이 아니신가요? <span onClick={() => alert('회원가입으로 이동')}>회원가입</span></div>
      </form>
    </div>
  );
}

export default Login;