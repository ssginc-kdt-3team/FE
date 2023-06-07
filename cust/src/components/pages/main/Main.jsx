import React from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../../state/loginState';
import styles from '../../../assets/css/pages/main/Main.module.css';
import styled from 'styled-components';
import ResvInfoCarousel from '../../ui/main/ResvInfoCarousel';
import BranchCarousel from '../../ui/main/BranchCarousel';
import PageTitle from './../../ui/PageTitle';
import RecdShopCarousel from '../../ui/main/RecdShopCarousel';

const Div = styled.div`
  max-width: 1200px;
  width: 85%;
  height: 100%;
  margin: 0 auto;
  padding: 100px 0;
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    gap: 20px;
  }
`;

function Main() {
  return (
    <div id={styles.container}>
      <section id={styles.topWrap}>
        <Div className='flex flex-gap-40'>
          {/* 배너 */}
          <BranchCarousel/>

          {/* 예약 정보 카드 */}
          <ResvInfoCarousel/>
        </Div>
      </section>

      {/* 추천 매장 */}
      <section id={styles.middleWrap}>
        <PageTitle title='추천 매장'/>
        <RecdShopCarousel/>
      </section>
      
    </div>
  );
}

export default Main;