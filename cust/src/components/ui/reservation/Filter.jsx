import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

function Filter({state, setState, branchId, setBranchId, shopId, setShopId, resvInfo, setResvInfo, shopName, setShopName}) {
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

    const selectedShop = shopList.find(shop => shop.id === e); // 선택된 매장을 shopList에서 찾아서
    if(selectedShop) {
      setShopName(selectedShop.name); // 매장명을 설정
    }

    setResvInfo({ // 예약 정보 업데이트
      ...resvInfo,
      shopId: e
    })

    setShopId(e); // 매장 id 변경
    setState(null); // 초기값을 null로 << 매장 id 초기화
  }
  
  // console.log(state);
  console.log('[Filter] 지점id: ' + branchId + ' / 매장id: ' + shopId  + ' / 매장명: ' + shopName);

  // // 지점 정보, 지점별 매장 정보 가져오기
  // useEffect(() => {
  //   const fetchData = async () => { // async는 함수 앞에 붙여서 해당 함수가 Promise를 반환하는 비동기 함수임을 나타냄
  //     try {
  //       // if(state !== null) {
  //       //   setBranchId(state.branchId);
  //       //   setShopId(state.shopId);
  //       // }

  //       const [res1, res2] = await Promise.all([ // await는 Promise가 실행 될 때까지 대기
  //         axios.get('/branch/all'),
  //         axios.get(`/branch/shops/${branchId}`),
  //       ]);
  //       console.log(res1.data);
  //       console.log(res2.data);
  //       setBranchList(res1.data);
  //       setShopList(res2.data);
  //       if(state === null) {
  //         console.log('state 없음');
  //         setShopId(res2.data[0].id); // shopId를 각 지점별 매장 리스트의 첫 번째 원소로
  //         setShopName(res2.data[0].name); // 매장명 설정
  //       }
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }
  //   };
  
  //   fetchData(); // 처음 렌더링 시에도 실행되도록 함
  // }, [branchId, setShopId, state, setShopName]); // 지점, 매장, 날짜가 변할 때 마다 리렌더링

  // // 지점 정보, 지점별 매장 정보 가져오기
  // useEffect(() => {
  //   axios.get('/branch/all')
  //   .then(res1 => {
  //     console.log(res1.data);
  //     setBranchList(res1.data);

  //     if(state !== null){
  //       console.log('state 있음');
  //       setBranchId(state.branchId);
  //       // setShopId(state.shopId);
  //     }

  //     return axios.get(`/branch/shops/${branchId}`);
  //   })
  //   .then(res2 => {
  //     console.log(res2.data);
  //     setShopList(res2.data);

  //     if(state === null) {
  //       console.log('state 없음');
  //       setShopId(res2.data[0].id); // shopId를 각 지점별 매장 리스트의 첫 번째 원소로
  //       setShopName(res2.data[0].name); // 매장명 설정
  //     }
  //     else {
  //       console.log('state 있음');
  //       setShopId(state.shopId); // shopId를 각 지점별 매장 리스트의 첫 번째 원소로
  //       // setShopName(res2.data[0].name); // 매장명 설정

  //       const selectedShop = res2.data.find(shop => shop.id === state.shopId); // 선택된 매장을 shopList에서 찾아서
  //       if(selectedShop) {
  //         console.log('넘어온 state의 매장 id에 해당하는 매장명')
  //         setShopName(selectedShop.name); // 매장명을 설정
  //       }
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })

  // }, [branchId, setBranchId, setShopId, state, setShopName]); // 지점, 매장, 날짜가 변할 때 마다 리렌더링

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
          shopList && shopList.map( shop => (
            <Option key={shop.id} value={shop.id}>{shop.name}</Option>
          ))
        }
      </Select>
    </>
  );
}

export default Filter;



// 여기서 이름 선택하공  
// <div style={{ display: 'flex', alignItems: 'justifybetween',  marginleft: '50px' }}>
//         <p style={{ marginLeft: '0px' }} >입점하실 지점을 선택해주세요.</p>
//           <FilterTemp branchId={branchId} handleBranchSelect={handleBranchSelect} style={{ width: '30px' }}/>
//         </div>

// 요기서 id 넣어서 보내고 싶어요ㅠ
//         <Form.Item label="지점id" name="branchId" required hidden>
//           <Input id="branchId" value={branchId} onChange={(e) => setBranchId(e.target.value)} />
//         </Form.Item>



// // FilterTemp.jsx
// import React, { useEffect, useState } from 'react';
// import { Select } from "antd";
// import { axiosWithBaseUrl } from 'App';

// const { Option } = Select;

// function FilterTemp({ type, setType, branchId, setBranchId }) {
//   const [branchList, setBranchList] = useState(null);

//   // 지점 선택 처리
//   const handleBranchSelect = (e) => {
//     const selectedBranch = branchList.find(branch => branch.id === e);
//     setBranchId(e); // branchId 변경
//     setType('branch'); // type을 branch로 변경

//     // Set the selected branch name in the Form.Item component
//     if (selectedBranch) {
//       selectedBranch.name = selectedBranch.name || '';
//       const input = document.getElementById('branchNameInput');
//       if (input) {
//         input.value = selectedBranch.name;
//       }
//     }
//   }

//   // 지점 정보, 지점별 매장 정보 가져오기
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [res1] = await Promise.all([
//           axiosWithBaseUrl.get('/branch/all'),
//         ]);
//         setBranchList(res1.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {/* 지점 선택 */}
//       <Select value={branchId} onChange={handleBranchSelect}>
//         {branchList &&
//           branchList.map((branch) => (
//             <Option key={branch.id} value={branch.id}>
//               {branch.name}
//             </Option>
//           ))}
//       </Select>
//     </>
//   );
// }

// export default FilterTemp;