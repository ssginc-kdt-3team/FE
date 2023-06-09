import React, { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Paging from "components/pagination/paging";
import { Table } from 'antd';

// ==============================|| DepositShopList - 예약금 리스트 ||============================== //

function DepositShopList() {
  const { shopID } = useParams(); 
  const [depositList, setDepositList] = useState([]);
    const [page, setPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    axiosWithBaseUrl
      .get(`/admin/deposit/shop/${shopID}/${page}`)
      .then((response) => {
        setDepositList(response.data.content);
        // console.log(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [shopID, page]);

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
      {depositList.length > 0 ? (
        <>
          <h1>매장별 예약금 리스트</h1>
          <Table 
          dataSource={depositList} 
          columns={columns} bordered 
          pagination={false}
          />
           <Paging
           
            page={page}
            itemsPerPage={itemsPerPage}
            totalItems={depositList.length}
            setPage={setPage}
          />
        </>
      ) : (
        <p>Loading deposit details...</p>
      )}
    </div>
    
  );
}

export default DepositShopList;