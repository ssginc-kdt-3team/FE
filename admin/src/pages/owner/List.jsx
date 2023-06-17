import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Tag, Space } from "antd";
import Paging from "components/pagination/paging";

// ==============================|| OwnerList - 점주 목록 ||============================== //

function OwnerList() {
  const [ownerList, setOwnerList] = useState([]);
  const [branchId, setBranchId] = useState(1);          // 기본값 branch1을 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/owner/findAll/${branchId}/${currentPage}`)
      .then((response) => {
        setOwnerList(response.data.content);
        setTotalItems(response.data.totalElements);
        setItemsPerPage(response.data.numberOfElements);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, branchId]);

  // branch id 변경 함수
  // const handleChangeBranchId = (newBranchId) => {
  //   setBranchId(newBranchId);
  // };

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
    },
    {
      title: "점주명",
      dataIndex: "ownerName",
      key: "ownerName",
      render: (text, record) => (
        <Link to={`/owner/detail/${record.ownerId}`} style={{ color: 'black' }}>{text}</Link>
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
      dataIndex: "userStatus",
      key: "userStatus",
    }
  ];

  return (
    <>
      <h1>점주 리스트</h1>
      <Table 
      columns={columns} 
      dataSource={ownerList} 
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

export default OwnerList;