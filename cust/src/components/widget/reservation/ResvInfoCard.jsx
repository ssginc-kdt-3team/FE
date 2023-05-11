import React from 'react';
import styles from '../../../assets/css/widget/reservation/ResvInfoCard.module.css';
import ResvStatus from '../../ui/ResvStatus';
import ResvStatusTag from '../../ui/ResvStatusTag';

function ResvInfoCard({data}) {
  return (
    <>
      {
        data && (
          <div id={styles.resvInfoWrap} className='box flex flex-col flex-gap-20'>
            <div id={styles.topWrap} className='space-between'>
              <div>{data.shopName}</div>
              {/* <ResvStatus status={data.reservationStatus}/> */}
              <ResvStatusTag status={data.reservationStatus}/>
              {/* <div>{data.reservationStatus}</div> */}
            </div>

            <div id={styles.middleWrap}>
              <p><span>예약 인원</span>{data.people}명 (유아 {data.child}명)</p>
              <p><span>예약 시간</span>{data.expectedTime}</p>
              <p><span>요청 사항</span>{data.memo}</p>
            </div>

            <div id={styles.bottomWrap} className='center'>
              <div className='button buttonReverse'>예약 변경</div>
              <div className='button'>예약 취소</div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default ResvInfoCard;