import React from 'react';
import styled from 'styled-components';
import CashStatusTag from './CashStatusTag';

const Li = styled.li`
  width: 100%;
  /* padding-bottom: 16px; */
  border-bottom: 1px solid var(--input-border);
`;

const P = styled.p`
  color: var(--description);
  margin: 16px 20px 16px 0;
`;

function CashInfoCard({data}) {
  return (
    <Li className='space-between' style={{ padding: '5px 0' }}>
      <div>
        <div className='flex center-h'>
          <P>{data.dateTime}</P>
          <CashStatusTag status='RESERVATION'/>
        </div>
        <h3 style={{ paddingBottom: '16px' }}>{data.reason}</h3>
      </div>

      <div style={{ fontSize: '22px' }}>
        {data.type ? '+ ' + data.price : '- ' + data.price }
      </div>
    </Li>
  );
}

export default CashInfoCard;