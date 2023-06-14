import React, { useEffect, useState } from 'react';
import { axiosWithBaseUrl } from "App";
import { Table } from 'antd';
import { Link } from "react-router-dom";
import Paging from "components/pagination/paging";

const ResvList = () => {
  const [resvList, setResvList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchResvList();
  }, [currentPage]);

  const fetchResvList = () => {
    setLoading(true);
    
    const requestData = {
      type: 'branch', // 또는 'shop'
      id: 1,
      status: 'ALL', // 또는 'RESERVATION', 'DONE', 'CANCEL', 'IMMINENT', 'NOSHOW' 중 하나
    };
  
    axiosWithBaseUrl
      .get("/admin/reservation", { params: requestData })
      .then((response) => {
        console.log(response.data);
        setResvList(response.data);
        setTotalItems(response.data.totalElements);
        setItemsPerPage(response.data.numberOfElements);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  // 컬럼명 지정
  const columns = [
    {
      title: '지점명',
      dataIndex: 'branchName',
      key: 'branchName',
      width: 40,
    },
    {
      title: '매장명',
      dataIndex: 'shopName',
      key: 'shopName',
      width: 60,
    },
    {
      title: '예약상태',
      dataIndex: 'status',
      key: 'status',
      width: 60,
    },
    {
      title: '예약일자',
      dataIndex: 'reservationTime',
      key: 'reservationTime',
      width: 60,
    },
    {
      title: '예약자명',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 50,
      render: (text, record) => (
        <Link to={`/customer/${record.customerId}`}>{text}</Link>
      ),
    },
    {
      title: '전화번호',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
      width: 60,
    },
    {
      title: '예약인원',
      dataIndex: 'people',
      key: 'people',
      width: 60,
    },
  ];

  return (
    <>
      <h1>예약내역리스트</h1>
      <Table
        columns={columns}
        dataSource={resvList}
        pagination={false}
        scroll={{
          y: 500,
          x: 'max-content'
        }}
        loading={loading}
      />
      <Paging
        page={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        setPage={setCurrentPage}
      />
    </>
  );
};

export default ResvList;