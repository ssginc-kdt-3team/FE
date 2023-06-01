import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../../../assets/css/modal/Modal.module.css';
import axios from 'axios';
import { confirm, error } from '../../../utils/notification';
import SelectCoupon from '../../ui/reservation/SelectCoupon';
import Point from '../../ui/reservation/Point';
import { cashFormat } from '../../../utils/cashFormat';
import CashInfo from '../../ui/reservation/CashInfo';

// const { confirm } = Modal;

function Pay({isModalOpen, setIsModalOpen, data, setData, shopName}) {
  const [couponId, setCouponId] = useState(-1);
  const [couponDiscountValue, setCouponDiscountValue] = useState(0);
  const [pointValue, setPointValue] = useState(0);
  const [isCouponUsed, setIsCouponUsed] = useState(false);

  const initialDeposit = (parseInt(data.people) - parseInt(data.child)) * 2000; // 지불해야 할 예약금
  const [finalDeposit, setFinalDeposit] = useState(0); // 최종 예약금
  
  // 쿠폰id가 바뀔 때마다 resvInfo 업데이트
  useEffect(() => {  
    if(couponId === -1) // 쿠폰을 사용하지 않은 경우
      setIsCouponUsed(false);
    else // 쿠폰을 사용한 경우
      setIsCouponUsed(true);

    setData( prevData => ({ // setResvInfo 함수를 호출하면 현재의 resvInfo 상태값을 이전 상태값인 prevResvInfo 매개변수로 전달
      ...prevData, // 기존 값 복사
      couponId: couponId,
      pointValue: pointValue
    }))
  }, [setData, couponId, pointValue])

  useEffect(() => {
    console.log('couponDiscountValue: ' + couponDiscountValue);
  }, [couponDiscountValue])

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
    setCouponId(-1); // 쿠폰 초기화
    setCouponDiscountValue(0); // 쿠폰 할인금액 초기화
    setIsCouponUsed(false);
    setPointValue(''); // 포인트 사용 초기화
  }

  const handlePay = () => {
    console.log(data);
    console.log(shopName);
    
    confirm('결제 하시겠습니까?', '', () => { 
      // console.log(resvInfo.reservationDate.slice(11, ));
      // if(resvInfo.reservationDate.slice(11, ) === "00:00:00") { // 시간 선택 검증
      //   alert("시간을 선택하세요.");
      //   return;
      // }
  
      // axios.post('/customer/reservation/add', resvInfo)
      // .then(res => {
      //   console.log(res);
      //   alert('예약이 등록되었습니다.');
      //   navigate("/resv", { replace: true });
      // })
      // .catch(err => console.log(err))
      
    })
  }

  useEffect(() => {
    setFinalDeposit((parseInt(data.people) - parseInt(data.child)) * 2000 - couponDiscountValue - pointValue);
  }, [data, couponDiscountValue, pointValue])

  return (
    <Modal
      className={`${styles.modalWrap} ${styles.wide}`}
      title="예약금 결제"
      centered
      open={isModalOpen}
    >
      <div id={styles.payInfoWrap} className='flex flex-col flex-gap-32'>
        {/* 예약 정보 */}
        <p className='grid-3c center-h'>
          <span>{shopName}</span>
          <span>{data.reservationDate.slice(0, 11)}<br/>{data.reservationDate.slice(11, )}</span>
          <span>{data.people}명<br/>(유아 {data.child}명)</span>
        </p>

        {/* 결제 정보 */}
        <div id={styles.payInfo} className='flex flex-col'>
          {/* 예약금 */}
          <p><span>예약금</span>{cashFormat(initialDeposit)}원</p>
          
          {/* 쿠폰 */}
          <div className='center-h'>
            <p><span>쿠폰 할인</span><div style={{ width: 'var(--button-width-s)', display: 'inline-block' }}>{cashFormat(couponDiscountValue)}원</div></p>
            <SelectCoupon couponId={couponId} setCouponId={setCouponId} setCouponDiscountValue={setCouponDiscountValue}/>
          </div>
          
          {/* 포인트 */}
          <Point 
            pointValue={pointValue} 
            setPointValue={setPointValue} 
            initialDeposit={initialDeposit} 
            finalDeposit={finalDeposit} 
            isCouponUsed={isCouponUsed} 
            couponDiscountValue={couponDiscountValue}
          />

          {/* 최종 예약금 */}
          <p><span>최종 예약금</span>{cashFormat(finalDeposit)}원</p>

          {/* 충전금 */}
          <CashInfo/>
        </div>
      </div>

      <div id={styles.buttonWrap}>
        <Button className='button buttonReverse' onClick={handleModalClose}>취소</Button>
        <Button type="primary" className='button' onClick={handlePay}>결제</Button>
      </div>
    </Modal>
  );
}

export default Pay;