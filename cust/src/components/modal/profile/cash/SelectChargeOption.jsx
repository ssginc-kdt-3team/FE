import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../../../../assets/css/modal/Modal.module.css';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../../state/loginState';
import { Button } from 'antd';
import CashPicker from '../../../ui/profile/cash/CashPicker';
import Charge from '../../../popUp/profile/cash/Charge';


function SelectChargeOption({isModalOpen, setIsModalOpen}) {
  console.log('화면크기: ' + window.innerWidth);

  const loginInfo = useRecoilValue(loginState);

  const [selectedOption, setSelectedOption] = useState('5000'); // 처음은 1번으로
  
  const [chargeInfo, setChargeInfo] = useState({
		name : "카카오페이 충전",
		value : selectedOption,
    price : selectedOption,
		customerId : loginInfo.id
  })

  const handleModalClose = () => {
    setSelectedOption('5000'); // 초기값으로 변경
    setIsModalOpen(false); // 모달 닫기
  }

  useEffect(() => {
    setChargeInfo( prevChargeInfo => ({
      ...prevChargeInfo,
      value: selectedOption,
      price: selectedOption
    }));
  }, [selectedOption]);
  
  return (
    <Modal
      className={styles.modalWrap}
      title="충전"
      centered
      open={isModalOpen}
    >
      <form id={styles.chargeForm} className='flex flex-col'>
        <CashPicker selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      </form>

      <div id={styles.buttonWrap}>
        <Button className='button buttonReverse' onClick={handleModalClose}>취소</Button>
        <Charge chargeInfo={chargeInfo} windowSize={window.innerWidth}/>
      </div>
    </Modal>
  );
}

export default SelectChargeOption;