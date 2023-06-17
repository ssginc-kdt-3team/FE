import React, { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Link, useParams } from "react-router-dom";
import { Table } from 'antd';

// ==============================|| BranchList - 지점목록||============================== //

function BranchList() {
  const { id } = useParams();                       // id 값을 가져옴
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    axiosWithBaseUrl
      .get(`/admin/branch/list`)
      .then((res) => {
        setBranchList(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // 테이블 columns
  const columns = [
    {
      title: "지점ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "지점명",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/branch/detail/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "지점 전화번호",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "개장시간",
      dataIndex: "openTime",
      key: "openTime",
      render: (text) => text.toString(),
    },
    {
      title: "폐장시간",
      dataIndex: "closeTime",
      key: "closeTime",
      render: (text) => text.toString(),
    },
    {
      title: "지점 상태",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div>
      {branchList.length > 0 ? (
        <>
          <h1>지점 리스트</h1>
          <Table 
          dataSource={branchList} 
          columns={columns} 
          bordered />
        </>
      ) : (
        <p>Loading branch list...</p>
      )}
    </div>
  );
}

export default BranchList;