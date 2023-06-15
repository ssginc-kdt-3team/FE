import React, { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Table, } from "antd";
import { Link } from "react-router-dom";
import Paging from "components/pagination/paging";

function ShopList() {
  const [shopList, setShopList] = useState([]);
  const [branchId, setBranchId] = useState(1);          // 기본값 branch1을 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [ownerName, setOwnerName] = useState('');


  useEffect(() => {
    axiosWithBaseUrl
    .get(`/admin/shop/findAll/${branchId}/${currentPage}`)
      .then((res) => {
        console.log(res);
        setShopList(res.data.content);
        console.log(res.data.content);
        setTotalItems(res.data.totalElements);
        setItemsPerPage(res.data.numberOfElements);
        setOwnerName(res.data.content.owner.name); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, branchId]);


   const columns = [
    {
      title: "지점명",
      dataIndex: "{branch.name}",
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
      dataIndex: "phone",
      key: "phone",
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