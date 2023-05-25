import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/layout/MobNav.module.css';
import menuData from "../../data/menuData";
import { useRecoilValue } from 'recoil';
import { loginState } from '../../state/loginState';
import MobNavMenu from '../ui/MobNavMenu';

function MobNav({isNavOpen, setIsNavOpen}) {
  const loginInfo = useRecoilValue(loginState);

  return (
    <>
      <div id={styles.mobNavWrap} className={isNavOpen ? styles.open : styles.close}>
        <div>
          { loginInfo.isLoggedin ? <span>{loginInfo.id}</span> : <Link to='/login' onClick={() => setIsNavOpen(false)}>로그인</Link> }
          { loginInfo.isLoggedin ? ' 번 님 환영합니다!' : '이 필요합니다.' }
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