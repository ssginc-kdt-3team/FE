import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

function Filter({state, setState, branchId, setBranchId, shopId, setShopId, resvInfo, setResvInfo}) {
  const [branchList, setBranchList] = useState(null);
  const [shopList, setShopList] = useState(null);
  
  // 지점 선택 처리
  const handleBranchSelect = (value) => {
    setBranchId(value); // 지점 id 변경
    // setShopId(shopList.length !== 0 ? shopList[0].id : null); // 매장 id 초기화
    setState(null); // 초기값을 null로 << 매장 id 초기화
  }

  // 매장 선택 처리
  const handleShopSelect = (e) => { // 매장 정보가 변경될 때 마다
    console.log(e);
    setResvInfo({ // 예약 정보 업데이트
      ...resvInfo,
      shopId: e
    })

    setShopId(e); // 매장 id 변경
    setState(null); // 초기값을 null로 << 매장 id 초기화
  }
  
  // console.log(state);
  console.log('지점id: ' + branchId + ' / 매장id: ' + shopId);

  // 지점 정보, 지점별 매장 정보 가져오기
  useEffect(() => {
    const fetchData = async () => { // async는 함수 앞에 붙여서 해당 함수가 Promise를 반환하는 비동기 함수임을 나타냄
      try {
        const [res1, res2] = await Promise.all([ // await는 Promise가 실행 될 때까지 대기
          axios.get('/branch/all'),
          axios.get(`/branch/shops/${branchId}`),
        ]);
        console.log(res1.data);
        console.log(res2.data);
        setBranchList(res1.data);
        setShopList(res2.data);
        if(state === null) {
          console.log('state 없음');
          setShopId(res2.data[0].id); // shopId를 각 지점별 매장 리스트의 첫 번째 원소로
        }
      }
      catch (err) {
        console.log(err);
      }
    };
  
    fetchData(); // 처음 렌더링 시에도 실행되도록 함
  }, [branchId, setShopId, state]); // 지점, 매장, 날짜가 변할 때 마다 리렌더링

  return (
    <>
      <Select className='select' bordered={false} size='large' value={branchId} onChange={(e) => handleBranchSelect(e)}>
        {
          branchList && branchList.map( branch => (
            <Option key={branch.id} value={branch.id}>{branch.name}</Option>
          ))
        }
      </Select>

      {/* 매장 선택 */}
      <Select className='select' bordered={false} size='large' value={shopId} onChange={handleShopSelect}>
        {
          shopList && shopList.map( (shop, index) => (
            <Option key={shop.id} value={shop.id}>{shop.name}</Option>
          ))
        }
      </Select>
    </>
  );
}

export default Filter;