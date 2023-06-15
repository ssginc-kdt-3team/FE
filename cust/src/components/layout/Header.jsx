import React, { useState } from 'react';
import styles from '../../assets/css/layout/Header.module.css';
import menuData from "../../data/menuData";
import logo from '../../assets/images/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MobNav from './MobNav';
import SubMenu from './SubMenu';
import { useRecoilState } from 'recoil';
import { loginState } from '../../state/loginState';
import { confirm } from '../../utils/notification';

function Header() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useRecoilState(loginState);

  // 로그아웃 처리
  const handleLogout = () => {
    setLoginInfo({
      id: -1,
      name: '',
      isLoggedin: false
    });
    navigate('/'); // 홈 화면으로 이동
  }

  // 모바일 Nav 상태
  const [isNavOpen, setIsNavOpen] = useState(false);
 
  const handleNav = () => {
    console.log(isNavOpen)
    setIsNavOpen(!isNavOpen);
  };

  // 데스크탑 SubMenu 상태
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
 
  // const handleSubMenu = () => {
  //   console.log(isSubMenuOpen)
  //   setIsSubMenuOpen(!isSubMenuOpen);
  // };
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/chargeResult");

  if (hideHeader) {
    return null; // Header를 숨김
  }

  // 헤더 메뉴 이동
  const handleMove = (data) => {
    console.log(data.needLogin);
    console.log(data.link);
    
    if(data.needLogin) {
      if(loginInfo.isLoggedin) {
        navigate(data.link);
        return;
      }
      else {
        confirm('로그인이 필요합니다.', () => { navigate('/login'); });
        return;
      }
    }
    console.log('needLogin false')
    navigate(data.link);
    return;
  }

  return (
    <div className='fixed-top' style={{zIndex: '99'}}>
      <header style={isSubMenuOpen || isNavOpen ? {boxShadow: 'none'} : {}}>
        <div id={styles.headerWrap}>
          {/* 로그인/회원가입/프로필 */}
          <div id={styles.topWrap} className='flex-end'>
            <Link to="/login" style={loginInfo.isLoggedin ? { display: 'none' } : { display: 'block' }}><span>로그인</span></Link>
            <Link to="/join" style={loginInfo.isLoggedin ? { display: 'none' } : { display: 'block' }}><span>회원가입</span></Link>
            <Link to="/profile" style={loginInfo.isLoggedin ? { display: 'block' } : { display: 'none' }}><span>{loginInfo.name} 님</span></Link>
            <span onClick={handleLogout} style={loginInfo.isLoggedin ? { display: 'block', cursor: 'pointer' } : { display: 'none' }}>로그아웃</span>
          </div>

          {/* 로고 */}
          <div id={styles.middleWrap} className='center'>
            <Link to="/" onClick={() => setIsNavOpen(false)}>
              <img id={styles.logo} src={logo} alt="logo" />
              <h1>스타필드 예약시스템</h1> {/* h1 태그는 있으면 좋다, css로 텍스트 숨김 */}
            </Link>
          </div>

          {/* 메뉴 */}
          <ul id={styles.bottomWrap} className='center flex-gap-48' onMouseOver={() => setIsSubMenuOpen(true)} onMouseOut={() => setIsSubMenuOpen(false)}>
            {
              menuData && menuData.map( data => (
                <Link 
                  to={data.link}
                  key={data.id} 
                  // onClick={() => handleMove(data)}
                >
                  <li>{data.name}</li>
                </Link>
              ))
            }
          </ul>
            
          {/* 모바일 */}
          <div className={`${styles.navBtn} ${isNavOpen ? styles.active : ''}`} onClick={handleNav}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            {/* <img src={!isNavOpen ? hamburger : close} alt="navBtn"/> */}
          </div>
          
        </div>
        
      </header>
      
      {/* 데스크탑 SubMenu */}
      <SubMenu isSubMenuOpen={isSubMenuOpen} setIsSubMenuOpen={setIsSubMenuOpen}/>

      {/* 모바일 Nav */}
      <MobNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen}/>
    </div>
  );
}

export default Header;