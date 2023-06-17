import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../../assets/css/pages/reservation/Resv.module.css'
import PageTitle from '../../ui/PageTitle';
import ShopInfoCardR from '../../ui/reservation/ShopInfoCard';
import CustInfoCard from '../../ui/reservation/CustInfoCard';
import ResvInfoCard from '../../ui/reservation/ResvInfoCard';

function Resv() {
  const { resvId } = useParams();
  
  const [resvInfo, setResvInfo] = useState(null);
  const [custInfo, setCustInfo] = useState(null);
  const [shopInfo, setShopInfo] = useState(null);

  useEffect(() => {
    axios.get(`customer/reservation/${resvId}`)
    .then(res => {
      // console.log(res.data);

      // 예약 정보 저장
      setResvInfo({
        shopName: res.data.shopName,
        expectedTime: res.data.expectedTime,
        people: res.data.people,
        child: res.data.child,
        memo: res.data.memo,
        reservationStatus: res.data.reservationStatus,
        deposit: res.data.deposit,
        cancelReason: res.data.cancelReason,
        canReview: res.data.canReview
      });

      // 사용자 정보 저장
      setCustInfo({
        customerName: res.data.customerName,
        customerEmail: res.data.customerEmail,
        customerPhone: res.data.customerPhone
      });

      // 매장 정보 저장
      setShopInfo({
        shopImgUrl: res.data.shopImgUrl,
        shopName: res.data.shopName,
        shopLocation: res.data.shopLocation
      })
    })
    .catch(err => console.log(err))
  }, [resvId])
  
  return (
    <div className='container background'>
      <div className='center flex-col'>
        <PageTitle title='RESERVATION' phrase='예약 상세 조회'/>
        <div id={styles.detailWrap}>
          {/* 예약 정보 */}
          <ResvInfoCard data={resvInfo} resvId={resvId}/>

          {/* 예약자 정보 */}
          <CustInfoCard data={custInfo}/>

          {/* 매장 정보 */}
          <ShopInfoCardR data={shopInfo}/>
        </div>
      </div>
    </div>
  );
}

export default Resv;