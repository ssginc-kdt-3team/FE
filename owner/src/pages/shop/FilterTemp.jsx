import React, { useEffect, useState } from 'react';
import { Select } from "antd";
import { axiosWithBaseUrl } from 'App';
// import branch from 'menu-items/Branch';

const { Option } = Select;

function FilterTemp({type, setType, branchId, setBranchId}) {
  const [branchList, setBranchList] = useState(null);

  // 지점 선택 처리
  const handleBranchSelect = (e) => {
    setBranchId(e); // branchId 변경
    setType('branch'); // type을 branch로 변경
  }


  // 지점 정보, 지점별 매장 정보 가져오기
  useEffect(() => {
    const fetchData = async () => { // async는 함수 앞에 붙여서 해당 함수가 Promise를 반환하는 비동기 함수임을 나타냄
      try {
        const [res1, res2] = await Promise.all([ // await는 Promise가 실행 될 때까지 대기
          axiosWithBaseUrl.get('/branch/all'),
        ]);
        console.log(res1.data);
        console.log(res2.data);
        setBranchList(res1.data);
      }
      catch (err) {
        console.log(err);
      }
    };
  
    fetchData(); // 처음 렌더링 시에도 실행되도록 함
  }, [branchId]); // 지점이 변할 때 마다 리렌더링

  return (
    <>
      {/* 지점 선택 */}
      <Select value={branchId} onChange={handleBranchSelect}> {/* 지점이 바뀌면 brnachId 변경 */}
        {
          branchList && branchList.map( branch => (
            <Option key={branch.id} value={branch.id}>{branch.name}</Option>
          ))
        }
      </Select>
    </>
  );
}

export default FilterTemp;