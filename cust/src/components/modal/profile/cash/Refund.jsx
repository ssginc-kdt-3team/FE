import { Button, Modal } from 'antd';
import styles from '../../../../assets/css/modal/Modal.module.css';
import axios from 'axios';
import { confirm, error, success } from '../../../../utils/notification';
import { cashFormat } from '../../../../utils/format';

// const { confirm } = Modal;

function Refund({isModalOpen, setIsModalOpen, data, remainedCash, setNeedReRender}) {
  const handleRefund = () => {
    confirm('환불 하시겠습니까?', () => { 
      axios.post(`/customer/charge/refund/${data.id}`)
      .then(res => {
        // console.log(res);
        success('환불이 완료되었습니다.');
        setNeedReRender(true); // 리렌더링 상태 변경, CashList에서 사용
        setIsModalOpen(false);
      })
      .catch(err => { // 오류 처리
        console.log(err);
        // alert(err.response.data);
        error(err.response.data);
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
      <div id={styles.refundInfoWrap} className='flex flex-col flex-gap-8'>
        <p><span>충전금 잔액</span>{cashFormat(remainedCash)}원</p>
        <p><span>환불예정 금액</span>{cashFormat(parseInt(data.price))}원</p>
        <p><span>환불 후 충전금</span>{cashFormat(parseInt(remainedCash) - parseInt(data.price))}원</p>
      </div>

      <div id={styles.buttonWrap}>
        <Button className='button buttonReverse button-s' onClick={() => setIsModalOpen(false)}>취소</Button>
        <Button type="primary" className='button button-s' onClick={handleRefund}>완료</Button>
      </div>
    </Modal>
  );
}

export default Refund;