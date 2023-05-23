import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuList from './menu/menulist';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { Button } from 'antd';
import ShopDetail from './ShopDetail';
import axios from '../../../node_modules/axios/index';
import BusinessDetail from './BusinessDetail';

function MgtInfo() {
  const navigate = useNavigate();

  const [shopInfo, setShopInfo] = useState(null);

  const grid = {
    display: 'grid',
    gridTemplateColumns : 'repeat(2, 1fr)',
    gap: '80px'
  };

  const spaceBetween = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/store`)
    .then(res => {
      console.log(res.data);
      setShopInfo(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return ( 
    <div>
      <div style={grid}>
        {/* 운영정보 */}
        <div>
          <div style={spaceBetween}>
            <h2>운영 정보</h2>
            <Button type="primary" onClick={() => navigate(`/mgt/info/update/${'아이디'}`)}>수정</Button>
          </div>
          <ShopDetail data={shopInfo}/>

          {/* <h2>사업자 정보</h2>
          <BusinessDetail data={shopInfo}/> */}
        </div>

        {/* 메뉴 정보 */}
        <div>
          <h2>메뉴</h2>
          <MenuList/>
        </div>
      </div>

    </div>
  );
}

export default MgtInfo;