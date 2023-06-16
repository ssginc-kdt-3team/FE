import React, { useEffect, useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import CouponCard from '../../ui/profile/CouponCard';
import styled from 'styled-components';
import { Empty } from 'antd';

const Ul = styled.ul`
  width: calc(var(--coupon-width) * 2 + 40px);
  
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 24px;
  }
`;

function Coupon() {
  const loginInfo = useRecoilValue(loginState);

  const [hasData, setHasData] = useState(false);
  const [couponList, setCouponList] = useState(null);

  useEffect(() => {
    axios.get(`customer/coupon/${loginInfo.id}`)
    .then(res => {
      // console.log(res.data);
      setCouponList(res.data);
      setHasData(res.data.length > 0);
    })
    .catch(err => { // 오류 처리
      console.log(err);
      setHasData(false);
    })
  }, [loginInfo])

  return (
    <div className='container background'>
      <div className='center flex-col'>
        <PageTitle title='COUPON' phrase='쿠폰'/>

        {
          hasData ? (
            <Ul className='grid-2c flex-gap-40'>
              {
                couponList && couponList.map( coupon => (
                  <CouponCard data={coupon}/>
                ))
              }
            </Ul>
          )
          : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> 
          )
        }
        
      </div>
    </div>
  );
}

export default Coupon;