import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectTo, setRedirectTo] = useState(null); // 이동할 페이지 URL

  const [loginTitle, setLoginTitle] = useState('Login');
  const navigate = useNavigate();

  const isInputEmpty = (email, password) => {
    if(email === "" || password === "") {
      alert('내용을 입력하세요.');
      return true;
    }
    return false;
  }

  const handleLogin = (e) => {
    e.preventDefault(); // 기본 동작 방지
    if(!isInputEmpty(email, password)) {
      axios.post('http://localhost:8080/admin/login', {
        email: email,
        password: password,
      })
      .then(res => {
        if(res.data === "") {
          alert('로그인에 실패하였습니다.\n아이디와 비밀번호를 확인하세요.');
        } else {
          alert('로그인에 성공하였습니다.');
          setRedirectTo('/'); // 이동할 페이지 URL 설정
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  useEffect(() => {
    if(redirectTo) {
      navigate(redirectTo); // 페이지 이동
      setRedirectTo(null); // 상태(state) 초기화
    }
  }, [redirectTo, navigate]);


  return (
    <div className='container'>
      <div className='center flex-col'>
        <form onSubmit={handleLogin}>
          <input  type='email' value={email} placeholder='이메일' onChange={(e) => setEmail(e.currentTarget.value)}/>

          <input type='password' value={password} placeholder='비밀번호' onChange={(e) => setPassword(e.currentTarget.value)}/>

          <button type='submit'>로그인</button>
          <div>
            <div onClick={() => alert('아이디 찾기로 이동')}>아이디 찾기 &gt;</div>
            <div onClick={() => alert('비밀번호 찾기로 이동')}>비밀번호 찾기 &gt;</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;