import React from 'react';
import styles from '../../../assets/css/ui/layout/MobNavMenu.module.css';
import next from '../../../assets/images/icons/next.png';
import { useNavigate } from 'react-router-dom';

function MobNavMenu({data, setIsNavOpen}) {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(link);
    setIsNavOpen(false); // MobNav 닫는다
  }

  return (
    <>
      {
        data && (
          <li id={styles.mobNavMenuWrap} >
            <div id={styles.topWrap} className='space-between' onClick={()=> handleNavigate(data.link)}>
              <ion-icon name={data.icon}></ion-icon>
              <h1>{data.name}</h1>
              <img src={next} alt='move to page'/>
            </div>
            {
              data.subMenu ? (
                <ul id={styles.bottomWrap} className='flex flex-col'>
                  {
                    data.subMenu.map( subData => (
                      <li key={subData.id} onClick={()=> handleNavigate(subData.link)}>{subData.name}</li>
                    ))
                  }
                </ul>
              )
              : ''
            }
          </li>
        )
      }
    </>
  );
}

export default MobNavMenu;