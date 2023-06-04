// FilterTemp.jsx
import React, { useEffect, useState } from 'react';
import { Select } from "antd";
import { axiosWithBaseUrl } from 'App';

const { Option } = Select;

function FilterTemp({ type, setType, branchId, setBranchId }) {
  const [branchList, setBranchList] = useState(null);

  // 지점 선택 처리
  const handleBranchSelect = (e) => {
    const selectedBranch = branchList.find(branch => branch.id === e);
    setBranchId(e); // branchId 변경
    setType('branch'); // type을 branch로 변경

    // Set the selected branch name in the Form.Item component
    if (selectedBranch) {
      selectedBranch.name = selectedBranch.name || '';
      const input = document.getElementById('branchNameInput');
      if (input) {
        input.value = selectedBranch.name;
      }
    }
  }

  // 지점 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1] = await Promise.all([
          axiosWithBaseUrl.get('/branch/all'),
        ]);
        setBranchList(res1.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* 지점 선택 */}
      <Select value={branchId} onChange={handleBranchSelect}>
        {branchList &&
          branchList.map((branch) => (
            <Option key={branch.id} value={branch.id}>
              {branch.name}
            </Option>
          ))}
      </Select>
    </>
  );
}

export default FilterTemp;