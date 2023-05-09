import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from 'antd';


//컬럼 지정하기
const columns = [
  {
    title: '예약 번호',
    dataIndex: 'reservationId',
    width: 25,
  },
  {
    title: '예약 상태',
    dataIndex: 'status',
    width: 25,
  },
  {
    title: '예약자명',
    dataIndex: 'cust_name',
    width: 25,
  },
  {
    title: '전화번호',
    dataIndex: 'cust_phone',
    width: 30,
  },
  {
    title: '초기 예약금',
    dataIndex: 'originDeposit',
    width: 25,
  },
  {
    title: '받은 금액',
    dataIndex: 'payDeposit',
    width: 25,
  },
  {
    title: '위약금',
    dataIndex: 'penalty',
    width: 30,
  },
  {
    title: '방문 예정 날짜',
    dataIndex: 'expectedDay',
    width: 45,
  },
  {
    title: '방문 예정 시간',
    dataIndex: 'expectedTime',
    width: 45,
  },
];

//axios로 데이터 불러오기 (예약id, 예약자 정보, 초기 예약금, 실제 받은 예약금, 위약금, 방문 예정 날짜, 예약 상태)
const DepositList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/admin/deposit/lists', {
    })
      .then(response => setData(response.data.content))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <div>예약금 내역 조회</div>
      <Table
        //컬럼
        columns={columns}
        //테이블의 각 행에 대한 데이터
        dataSource={data}
        pagination={{
          pageSize: 10,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        scroll={{
          y: 500,
          x: 'max-content',
        }}
      />
    </>
  );
};

export default DepositList;