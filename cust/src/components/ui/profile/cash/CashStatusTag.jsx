import React from 'react';
import { Tag } from 'antd';

const style = {
  fontSize: '16px',
  margin: 0,
  padding: '3px 7px'
};

function CashStatusTag({status}) {
  return (
    <Tag color={status ? 'blue' : 'green'} style={style}>{status ? '충전' : '사용'}</Tag>
  );
}

export default CashStatusTag;