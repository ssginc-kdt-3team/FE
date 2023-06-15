import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { loginState } from '../../state/loginState';

export default function CheckLogin() {
  const loginInfo = useRecoilValue(loginState);
  // console.log(loginInfo.isLoggedin);

  // useEffect(() => {
  //   console.log(loginInfo.isLoggedin);
  // }, [loginInfo])

  const navigate = useNavigate();
  const { pathname } = useLocation();

  let whiteList = ['/', '/login', '/find-id', '/find-id/result', '/find-pwd', '/find-pwd/result', '/join', '/branch'];

  // /shop으로 시작하는 주소와 /event로 시작하는 주소를 whiteList에 추가
  if (pathname.startsWith('/shop') || pathname.startsWith('/event')) {
    whiteList.push(pathname);
  }

  useEffect(() => {
    if(!loginInfo.isLoggedin) {
      console.log(pathname);

      if(!whiteList.includes(pathname)) {
        // error('로그인이 필요합니다.');
        navigate('/login', { replace: true });
      }
    }
  }, [loginInfo ,pathname, whiteList]);

  return null;
}