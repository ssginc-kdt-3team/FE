import React from 'react';
import { Tag } from 'antd';
import styled from 'styled-components'

const TAG = styled(Tag)`
  font-size: 16px;
  margin: 0;
  padding: 3px 7px;
`;

function CashStatusTag({status, isCash}) {
  return (
    <TAG color={status ? 'blue' : 'green'}>{status ? isCash ? '충전' : '적립' : '사용'}</TAG>
  );
}

export default CashStatusTag;