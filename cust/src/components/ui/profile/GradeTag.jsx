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
      return 'white';
  }
};

const TAG = styled(Tag)`
  font-size: 16px;
  margin: 0;
  padding: 3px 7px;
`;

function GradeTag({status, isInfoOpen, setIsInfoOpen}) {
  return (
    <TAG color={getStatusColor(status)} onClick={() => setIsInfoOpen(!isInfoOpen)}>{status}</TAG>
  );
}

export default GradeTag;