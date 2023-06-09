import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import { error } from '../../../utils/notification';
import axios from 'axios';
import SelectChargeOption from '../../modal/profile/cash/SelectChargeOption';
import { Button } from 'antd';
import { cashFormat } from '../../../utils/format';

function CashInfo() {
  const loginInfo = useRecoilValue(loginState);

  const [remainedCash, setRemainedCash] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  
  useEffect(() => {
    axios.get(`/customer/charge/check/${loginInfo.id}`)
    .then(res => {
      console.log(res);
      setRemainedCash(res.data.value);
    })
    .catch(err => { // 오류 처리
      console.log(err);
      error(err.response.data.error);
    })
  }, [loginInfo.id])

  return (
    <>
      <div className='center-h flex-gap-20'>
        <p><span>충전금 잔액</span>{cashFormat(remainedCash)}원</p>
        <Button className='button buttonReverse button-s' onClick={() => setIsModalOpen(true)}>충전하기</Button>
      </div>

      {/* 충전하기 모달 */}
      <SelectChargeOption isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </>
  );
}

export default CashInfo;