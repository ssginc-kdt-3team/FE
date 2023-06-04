import React, { useEffect, useState } from 'react';
import GradeTag from './GradeTag';
import styles from '../../../assets/css/ui/profile/ProfileInfoCard.module.css'
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import { cashFormat } from '../../../utils/cashFormat';
import next from '../../../assets/images/icons/next.png';
import { Link } from 'react-router-dom';

function ProfileInfoCard() {
  const loginInfo = useRecoilValue(loginState);

  const [remainedCash, setRemainedCash] = useState(0); // 충전금 현황
  const [remainedPoint, setRemainedPoint] = useState(0); // 포인트 현황

  useEffect(() => {
    axios.all([
      axios.get(`/customer/charge/check/${loginInfo.id}`), // 층전금 현황
      axios.get(`/customer/point/check/${loginInfo.id}`), // 포인트 현황
      // axios.get(url3)
    ])
    .then(axios.spread((res1, res2) => {
      console.log(res1);
      setRemainedCash(res1.data.value);
      console.log(res2);
      setRemainedPoint(res2.data.value);
    }))
    .catch(err => {
      console.log(err);
    });

  }, [loginInfo])

  return (
    <div id={styles.profileInfoWrap} className='box flex flex-col flex-gap-60'>
      <div className='flex flex-gap-16'>
        <h1>지수 님</h1>
        <GradeTag status='Gold'/>
      </div>

      {/* <div className='flex flex-gap-32'>
        <Link to='' className='center-h'>
          개인정보 변경
          <img src={next} alt="move to page"/>
        </Link>
        
        <Link to='' className='center-h'>
          비밀번호 변경
          <img src={next} alt="move to page"/>
        </Link>
      </div> */}

      <div id={styles.summaryWrap} className='grid-4c'>
        {/* 충전금 */}
        <div className='center flex-col'>
          <label>충전금</label>
          <p>{cashFormat(remainedCash)}원</p>
        </div>
        
        {/* 포인트 */}
        <div className='center flex-col'>
          <label>포인트</label>
          <p>{cashFormat(remainedPoint)}P</p>
        </div>
        
        {/* 쿠폰 */}
        <div className='center flex-col'>
          <label>쿠폰</label>
          <p>0</p>
        </div>
        
        {/* 현재 예약 */}
        <div className='center flex-col'>
          <label>현재 예약</label>
          <p>0</p>
        </div>  
      </div>
    </div>
  );
}

export default ProfileInfoCard;