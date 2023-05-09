import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/ui/ResvCard.module.css'

function ResvCard({data}) {
  return (
    <li>
      <Link to={`/resv/${data.id}`}>
        <div id={styles.resvCardWrap}>
          <div id={styles.topWrap}>
            {data.shopName}
            {/* <span></span> */}
          </div>

          <div id={styles.bottomWrap}>
            <p>
              <span>일정: </span>
              <span>{data.expectedDate} {data.expectedTime}</span>
            </p>
            
            <p>
              <span>인원: </span>
              <span>{data.people} (유아 수: {data.child})</span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ResvCard;