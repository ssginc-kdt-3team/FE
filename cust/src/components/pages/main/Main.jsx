import React from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../../state/loginState';
import styles from '../../../assets/css/pages/main/Main.module.css';
import styled from 'styled-components';
import ResvInfoCarousel from '../../ui/main/ResvInfoCarousel';
import EventCarousel from '../../ui/main/EventCarousel';
import PageTitle from './../../ui/PageTitle';
import RecdShopCarousel from '../../ui/main/RecdShopCarousel';
import BranchInfoCard from '../../ui/main/BranchInfoCard';

const Div = styled.div`
  max-width: var(--device-width-l);
  width: 85vw;
  height: 100%;
  margin: 0 auto;
  /* padding-top: 100px; */
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    gap: 20px;
  }
`;

function Main() {
  return (
    <div id={styles.container} className='flex flex-col flex-gap-40'>
      <ion-icon name="chevron-forward-outline"></ion-icon>

      <section id={styles.topWrap}>
        <Div className='flex flex-gap-40' style={{paddingTop: '80px'}}>
          {/* 배너 */}
          <EventCarousel/>

          {/* 예약 정보 카드 */}
          <ResvInfoCarousel/>
        </Div>
      </section>

      {/* 추천 매장 */}
      <section id={styles.middleWrap}>
        <Div className='box'>
          {/* <PageTitle title='추천 매장'/> */}
          <RecdShopCarousel/>
        </Div>
      </section>

      <section id={styles.bottomWrap} className='background' style={{marginTop: '60px'}}>
        <Div className='box shadow-box' style={{margin: '-60px auto 60px auto', padding: '40px 60px'}}>
          <BranchInfoCard/>
        </Div>
      </section>
      
    </div>
  );
}

export default Main;