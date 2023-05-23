import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Table } from 'antd';
import Paging from "components/pagination/paging";

function DepositList() {
  const { id } = useParams();
  const [depositList, setDepositList] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/branch/`)
      .then((response) => {
        setDepositList(response.data.content);
        console.log(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, page]);

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
          <Paging
            page={page}
            itemsPerPage={itemsPerPage}
            totalItems={depositList.length}
            setPage={setPage}
          />
        </>
      ) : (
        <p>Loading branch list...</p>
      )}
    </div>
  );
}

export default DepositList;