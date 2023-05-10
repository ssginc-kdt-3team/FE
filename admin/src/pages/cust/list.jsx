import { Table, Tag } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Paging from "components/pagination/paging";
import { current } from "../../../node_modules/@reduxjs/toolkit/dist/index";

const CustListTable = () => {
  const [custList, setCustList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchCustomerList();
  }, [currentPage]); // Include currentPage in the dependency array

  const fetchCustomerList = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/admin/customer/findAll/${currentPage}`)
      .then((response) => {
        setCustList(response.data.content);
        setTotalItems(response.data.totalElements);
        setItemsPerPage(response.data.numberOfElements);
        setLoading(false);
        console.log(custList);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };


  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

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
    <>
      <Table
        columns={columns}
        dataSource={custList}
        pagination={false}
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


export default CustListTable;