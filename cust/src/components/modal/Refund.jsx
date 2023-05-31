import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../../assets/css/modal/Modal.module.css';
import axios from 'axios';
import { confirm, error } from '../../utils/notification';

// const { confirm } = Modal;

function Refund({isModalOpen, setIsModalOpen, data, remainedCash}) {
  const handleRefund = () => {
    confirm('환불 하시겠습니까?', '', () => { 
      axios.post(`/customer/charge/refund/${data.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => { // 오류 처리
        console.log(err);
        // alert(err.response.data);
        error(err.response.data, '');
      })
      
     })
  }

  return (
    <Modal
      className={styles.modalWrap}
      title="환불"
      centered
      open={isModalOpen}
    >
      <div id={styles.refundInfoWrap} className='flex flex-col'>
        <p><span>충전금 잔액</span>{remainedCash.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
        <p><span>환불예정 금액</span>{(parseInt(data.price)).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
        <p><span>환불 후 충전금</span>{(parseInt(remainedCash) - parseInt(data.price)).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
      </div>

      <div id={styles.bottomWrap}>
        <Button className='button buttonReverse' onClick={() => setIsModalOpen(false)}>취소</Button>
        <Button type="primary" className='button' onClick={handleRefund}>완료</Button>
      </div>
    </Modal>
  );
}

export default Refund;