import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../../state/loginState';
import styles from '../../../assets/css/pages/main/Main.module.css';
import styled from 'styled-components';
import ResvCarousel from '../../ui/main/ResvCarousel';
import EventCarousel from '../../ui/main/EventCarousel';
import PageTitle from './../../ui/PageTitle';
import RecdShopCarousel from '../../ui/main/RecdShopCarousel';
import BranchInfoCard from '../../ui/main/BranchInfoCard';
import MobResvCarousel from '../../ui/main/MobResvCarousel';

const Div = styled.div`
  max-width: var(--device-width-l);
  width: 90vw;
  height: 100%;
  margin: 0 auto;
  /* padding-top: 100px; */
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    gap: 24px;
  }
`;

function Main() {
  const [branchImg, setBranchImg] = useState('');

  return (
    <div id={styles.container} className='flex flex-col flex-gap-40'>
      <section id={styles.topWrap}>
        <Div className='flex flex-gap-40'>
          {/* 배너 */}
          <EventCarousel/>

          {/* 예약 정보 카드 */}
          <ResvCarousel/>
          <MobResvCarousel/>
        </Div>
      </section>

      {/* 추천 매장 */}
      <section id={styles.middleWrap}>
        <Div>
          <PageTitle title='추천 매장'/>
          <RecdShopCarousel/>
        </Div>
      </section>

      <section id={styles.bottomWrap} style={{display: 'none'}}>
        {/* <Div> */}
          <BranchInfoCard setBranchImg={setBranchImg}/>
        {/* </Div> */}
      </section>
      
    </div>
  );
}

export default Main;