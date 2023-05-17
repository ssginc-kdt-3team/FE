import React from 'react';
import { Tag } from 'antd';

const getStatusColor = (status) => {
  switch (status) {
    case 'RESERVATION':
      return 'blue';
    case 'DONE':
      return 'green';
    case 'CANCEL':
      return 'gold';
    case 'IMMINENT':
      return 'magenta';
    case 'NOSHOW':
      return 'volcano';
    default:
      return 'volcano';
  }
};

const getStatusName = (status) => {
  switch (status) {
    case 'RESERVATION':
      return '예약중';
    case 'DONE':
      return '완료';
    case 'CANCEL':
      return '정상 취소';
    case 'IMMINENT':
      return '취소';
    case 'NOSHOW':
      return '노쇼';
    default:
      return '노쇼';
  }
};

const style = {
  fontSize: '16px',
  margin: 0,
  padding: '3px 7px'
};

function ResvStatusTag({status}) {
  return (
    <Tag color={getStatusColor(status)} style={style}>{getStatusName(status)}</Tag>
  );
}

export default ResvStatusTag;