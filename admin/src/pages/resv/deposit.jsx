//branch 되면 다시 확인하기

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DepositList({id}) {
  const [depositList, setDepositList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/deposit/branch/${id}`)
      .then((response) => {
        setDepositList(response.data.content);
        console.log(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {depositList.length > 0 ? (
        <>
          <h1>예약 상세 정보</h1>
          <ul>
            {depositList.map((deposit) => (
              <li key={deposit.reservationId}>
                <div>
                <Link to={`/resv/detail/${deposit.reservationId}`}>
                 <h1>예약 번호: {deposit.reservationId}</h1>
                 </Link>
                 <div>
                 <Link to={`/cust/detail/${deposit.customerId}`}>
                 <p>고객 ID: {deposit.customerId}</p>
                </Link>
                 </div>
                </div>
                <p>초기 예약금: {String(deposit.originDeposit)}</p>
                <p>받은 예약금: {String(deposit.payDeposit)}</p>
                <p>위약금: {String(deposit.penalty)}</p>
                <p>방문 예정 일자: {deposit.expectedDay.toString()}</p>
                <p>방문 예정 시간: {deposit.expectedTime.toString()}</p>
                <p>예약 상태: {String(deposit.status)}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading deposit details...</p>
      )}
    </div>
  );
}

export default DepositList;