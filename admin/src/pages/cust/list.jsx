import { Table, Tag } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const CustListTable = () => {
  const [custList, setCustList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchCustomerList();
  }, [pagination]);

  const fetchCustomerList = () => {
    axios
      .get("http://localhost:8080/admin/customer/findAll", {
        params: {
          page: pagination.current,
          size: pagination.pageSize,
        },
      })
      .then((response) => {
        setCustList(response.data.content);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: response.data.totalElements,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: "고객 등급",
      dataIndex: "grade",
      key: "grade",
      render: (text) => {
        let color;
        if (text === "Gold") {
          color = "gold";
        } else if (text === "Green") {
          color = "green";
        } else if (text === "Welcome") {
          color = "blue";
        } else {
          color = "default";
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "고객명",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/cust/detail/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "고객명",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/cust/detail/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        let color = text === "ACTIVE" ? "green" : "volcano";
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={custList}
      pagination={pagination}
      onChange={handleTableChange}
    />
  );
};

export default CustListTable;