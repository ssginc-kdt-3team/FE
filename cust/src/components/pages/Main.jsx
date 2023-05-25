import React from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../state/loginState';

function Main() {
  const setLoginState = useSetRecoilState(loginState);

  const handleLogout = () => {
    setLoginState({
      id: -1,
      isLoggedin: false
    });
  }

  return (
    <>
      메인화면
      <button type='button' onClick={handleLogout}>로그아웃</button>
    </>
    // <ul>
    //   <li><Link to={"/resv/add"}>예약하기</Link></li>
    //   <li><Link to={"/resv"}>예약내역</Link></li>
    //   <li><Link to={"/resv/active"}>유효한 예약내역</Link></li>
    // </ul>
  );
}

export default Main;