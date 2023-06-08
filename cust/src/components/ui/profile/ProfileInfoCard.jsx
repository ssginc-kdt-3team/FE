import React, { useEffect, useState } from 'react';
import GradeTag from './GradeTag';
import styles from '../../../assets/css/ui/profile/ProfileInfoCard.module.css'
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import { cashFormat } from '../../../utils/format';
import next from '../../../assets/images/icons/next.png';
import { Link } from 'react-router-dom';

function ProfileInfoCard() {
  const loginInfo = useRecoilValue(loginState);

  const [grade, setGrade] = useState(''); // 충전금 현황
  const [remainedCash, setRemainedCash] = useState(0); // 충전금 현황
  const [remainedPoint, setRemainedPoint] = useState(0); // 포인트 현황
  const [coupon, setCoupon] = useState(0); // 쿠폰 현황
  const [activeResv, setActiveResv] = useState(0); // 현재 예약 현황

  useEffect(() => {
    axios.all([
      axios.get(`customer/grade/${loginInfo.id}`), // 등급
      axios.get(`/customer/charge/check/${loginInfo.id}`), // 층전금 현황
      axios.get(`/customer/point/check/${loginInfo.id}`), // 포인트 현황
      axios.get(`customer/coupon/${loginInfo.id}`), // 쿠폰 현황
      axios.get(`/customer/reservation/listActive/${loginInfo.id}/1`), // 현재 예약 현황
      // axios.get(url3)
    ])
    .then(axios.spread((res1, res2, res3, res4, res5) => {
      console.log(res1);
      setGrade(res1.data.name);
      setRemainedCash(res2.data.value);
      setRemainedPoint(res3.data.value);
      setCoupon(res4.data.length);
      setActiveResv(res5.data.totalElements);
    }))
    .catch(err => {
      console.log(err);
    });

  }, [loginInfo])

  return (
    <div id={styles.profileInfoWrap} className='box shadow-box flex flex-col flex-gap-60'>
      <div className='flex flex-gap-16'>
        <h1>{loginInfo.name} 님</h1>
        <GradeTag status={grade}/>
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
          <Link to='/cash'>{cashFormat(remainedCash)}</Link>
        </div>
        
        {/* 포인트 */}
        <div className='center flex-col'>
          <label>포인트</label>
          <Link to='/point'>{cashFormat(remainedPoint)}</Link>
        </div>
        
        {/* 쿠폰 */}
        <div className='center flex-col'>
          <label>쿠폰</label>
          <Link to='/coupon'>{coupon}</Link>
        </div>
        
        {/* 현재 예약 */}
        <div className='center flex-col'>
          <label>현재 예약</label>
          <Link to='/resv/active'>{activeResv}</Link>
        </div>  
      </div>
    </div>
  );
}

export default ProfileInfoCard;