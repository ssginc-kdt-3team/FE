import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/layout/MobNav.module.css';
import menuData from "../../data/menuData";

function MobNav({isNavOpen, setIsNavOpen}) {
  return (
    <div id={styles.mobNavWrap} className={isNavOpen ? styles.open : styles.close}>
      {/* <div>
        { isLoggedin ? <span>{user.name}</span> : <Link to='/login' onClick={() => setIsNavOpen(false)}>로그인</Link> }
        { isLoggedin ? ' 님 환영합니다!' : '이 필요합니다.' }
      </div> */}
      
      <ul>
        {
          menuData && menuData.map( data => (
            <Link to={data.link} key={data.id} onClick={() => setIsNavOpen(false)}>
              <div>{data.name}</div>
            </Link>
          ))
        }
      </ul>
    </div>
  );
};

export default MobNav;