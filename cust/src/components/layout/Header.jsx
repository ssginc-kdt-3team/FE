import React, { useState } from 'react';
import styles from '../../assets/css/layout/Header.module.css';
import menuData from "../../data/menuData";
import logo from '../../assets/images/logo.png';
import hamburger from '../../assets/images/icons/hamburger.png';
import close from '../../assets/images/icons/close.png';
import { Link } from 'react-router-dom';
import MobNav from './MobNav';
import SubMenu from './SubMenu';

function Heaader() {
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

  return (
    <>
      <header>
        <div id={styles.headerWrap}>
          {/* 로그인/회원가입/프로필 */}
          <div id={styles.topWrap} className='flex-end'>
            <Link to="/login"><span>로그인</span></Link>
            <Link to="/join"><span>회원가입</span></Link>
          </div>

          {/* 로고 */}
          <div id={styles.middleWrap} className='center'>
            <Link to="/">
              <img id={styles.logo} src={logo} alt="logo" />
              <h1>스타필드 예약시스템</h1> {/* h1 태그는 있으면 좋다, css로 텍스트 숨김 */}
            </Link>
          </div>

          {/* 메뉴 */}
          <ul id={styles.bottomWrap} className='center flex-gap-45' onMouseOver={() => setIsSubMenuOpen(true)} onMouseOut={() => setIsSubMenuOpen(false)}>
            {
              menuData && menuData.map( data => (
                <Link to={data.link} key={data.id}>
                  <li>{data.name}</li>
                </Link>
              ))
            }
          </ul>
            
          {/* 모바일 */}
          <div className={styles.navBtn} onClick={handleNav}>
            <img src={!isNavOpen ? hamburger : close} alt="navBtn"/>
          </div>
          
        </div>
        
      </header>
      
      {/* 데스크탑 SubMenu */}
      <SubMenu isSubMenuOpen={isSubMenuOpen} setIsSubMenuOpen={setIsSubMenuOpen}/>

      {/* 모바일 Nav */}
      <MobNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen}/>
    </>
  );
}

export default Heaader;