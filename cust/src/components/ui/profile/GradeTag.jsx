import React from 'react';
import { Tag } from 'antd';
import { styled } from 'styled-components';

const getStatusColor = (status) => {
  switch (status) {
    case 'Welcome':
      return 'blue';
    case 'Green':
      return 'green';
    case 'Gold':
      return 'gold';
    default:
      return 'blue';
  }
};

const TAG = styled(Tag)`
  font-size: 16px;
  margin: 0;
  padding: 3px 7px;
`;

function GradeTag({status}) {
  return (
    <TAG color={getStatusColor(status)}>{status}</TAG>
  );
}

export default GradeTag;