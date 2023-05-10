import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../../assets/css/pages/reservation/Resv.module.css'
import PageTitle from '../../ui/PageTitle';
import StoreInfoCard from '../../widget/reservation/StoreInfoCard';
import CustInfoCard from '../../widget/reservation/CustInfoCard';
import ResvInfoCard from '../../widget/reservation/ResvInfoCard';

function Resv() {
  const { resvId } = useParams();

  useEffect(() => {

  }, [])
  
  return (
    <div className='container background'>
      <div className='center flex-col'>
        <PageTitle title="예약 상세" fontSize="1.6rem" marginTop="60px" marginBottom="80px"/>
        <div id={styles.detailWrap}>
          {/* 예약 정보 */}
          <ResvInfoCard/>

          {/* 예약자 정보 */}
          <CustInfoCard/>

          {/* 매장 정보 */}
          <StoreInfoCard/>
        </div>
      </div>
    </div>
  );
}

export default Resv;