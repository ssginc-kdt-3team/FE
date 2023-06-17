import React, { useState } from 'react';
import styled from 'styled-components';
import CashPointStatusTag from './CashPointStatusTag';
import { Button } from 'antd';
import Refund from '../../modal/profile/cash/Refund';
import { cashFormat } from '../../../utils/format';

const Li = styled.li`
  width: 100%;
  /* padding-bottom: 16px; */
  border-bottom: 1px solid var(--input-border);
`;

const P = styled.p`
  color: var(--description);
  margin: 16px 0 16px 16px;
`;

function CashInfoCard({data, remained, isCash, setNeedReRender}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  // console.log(data);

  return (
    <>
      <Li className='space-between' style={{ padding: '5px 0' }}>
        <div>
          <div className='flex center-h'>
            <CashPointStatusTag status={data.type} isCash={isCash}/>
            <P>{data.dateTime}</P>
          </div>
          <h3 style={{ paddingBottom: '16px' }}>{data.reason}</h3>
        </div>

        <div className='flex flex-col' style={ data.type ? { fontSize: '20px', color: 'var(--main)' } : { fontSize: '20px' } }>
          {data.type ? '+ ' : '- ' }
          {cashFormat(parseInt(data.price))}원
          {
            isCash && data.canRefund ? (
              <span className='flex-end' style={{ marginTop: '8px' }}>
                <Button type='primary' className='button button-xs' onClick={() => setIsModalOpen(true)}>환불</Button>
              </span>
            )
            : ''
          }
        </div>
      </Li>
      
      <Refund isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={data} remainedCash={remained} setNeedReRender={setNeedReRender}/>
    </>
  );
}

export default CashInfoCard;