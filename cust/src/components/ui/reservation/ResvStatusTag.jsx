import React from 'react';
import { Tag } from 'antd';
import { styled } from 'styled-components';

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

const TAG = styled(Tag)`
  font-size: 16px;
  margin: 0;
  padding: 3px 7px;
`;

function ResvStatusTag({status}) {
  return (
    <TAG color={getStatusColor(status)}>{getStatusName(status)}</TAG>
  );
}

export default ResvStatusTag;