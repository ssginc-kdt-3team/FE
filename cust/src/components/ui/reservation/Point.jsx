import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import { error } from '../../../utils/notification';
import { Button } from 'antd';
import styles from '../../../assets/css/modal/Modal.module.css';
import { isPointValid } from '../../../utils/reservation/pointValidation';
import { cashFormat } from '../../../utils/cashFormat';

function Point({pointValue, setPointValue, initialDeposit, finalDeposit, isCouponUsed, couponDiscountValue}) {
  const loginInfo = useRecoilValue(loginState);

  const [isUsedAll, setIsUsedAll] = useState(false);
  const [remainedPoint, setRemainedPoint] = useState(0);
  // console.log('remainingPoint: ' + remainedPoint + ' / finalDeposit: ' + finalDeposit);

  // 입력한 포인트 처리
  const handlePointInput = (e) => {
    const enteredPoint = parseInt(e.target.value);
    setIsUsedAll(false);

    console.log('isCouponUsed: ' + isCouponUsed);
    if(isPointValid(enteredPoint, remainedPoint, isCouponUsed ? initialDeposit - couponDiscountValue : initialDeposit)) {
      // 포인트 범위 내
      setPointValue(e.target.value);
    }
    else {
      // 포인트 범위 넘어감
      setIsUsedAll(true);

      if(isCouponUsed)
        setPointValue(remainedPoint > initialDeposit - couponDiscountValue ? initialDeposit - couponDiscountValue : remainedPoint); // 남아 있는 포인트 최대 적용
      else
        setPointValue(remainedPoint > initialDeposit ? initialDeposit  : remainedPoint); // 남아 있는 포인트 최대 적용
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

  // 포인트 전액 사용 처리
  const useAllPoint = () => {
    setIsUsedAll(true);
    setPointValue(remainedPoint);
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
        {cashFormat(remainedPoint)}원
        <div className='flex flex-gap-20'>
          {
            isUsedAll ? (
              <input type="text" value={pointValue} onChange={handlePointInput}/>
            )
            : (
              <input type="text" onChange={handlePointInput}/>
            )
          }
          <Button className='button buttonReverse button-s' onClick={useAllPoint}>전액 사용</Button>
        </div>
      </div>
    </p>
  );
}

export default Point;