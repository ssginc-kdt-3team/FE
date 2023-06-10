import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/layout/MobNav.module.css';
import menuData from "../../data/menuData";
import { useRecoilState } from 'recoil';
import { loginState } from '../../state/loginState';
import MobNavMenu from '../ui/layout/MobNavMenu';

function MobNav({isNavOpen, setIsNavOpen}) {
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);

  const handleLogout = () => {
    setLoginInfo({
      id: -1,
      name: '',
      isLoggedin: false
    });
  }

  return (
    <>
      <div id={styles.mobNavWrap} className={isNavOpen ? styles.open : styles.close}>
        <div className='space-between' style={{ padding: '0 2px 32px 2px' }}>
          <span>
            <Link 
              to={loginInfo.isLoggedin ? `/profile/` : '/login'} 
              onClick={() => setIsNavOpen(false)}
              style={{ padding: '0 2px', fontSize: '16px', color: 'var(--main)' }}
            >
              {loginInfo.isLoggedin ? loginInfo.name : '로그인'}
            </Link>
            {/* { loginInfo.isLoggedin ? <span>{loginInfo.id}</span> : <Link to='/login' onClick={() => setIsNavOpen(false)}>로그인</Link> } */}
            {loginInfo.isLoggedin ? ' 님 환영합니다!' : '이 필요합니다.'}
          </span>

          <span onClick={handleLogout}>로그아웃</span>
        </div>
        
        <ul>
          {
            menuData && menuData.map( data => (
              // <Link to={data.link} key={data.id} onClick={() => setIsNavOpen(false)}>
                <MobNavMenu key={data.id} data={data} setIsNavOpen={setIsNavOpen}/>
              // </Link>
            ))
          }
        </ul>
      </div>

      {/* <div id={styles.background} style={isNavOpen ? { opacity: '0.7', height: '100%' } : { opacity: '0', height: '0' }}></div> */}
    </>
  );
};

export default MobNav;