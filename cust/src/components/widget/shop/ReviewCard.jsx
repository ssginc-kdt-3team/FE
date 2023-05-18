import React, { useState } from 'react';
import styles from '../../../assets/css/widget/shop/ReviewCard.module.css';

function ReviewCard({data}) {
  const [isContentWrapOpen, setIsContentWrapOpen] = useState(false);

  return (
    <div className='box' style={{width: '100%'}}>
      <div id={styles.titleWrap} className='space-between'>
        <h3 style={{width: '75%'}}>{data.reviewTitle}</h3>
        <div style={{cursor: 'pointer'}} onClick={() => setIsContentWrapOpen(!isContentWrapOpen)}>▼</div>
      </div>

      <div id={styles.contentWrap} className={`${isContentWrapOpen ? styles.open : styles.close}`} style={{width: '100%'}}>
        <p style={{width: '100%'}}>{data.reviewContent}</p>
      </div>
    </div>
  );
}

export default ReviewCard;