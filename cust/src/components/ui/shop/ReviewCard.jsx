import React, { useState } from 'react';
import styles from '../../../assets/css/ui/shop/ReviewCard.module.css';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import { Rate } from 'antd';
import axios from 'axios';
import { confirm, error, success } from '../../../utils/notification';

function ReviewCard({data}) {
  // console.log(data);

  const loginInfo = useRecoilValue(loginState);
  // console.log(loginInfo.id);

  const [isContentWrapOpen, setIsContentWrapOpen] = useState(false);

  const confirmReviewDelete = () => {
    // console.log(data.reviewId);
    confirm('후기를 삭제하시겠습니까?', () => {
      axios.post(`/customer/review/delete/${data.reviewId}`)
      .then(res => {
        // console.log(res);
        if(res.data === true)
          success("후기가 삭제되었습니다.");
        // navigate('/resv');
      })
      .catch(err => { // 오류 처리
        error("오류가 발생하였습니다.");
        console.log(err);
      });
    })
  }

  return (
    <div className='box shadow-box' style={{ width: '100%' }}>
      <div id={styles.titleWrap} className='space-between'>
        <div className='center-h'>
          <Rate disabled defaultValue={data.point}/>
          <h3>{data.title}</h3>
        </div>

        <div 
          onClick={() => setIsContentWrapOpen(!isContentWrapOpen)} 
          style={{ transform: isContentWrapOpen ? 'rotate(180deg)' : 'rotate(0)' }}
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
          <h3 id={styles.name}>{data.userName.slice(0, 1)}{'O'.repeat(data.userName.length - 2)}{data.userName.slice(-1, )}</h3>
          <div 
            id={styles.deleteBtn} 
            onClick={confirmReviewDelete}
            style={data.userId === loginInfo.id ? { display: 'block' } : { display: 'none' }}
          >
            삭제
          </div>
        </div>
        
        {/* 내용 */}
        <p>{data.contents}</p>
      </div>
    </div>
  );
}

export default ReviewCard;