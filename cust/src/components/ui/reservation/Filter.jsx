import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

function Filter({isFromShop, setIsFromShop, branchId, setBranchId, shopId, setShopId, resvInfo, setResvInfo, shopName, setShopName}) {
  console.log('[Filter] isFromShop: ' + isFromShop);
  const [branchList, setBranchList] = useState(null);
  const [shopList, setShopList] = useState(null);
  
  // 지점 선택 처리
  const handleBranchSelect = (value) => {
    setBranchId(value); // 지점 id 변경
  }

  // 매장 선택 처리
  const handleShopSelect = (e) => { // 매장 정보가 변경될 때 마다
    console.log(e);

    const selectedShop = shopList.find(shop => shop.id === e); // 선택된 매장을 shopList에서 찾아서
    if(selectedShop) {
      setShopName(selectedShop.name); // 매장명을 설정
    }

    setResvInfo({ // 예약 정보 업데이트
      ...resvInfo,
      shopId: e
    })

    setShopId(e); // 매장 id 변경
  }
  
  // console.log(state);
  console.log('[Filter] 지점id: ' + branchId + ' / 매장id: ' + shopId  + ' / 매장명: ' + shopName);

  // 지점 정보 가져오기
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

  // 지점별 매장 정보 가져오기
  useEffect(() => {
    axios.get(`/branch/shops/${branchId}`)
    .then(res => {
      console.log(res.data);
      setShopList(res.data);

      if(!isFromShop) { // 매장 선택 없이 들어오면
        console.log('매장 선택 X');
        setShopId(res.data[0].id); // shopId를 각 지점별 매장 리스트의 첫 번째 원소로
        setShopName(res.data[0].name); // 매장명 설정
      }
      else {
        const selectedShop = res.data.find(shop => shop.id === parseInt(shopId)); // 선택된 매장을 shopList에서 찾아서
        if(selectedShop) {
          console.log('넘어온 state의 매장 id에 해당하는 매장명')
          setShopName(selectedShop.name); // 매장명을 설정
        }
      }
    })
    .catch(err => {
      console.log(err);
    })

  }, [branchId, isFromShop, setShopId, setShopName, shopId]); // 지점, 매장, 날짜가 변할 때 마다 리렌더링

  return (
    <>
      <Select className='select' bordered={false} size='large' value={parseInt(branchId)} onChange={(e) => handleBranchSelect(e)}>
        {
          branchList && branchList.map( branch => (
            <Option key={branch.id} value={branch.id}>{branch.name}</Option>
          ))
        }
      </Select>

      {/* 매장 선택 */}
      <Select className='select' bordered={false} size='large' value={parseInt(shopId)} onChange={handleShopSelect}>
        {
          shopList && shopList.map( shop => (
            <Option key={shop.id} value={shop.id}>{shop.name}</Option>
          ))
        }
      </Select>
    </>
  );
}

export default Filter;