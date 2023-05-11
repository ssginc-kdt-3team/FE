import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = () => {
  const [branchId, setBranchId] = useState('');
  const [branchName, setBranchName] = useState('');
  const [shopId, setShopId] = useState('');
  const [shopName, setShopName] = useState('');
  const [depositList, setDepositList] = useState([]);

  useEffect(() => {
    if (branchId) {
      axios.get(`http://localhost:8080/admin/branch/${branchId}`)
        .then((response) => {
          setBranchName(response.data.branchName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (shopId) {
      axios.get(`http://localhost:8080/admin/shop/${shopId}`)
        .then((response) => {
          setShopName(response.data.shopName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [branchId, shopId]);

  const handleFilter = async () => {
    try {
      if (branchId) {
        const res = await axios.get(`http://localhost:8080/admin/deposit/branchName/${branchName}`);
        setDepositList(res.data.content);
      } else if (shopId) {
        const res = await axios.get(`http://localhost:8080/admin/deposit/shopName/${shopName}`);
        setDepositList(res.data.content);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <label htmlFor="branchId">Branch ID:</label>
      <input
        type="text"
        id="branchId"
        value={branchId}
        onChange={(e) => setBranchId(e.target.value)}
      />
      <label htmlFor="branchName">Branch Name:</label>
      <input
        type="text"
        id="branchName"
        value={branchName}
        onChange={(e) => setBranchName(e.target.value)}
      />
      <label htmlFor="shopId">Shop ID:</label>
      <input
        type="text"
        id="shopId"
        value={shopId}
        onChange={(e) => setShopId(e.target.value)}
      />
      <label htmlFor="shopName">Shop Name:</label>
      <input
        type="text"
        id="shopName"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      />
      <button onClick={handleFilter}>조회하기</button>

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
