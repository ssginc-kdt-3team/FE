import styled from 'styled-components';

const getStatusColor = (status) => {
  switch (status) {
    case 'RESERVATION':
      return '#1E90FF';
    case 'DONE':
      return '#32CD32';
    case 'CANCEL':
      return '#FF6347';
    case 'IMMINENT':
      return '#FF8C00';
    case 'NOSHOW':
      return '#A9A9A9';
    default:
      return '#A9A9A9';
  }
};

const getStatusName = (status) => {
  switch (status) {
    case 'RESERVATION':
      return '예약중';
    case 'DONE':
      return '완료';
    case 'CANCEL':
      return '취소';
    case 'IMMINENT':
      return '취소(위약금)';
    case 'NOSHOW':
      return '노쇼';
    default:
      return '노쇼';
  }
};

const StatusDiv = styled.div`
  height: fit-content;
  border-radius: 10px;
  color: white;
  background-color: ${({ status }) => getStatusColor(status)};
  padding: 5px 10px;
`;

function ResvStatus({ status }) {
  return (
    <StatusDiv status={status}>{getStatusName(status)}</StatusDiv>
  );
}

export default ResvStatus;