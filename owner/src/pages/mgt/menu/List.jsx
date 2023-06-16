import React, {  useState } from 'react';
import { Table, Button, Card } from "antd";
import { Link } from 'react-router-dom';
import { axiosWithBaseUrl } from 'App';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';

// ==================================|| MenuList, 메뉴 리스트 ||================================== //


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
      width: 200,
      render: (url, row) => {
        return <Img src={url} alt={row.menuName}/>;
      }
    },
    {
      title: "메뉴명",
      dataIndex: "name",
      key: "name",
      align: 'center',
      width: 200,
    },
    {
      title: "가격",
      dataIndex: "price",
      key: "price",
      align: 'center',
      width: 200,
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
  const pageSize = 5; // 한 페이지에 표시할 항목 수

  return (
  <Card style={{width: '100%'}}>
    <Table
      columns={columns}
      dataSource={menuList}
      pagination={{
        pageSize: pageSize,
        showSizeChanger: false,
        hideOnSinglePage: true,
        size: 'small',
        position: 'center'
      }}
      loading={loading}
    />
    </Card>
  );
}

export default MenuList;