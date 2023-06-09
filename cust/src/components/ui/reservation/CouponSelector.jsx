import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import { error } from '../../../utils/notification';
import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

function SelectCoupon({couponId, setCouponId, setCouponDiscountValue}) {
  const loginInfo = useRecoilValue(loginState);

  const [couponList, setCouponList] = useState(null);

  // 쿠폰 선택 처리
  const handleCouponSelect = (e) => { // 쿠폰이 변경될 때 마다
    // console.log(e);
    setCouponId(e);

    const selectedCoupon = couponList.find(coupon => coupon.couponId === e); // 선택된 쿠폰을 couponList에서 찾아서
    if(selectedCoupon)
      setCouponDiscountValue(selectedCoupon.discountValue); // 할인 가격을 설정
    else
      setCouponDiscountValue(0); // 쿠폰이 없는 경우 쿠폰 할인 없게....
  }
  
  useEffect(() => {
    axios.get(`customer/coupon/${loginInfo.id}`)
      .then(res => {
        console.log(res);
        setCouponList(res.data);
        // setCouponId(res.data[0].discountValue);
      })
      .catch(err => { // 오류 처리
        console.log(err);
        // alert(err.response.data);
        error(err.response.data);
      })
  }, [loginInfo, setCouponId])

  return (
    <Select bordered={false} size='large' value={couponId} onChange={handleCouponSelect} style={{ width: '150px' }}>
      <Option value={-1}>사용 안 함</Option>
      {
        couponList && couponList.map( coupon => (
          <Option key={coupon.couponId} value={coupon.couponId}>{coupon.couponName}</Option>
        ))
      }
    </Select>
  );
}

export default SelectCoupon;