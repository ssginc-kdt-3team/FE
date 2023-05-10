import React, { useState } from 'react';
import axios from 'axios';

const Filter = () => {
  const [branchId, setBranchId] = useState('');
  const [shopId, setShopId] = useState('');
  const [depositList, setDepositList] = useState([]);
  const [branchName, setBranchName] = useState('');

  const handleFilter = async () => {
    try {
      if (branchId) {
        const res = await axios.get(`http://localhost:8080/admin/deposit/branch/${branchId}`);
        setDepositList(res.data.content);
        //해당 barnchname을 저장
        setBranchName(res.data.content.name);
        console.log(res.data.content.name);

      } else if (shopId) {
        const res = await axios.get(`http://localhost:8080/admin/deposit/shop/${shopId}`);
        setDepositList(res.data.content);
        setBranchName('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <label htmlFor="branchId">지점명:</label>
      <input
        type="text"
        id="branchId"
        value={branchId}
        onChange={(e) => setBranchId(e.target.value)}
      />
      <label htmlFor="shopId">매장명:</label>
      <input
        type="text"
        id="shopId"
        value={shopId}
        onChange={(e) => setShopId(e.target.value)}
      />
      <button onClick={handleFilter}>조회하기</button>

      {/* 지우기 */}
       {branchName && <p key={branchId}>{branchName} 지점</p>}

      {depositList.length > 0 ? (
      <ul>
       {depositList.map((deposit) => (
         <li key={deposit.id}>{deposit.reservationId}</li>
       ))}
      </ul>
      ) : (
       <p>데이터가 없습니다.</p>
    )}
    </div>
  );
};

export default Filter;