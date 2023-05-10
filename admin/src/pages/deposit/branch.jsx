//list에 넣고 지우기

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Table } from 'antd';

function DepositList() {
  const { id } = useParams(); 
  const [depositList, setDepositList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/deposit/branch/${id}`)
      .then((response) => {
        setDepositList(response.data.content);
        //확인용 지우기
        console.log(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const columns = [
    {
      title: "예약 번호",
      dataIndex: "reservationId",
      key: "reservationId",
      render: (text, record) => (
        <Link to={`/resv/detail/${record.reservationId}`}>{text}</Link>
      ),
    },
    {
      title: "고객 ID",
      dataIndex: "customerId",
      key: "customerId",
      render: (text, record) => (
        <Link to={`/cust/detail/${record.customerId}`}>{text}</Link>
      ),
    },
    {
      title: "초기 예약금",
      dataIndex: "originDeposit",
      key: "originDeposit",
    },
    {
      title: "받은 예약금",
      dataIndex: "payDeposit",
      key: "payDeposit",
    },
    {
      title: "위약금",
      dataIndex: "penalty",
      key: "penalty",
    },
    {
      title: "방문 예정 일자",
      dataIndex: "expectedDay",
      key: "expectedDay",
      render: (text) => text.toString(),
    },
    {
      title: "방문 예정 시간",
      dataIndex: "expectedTime",
      key: "expectedTime",
      render: (text) => text.toString(),
    },
    {
      title: "예약 상태",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div>
      {depositList.length > 0 ? (
        <>
          <h1>지점별 예약금 리스트</h1>
          <Table dataSource={depositList} columns={columns} bordered />
        </>
      ) : (
        <p>Loading deposit details...</p>
      )}
    </div>
  );
}

export default DepositList;