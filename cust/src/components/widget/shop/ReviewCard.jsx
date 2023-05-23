import React, { useState } from 'react';
import styles from '../../../assets/css/widget/shop/ReviewCard.module.css';
import { useRecoilValue } from 'recoil';
import { loginInfo } from '../../../state/loginInfo';
import { Rate } from 'antd';
import toggle from '../../../assets/images/icons/next.png';

function ReviewCard({data}) {
  const loginState = useRecoilValue(loginInfo);
  // console.log(loginState.id);

  const [isContentWrapOpen, setIsContentWrapOpen] = useState(false);

  return (
    <div className='box' style={{ width: '100%' }}>
      <div id={styles.titleWrap} className='space-between'>
        <div className='center-h'>
          <Rate disabled defaultValue={data.point} style={{ width: '132px' }}/>
          <h3>{data.title}</h3>
        </div>

        <div 
          onClick={() => setIsContentWrapOpen(!isContentWrapOpen)} 
          style={{ transform: isContentWrapOpen ? 'rotate(270deg)' : 'rotate(90deg)' }}
        >
        </div>
      </div>

      <div id={styles.contentWrap} className={`${isContentWrapOpen ? styles.open : styles.close}`}>
        {/* 작성일 */}
        <div className='flex-end'>
          <span>작성일 : {data.writeTime.slice(0, 10)} {data.writeTime.slice(11, 19)}</span>
        </div>
        
        {/* 이름, 삭제버튼 */}
        <div className='space-between'>
          <div id={styles.name}>{data.userName.slice(0, 1)}{'O'.repeat(data.userName.length - 2)}{data.userName.slice(-1, )}</div>
          <div id={styles.deleteBtn} style={data.userId === loginState.id ? { display: 'block' } : { display: 'none' }}>삭제</div>
        </div>
        
        {/* 내용 */}
        <p>{data.contents}</p>
      </div>
    </div>
  );
}

export default ReviewCard;