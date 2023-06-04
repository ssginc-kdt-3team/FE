import React, {  useState } from 'react';
import { Table, Button } from "antd";
import { Link } from 'react-router-dom';
import { axiosWithBaseUrl } from 'App';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

function MenuList({ menuList }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const columns = [
    {
      title: "이미지",
      dataIndex: "menuImgUrl",
      key: "menuImgUrl",
      align: 'center',
      render: (url, row) => {
        return <Img src={url} alt={row.menuName}/>;
      }
    },
    {
      title: "메뉴명",
      dataIndex: "name",
      key: "name",
      align: 'center',
    },
    {
      title: "가격",
      dataIndex: "price",
      key: "price",
      align: 'center',
      render: price => {
        return price + '원'
      }
    },
    {
      title: "",
      dataIndex: "",
      key: "menuId",
      align: 'center',
      render: (record) => (
        <Button 
        id={record.id} 
        type="primary" 
        onClick={() => navigate(`/mgt/menu/update/${record.id}`, { state: record })} 
        style={{ backgroundColor: '#cf1322' }}>수정하기</Button>
      )
    }
  ];


  return (
    <Table
      columns={columns}
      dataSource={menuList}
      pagination={false}
      loading={loading}
    />
  );
}

export default MenuList;