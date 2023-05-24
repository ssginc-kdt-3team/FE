import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Tag, Space } from "antd";

function OwnerList() {
  const [ownerList, setOwnerList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/owner/findAll/${id}/{page}")
      .then((response) => {
        setOwnerList(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/owner/detail/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    }
  ];

  return (
    <div>
      <h1>점주 리스트</h1>
      <Table columns={columns} dataSource={ownerList} />
    </div>
  );
}

export default OwnerList;