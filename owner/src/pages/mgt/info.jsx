import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuList from './menu/menulist';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { Button } from 'antd';
import ShopDetail from './ShopDetail';
import axios from '../../../node_modules/axios/index';
// import BusinessDetail from './BusinessDetail';

function MgtInfo() {
  const navigate = useNavigate();

  const [shopInfo, setShopInfo] = useState(null);

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
      <div className='grid-2c flex-gap-80'>
        {/* 운영정보 */}
        <div>
          <div className='space-between'>
            <h2>운영 정보</h2>
            <Button type="primary" onClick={() => navigate(`/mgt/info/update/${'아이디'}`)}>수정</Button>
          </div>
          <ShopDetail data={shopInfo}/>
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