import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../assets/css/ui/reservation/ResvCard.module.css'
import ResvStatusTag from '../../ui/reservation/ResvStatusTag';

function ResvCard({data}) {
  console.log(data);
  return (
    <li>
      <Link to={`/resv/${data.reservationId}`}>
        <div id={styles.resvCardWrap} className='box shadow-box'>
          <div id={styles.topWrap} className='space-between'>
            <h1>{data.shopName}</h1>
            {/* <ResvStatus status={data.reservationStatus}/> */}
            <ResvStatusTag status={data.reservationStatus}/>
            {/* <div>{data.reservationStatus}</div> */}
          </div>

          <div id={styles.bottomWrap}>
            <p>
              <span>예약 시간</span>{data.expectedDate} {data.expectedTime.slice(0, 8)}
            </p>
            
            <p>
              <span>예약 인원</span>{data.people}명 (유아 {data.child}명)
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ResvCard;