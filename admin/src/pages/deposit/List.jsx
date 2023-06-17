import React, { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Link } from "react-router-dom";
import Paging from "components/pagination/paging";
import { Table } from 'antd';

// ==============================|| DepositList - 예약금 리스트 ||============================== //


function DepositList({type, branchId, shopId}) {
  // const { id } = useParams();
  const [depositList, setDepositList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalItems, setTotalItems] = useState(0); // 총 아이템 수
  const [itemsPerPage, setItemsPerPage] = useState(10) // 페이지당 아이템 수

  useEffect(() => {
    axiosWithBaseUrl
    .get(`/admin/deposit/${type}/${type === "branch" ? branchId : shopId}/${currentPage}`)
    .then(res => {
      // console.log(res);
      // console.log('넘어온 데이터 ▼');console.log(res.data.content);
      setDepositList(res.data.content);
      setTotalItems(res.data.totalElements); // 총 아이템 수 설정
      // console.log(`/admin/deposit/${type}/${type === "branch" ? branchId : shopId}/${currentPage}`);
      // console.log('type: ' + type + ' / branchId: ' + branchId + ' / shopId: ' + shopId + ' / 총 아이템 수: ' + res.data.totalElements);
      setItemsPerPage(res.data.pageable.pageSize); // 페이지당 아이템 수 설정
    })
    .catch(err => {
      console.log(err);
    });
  }, [type, branchId, shopId, currentPage]);


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
      title: "지점명",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "매장명",
      dataIndex: "shopName",
      key: "shopName",
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
      {
        depositList ? (
          <>
            <h1>지점별 예약금 리스트</h1>
            <Table
              dataSource={depositList}
              columns={columns}
              bordered
              pagination={false}
            />
            <Paging
              page={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              setPage={setCurrentPage}
            />
          </>
        ) : (
          <p>Loading deposit...</p>
        )
      }
    </div>

    
  );
}

export default DepositList;