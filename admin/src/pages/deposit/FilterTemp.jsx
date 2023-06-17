import React, { useEffect, useState } from 'react';
import { Select } from "antd";
import { axiosWithBaseUrl } from 'App';

// ==============================|| FilterTemp - 지점, 매장 선택 필터 ||============================== //

const { Option } = Select;

function FilterTemp({type, setType, branchId, setBranchId, shopId, setShopId}) {
  const [branchList, setBranchList] = useState(null);
  const [shopList, setShopList] = useState(null);

  // 지점 선택 처리
  const handleBranchSelect = (e) => {
    setBranchId(e); // branchId 변경
    setType('branch'); // type을 branch로 변경
    setShopId(-1); // shopId를 초기화
  }

  // 매장 선택 처리
  const handleShopSelect = (e) => {    
    if(e === -1) {// 매장을 선택하지 않으면
      setType('branch'); // type을 branch으로 변경
      return;
    }

    setShopId(e); // shopId 변경
    setType('shop'); // type을 shop으로 변경
  }

  // 지점 정보, 지점별 매장 정보 가져오기
  useEffect(() => {
    const fetchData = async () => { // async는 함수 앞에 붙여서 해당 함수가 Promise를 반환하는 비동기 함수임을 나타냄
      try {
        const [res1, res2] = await Promise.all([ // await는 Promise가 실행 될 때까지 대기
          axiosWithBaseUrl.get('/branch/all'),
          axiosWithBaseUrl.get(`/branch/shops/${branchId}`),
        ]);
        // console.log(res1.data);
        // console.log(res2.data);
        setBranchList(res1.data);
        setShopList(res2.data);
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
      {/* 매장 선택 */}
      <Select value={shopId} onChange={handleShopSelect}>
        <Option value={-1}>매장을 선택하세요.</Option>
        {
          shopList && shopList.map( shop => (
            <Option key={shop.id} value={shop.id}>{shop.name}</Option>
          ))
        }
      </Select>
    </>
  );
}

export default FilterTemp;