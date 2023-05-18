import React, { useState } from 'react';
import styles from '../../../assets/css/widget/shop/ReviewCard.module.css';

function ReviewCard({data}) {
  const [isContentWrapOpen, setIsContentWrapOpen] = useState(false);

  return (
    <div className='box' style={{width: '100%'}}>
      <div id={styles.titleWrap} className='space-between'>
        <div className='flex'>
          <span>★ {data.reviewGrade}</span>
          <h3>{data.reviewTitle}</h3>
        </div>
        <div onClick={() => setIsContentWrapOpen(!isContentWrapOpen)} style={{ cursor: 'pointer', transform: isContentWrapOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</div>
      </div>

      <div id={styles.contentWrap} className={`${isContentWrapOpen ? styles.open : styles.close}`}>
        <div className='flex-end'>
          <span>{data.reviewDate}</span>
        </div>
        <p>{data.reviewContent}</p>
      </div>
    </div>
  );
}

export default ReviewCard;