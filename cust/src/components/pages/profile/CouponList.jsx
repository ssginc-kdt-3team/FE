import React, { useEffect, useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import CouponCard from '../../ui/profile/CouponCard';
import styled from 'styled-components';

const Ul = styled.ul`
  max-width: 800px;
  width: 75%;
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

function Coupon() {
  const loginInfo = useRecoilValue(loginState);

  const [couponList, setCouponList] = useState(null);

  useEffect(() => {
    axios.get(`customer/coupon/${loginInfo.id}`)
    .then(res => {
      console.log(res.data);
      setCouponList(res.data);
    })
    .catch(err => { // 오류 처리
      console.log(err);
    })
  }, [loginInfo])

  return (
    <div className='container background'>
      <div className='center flex-col'>
        <PageTitle title='쿠폰' />

        <Ul className='grid-2c flex-gap-40'>
          {
            couponList && couponList.map( coupon => (
              <CouponCard data={coupon}/>
            ))
          }
        </Ul>
        
      </div>
    </div>
  );
}

export default Coupon;