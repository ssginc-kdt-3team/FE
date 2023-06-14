import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, } from "antd";
import { Link } from "react-router-dom";
import Paging from "components/pagination/paging";

function ShopList() {
  const [shopList, setShopList] = useState([]);
  const [branchId, setBranchId] = useState(2);          // 기본값 branch1을 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/shop/findAll/${branchId}/${currentPage}`)
      .then((response) => {
        console.log(response);
        setShopList(response.data.content);
        setTotalItems(response.data.totalElements);
        setItemsPerPage(response.data.numberOfElements);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, branchId]);

   const columns = [
    {
      title: "지점명",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "매장명",
      dataIndex: "shopName",
      key: "shopName",
      render: (text, record) => (
        <Link to={`/owner/detail/${record.shopId}`}>{text}</Link>
      ),
    },
    {
      title: "점주명",
      dataIndex: "ownerName",
      key: "ownerName",
      render: (text, record) => (
        <Link to={`/owner/detail/${record.ownerId}`}>{text}</Link>
      ),
    },
    {
      title: "점주 전화번호",
      dataIndex: "ownerPhone",
      key: "ownerPhone",
    },
    {
      title: "매장 위치",
      dataIndex: "shopLocation",
      key: "shopLocation",
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
    }
  ];

  return (
 <>
      <h1>매장 리스트</h1>
      <Table 
      columns={columns} 
      dataSource={shopList} 
      pagination={false}
      />
      <Paging
        page={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        setPage={setCurrentPage}
     
      />
  </>
  );
}
export default ShopList;