import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../../../assets/css/modal/Modal.module.css';
import axios from 'axios';
import { confirm, success } from '../../../utils/notification';
import { cashFormat } from '../../../utils/format';
import CashInfo from '../../ui/reservation/CashInfo';
import { useNavigate } from 'react-router-dom';

// const { confirm } = Modal;

function Pay({isModalOpen, setIsModalOpen, data, setData, payedDeposit}) {
  const navigate = useNavigate();

  const initialDeposit = (parseInt(data.people) - parseInt(data.child)) * 2000; // 지불해야 할 예약금
  const [finalDeposit, setFinalDeposit] = useState(0); // 최종 예약금

  const [needRefund, setNeedRefund] = useState(false); // 환불 필요 여부
  const [refund, setRefund] = useState(0); // 환불 금액
  
  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
  }

  const handlePay = () => {
    // console.log(data);
    
    confirm(' ', () => {   
      axios.post(`/customer/reservation/update/${data.reservationId}`, data)
      .then(res => {
        console.log(res);
        success('예약이 수정되었습니다.');
        navigate("/resv/active", { replace: true });
      })
      .catch(err => console.log(err))
      
    })
  }


  useEffect(() => {
    let calculatedFinalDeposit = (parseInt(data.people) - parseInt(data.child)) * 2000 - payedDeposit;

    if(calculatedFinalDeposit < 0) {
      setNeedRefund(true);
      setRefund(calculatedFinalDeposit);
      setFinalDeposit(0);
    }
    else {
      setNeedRefund(false);
      setFinalDeposit(calculatedFinalDeposit);
    }
  }, [data, payedDeposit])

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
          <span>{data.shopName}</span>
          <span>{data.reservationDateTime.slice(0, 11)}<br/>{data.reservationDateTime.slice(11, )}</span>
          <span>{data.people}명<br/>(유아 {data.child}명)</span>
        </p>

        {/* 결제 정보 */}
        <div id={styles.payInfo} className='flex flex-col'>
          {/* 예약금 */}
          <p><span>예약금</span>{cashFormat(initialDeposit)}원</p>
          
          {/* 결제된 예약금 */}
          <p><span>결제된 예약금</span>{cashFormat(payedDeposit)}원</p>

          {/* 최종 예약금 */}
          <p><span>최종 예약금</span>{cashFormat(finalDeposit)}원</p>
          <p id={styles.refundInfoMessage} style={needRefund ? {display: 'block'} : {display: 'none'}}>* {cashFormat(Math.abs(refund))}원이 충전금 또는 포인트로 환불됩니다.</p>

          {/* 충전금 */}
          <CashInfo/>
        </div>
      </div>

      <div id={styles.buttonWrap}>
        <Button className='button buttonReverse button-s' onClick={handleModalClose}>취소</Button>
        <Button type="primary" className='button button-s' onClick={handlePay}>결제</Button>
      </div>
    </Modal>
  );
}

export default Pay;