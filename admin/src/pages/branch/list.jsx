import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Table } from 'antd';

function BranchList() {
  const { id } = useParams();
  const [branchList, setBranchList] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/branch/list`)
      .then((response) => {
        setBranchList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
          <Table dataSource={branchList} columns={columns} bordered />
        </>
      ) : (
        <p>Loading branch list...</p>
      )}
    </div>
  );
}

export default BranchList;