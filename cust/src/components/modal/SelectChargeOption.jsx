import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../../assets/css/modal/Modal.module.css';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../state/loginState';
import { Button } from 'antd';
import CashPicker from '../ui/profile/CashPicker';
import Charge from '../popUp/Charge';


function SelectChargeOption({isModalOpen, setIsModalOpen}) {
  const loginInfo = useRecoilValue(loginState);

  const [selectedOption, setSelectedOption] = useState('5000'); // 처음은 1번으로
  
  const [chargeInfo, setChargeInfo] = useState({
		name : "카카오페이 충전",
		value : selectedOption,
    price : selectedOption,
		customerId : loginInfo.id
  })

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
        {/* <div className='flex'><input type="radio" name="price" value="5000" onChange={handleRadio}/><span>5000</span></div>
        <div className='flex'><input type="radio" name="price" value="10000" onChange={handleRadio}/><span>10000</span></div>
        <div className='flex'><input type="radio" name="price" value="20000" onChange={handleRadio}/><span>20000</span></div>
        <div className='flex'><input type="radio" name="price" value="30000" onChange={handleRadio}/><span>30000</span></div>
        <div className='flex'><input type="radio" name="price" value="40000" onChange={handleRadio}/><span>40000</span></div>
        <div className='flex'><input type="radio" name="price" value="50000" onChange={handleRadio}/><span>50000</span></div> */}
        <CashPicker selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      </form>

      <div id={styles.bottomWrap}>
        <Button className='button buttonReverse' onClick={() => setIsModalOpen(false)}>취소</Button>
        <Charge chargeInfo={chargeInfo}/>
      </div>
    </Modal>
  );
}

export default SelectChargeOption;