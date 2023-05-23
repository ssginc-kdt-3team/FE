import React, { useEffect, useState } from 'react';
import { Table, Tag, Button } from "antd";
import { Link } from 'react-router-dom';
import { axiosWithBaseUrl } from 'App';
import axios from '../../../../node_modules/axios/index';
import styled from 'styled-components';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

function MenuList() {
  const navigate = useNavigate();

  const [menuList, setMenuList] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "이미지",
      dataIndex: "menuImgUrl",
      key: "menuImgUrl",
      render: (url, row) => {
        return <Img src={url} alt={row.menuName}/>;
      }
    },
    {
      title: "메뉴명",
      dataIndex: "menuName",
      key: "menuName"
    },
    // {
    //   title: "예약자명",
    //   dataIndex: "name",
    //   key: "name",
    //   render: (text, row) => (
    //     <Link to={`/resv/detail/${row.id}`}>{text}</Link>
    //   ),                                                                        
      
    // },
    {
      title: "가격",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return price + '원'
      }
    },
    {
      title: "수정",
      dataIndex: "",
      key: "",
      render: row => (
        <Button type="primary" onClick={() => navigate(`/mgt/menu/update/${row.id}`, { state: row })}>수정</Button>
      )
    }
  ];

  useEffect(() => {
    axios.get(`http://localhost:3001/products`)
    .then(res => {
      console.log(res.data);
      setMenuList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <Table
      columns={columns}
      dataSource={menuList}
      pagination={false}
      loading={loading}
      // onRow={row => {
      //   return {
      //     onClick: () => { navigate(`/mgt/menu/detail/${row.id}`) }
      //   }
      // }}
    />
  );
}

export default MenuList;