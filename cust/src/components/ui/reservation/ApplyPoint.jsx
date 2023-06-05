import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import { error } from '../../../utils/notification';
import { Button } from 'antd';
import styles from '../../../assets/css/modal/Modal.module.css';
import { canUsePoint, isPointValid } from '../../../utils/reservation/pointValidation';
import { cashFormat, onlyNum } from '../../../utils/format';
import { styled } from 'styled-components';

const Span = styled.span`
  font-size: var(--info-fontSize);
  color: var(--main);
  margin-top: 5px;
`;

function ApplyPoint({pointValue, setPointValue, initialDeposit, finalDeposit, isCouponUsed, couponDiscountValue}) {
  const loginInfo = useRecoilValue(loginState);

  const [remainedPoint, setRemainedPoint] = useState(0);
  // console.log('remainingPoint: ' + remainedPoint + ' / finalDeposit: ' + finalDeposit);

  // 포인트 전액 사용 처리
  const applyAllPoint = () => {
    // 남아 있는 포인트 최대 적용
    if(isCouponUsed)
      setPointValue(remainedPoint > initialDeposit - couponDiscountValue ? initialDeposit - couponDiscountValue : remainedPoint);
    else
      setPointValue(remainedPoint > initialDeposit ? initialDeposit  : remainedPoint);
  }

  const handlePointOnChange = (e) => {
    setPointValue(e.target.value);
  }

  const handlePointOnBlur = (e) => {
    const enteredPoint = parseInt(e.target.value);

    console.log('isCouponUsed: ' + isCouponUsed);
    if(canUsePoint(enteredPoint)) { // 입력한 포인트가 1000 이상
      if(isPointValid(enteredPoint, remainedPoint, isCouponUsed ? initialDeposit - couponDiscountValue : initialDeposit)) {
        // 포인트 범위 내
        setPointValue(e.target.value);
      }
      else {
        // 포인트 범위 넘어감
        applyAllPoint();
      }
    }
    else {
      setPointValue(0);
    }
    
    // console.log('enteredPoint: ' + enteredPoint + ' / remainingPoint: ' + remainedPoint + ' / finalDeposit: ' + finalDeposit);
    // if (enteredPoint > parseInt(remainedPoint) || enteredPoint > parseInt(finalDeposit)) { // 포인트 사용 가능 범위를 넘어서면
    //   console.log('범위 벗어남')
    //   setPointValue(remainedPoint > finalDeposit ? finalDeposit : remainedPoint); // 남아 있는 포인트 전체 적용
    // }
    // else {
    //   setPointValue(e.target.value);
    // }
  }

  
  useEffect(() => {
    axios.get(`/customer/point/check/${loginInfo.id}`)
    .then(res => {
      console.log(res);
      setRemainedPoint(res.data.value);
    })
    .catch(err => { // 오류 처리
      console.log(err);
      // alert(err.response.data);
      error(err.response.data.error, '');
    })
  }, [loginInfo])

  return (
    <p id={styles.pointWrap} className='flex'>
      <span>포인트</span>
      <div className='flex flex-col'>
        {cashFormat(remainedPoint)}P
        <div className='flex flex-gap-20'>
          <input 
            type="text" 
            value={pointValue} 
            onInput={(e) => { e.target.value = onlyNum(e.target.value) }}
            onChange={handlePointOnChange} 
            onBlur={handlePointOnBlur}
          />
          <Button className='button buttonReverse button-s' onClick={applyAllPoint}>전액 사용</Button>
        </div>
        <Span>* 포인트는 1,000P 이상 사용 가능합니다.</Span>
      </div>
    </p>
  );
}

export default ApplyPoint;