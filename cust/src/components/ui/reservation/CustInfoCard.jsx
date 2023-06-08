import React from 'react';
import styles from '../../../assets/css/ui/reservation/CustInfoCard.module.css';

function CustInfoCard({data}) {
  return (
    <>
      {
        data && (
          <div id={styles.custInfoWrap} className='box shadow-box flex flex-col flex-gap-20'>
            <div id={styles.topWrap}>예약자 정보</div>

            <div id={styles.bottomWrap}>
              <p><span>이름</span>{data.customerName}</p>
              <p><span>휴대폰</span>{data.customerPhone}</p>
              <p><span>이메일</span>{data.customerEmail}</p>
            </div>
          </div>
        )
      }
    </>
  );
}

export default CustInfoCard;