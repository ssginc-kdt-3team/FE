import { Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { styled } from 'styled-components';

// const Label = styled.label`
//   color: var(--description);
//   margin: 0;
//   display: inline-block;
// `;

const { Option } = Select;

function BranchSelector({branchId, setBranchId}) {
  const [branchList, setBranchList] = useState(null);

  // 지점 선택 처리
  const handleBranchSelect = (value) => {
    setBranchId(value); // 지점 id 변경
  }

  useEffect(() => {
    axios.get('/branch/all')
    .then(res => {
      console.log(res.data);
      setBranchList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    // <div className='center-h'>
    //   <Label>매장 선택</Label>
      <Select bordered={false} size='large' value={branchId} onChange={(e) => handleBranchSelect(e)} style={{margin: '-11px 0 0 -11px'}}>
          {/* <Option value={branchId}>점포 변경</Option> */}
        {
          branchList && branchList.map( branch => (
            <Option key={branch.id} value={branch.id}>{branch.name}</Option>
          ))
        }
      </Select>
    // </div>
  );
}

export default BranchSelector;