import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { Button } from 'antd';
import axios from "axios";
import MenuList from '../menu/List';
import ShopDetail from './Detail';

function MgtInfo() {
  const navigate = useNavigate();
  const { id } = useParams();       //owner id
  const [shopInfo, setShopInfo] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:8080/owner/shop/detail/${40}`)
    .then(res => {
      console.log(res.data);
      setShopInfo(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [id])

  return (
    <div>
      <div className='grid-2c flex-gap-80'>
        {/* 운영정보 */}
        <div>
          <div className='space-between'>
            {shopInfo ? (
              <Button type='primary' onClick={() => navigate(`/mgt/info/update/${id}`)}>
                수정
              </Button>
            ) : (
              <Button type='primary' onClick={() => navigate(`/shop/register`)}>
                매장 등록하기
              </Button>
            )}
          </div>
          {shopInfo ? <ShopDetail data={shopInfo} /> : null}
        </div>

        {/* 메뉴 정보 */}
        {shopInfo && (
          <div>
            <h2>메뉴</h2>
            <MenuList />
          </div>
        )}
      </div>
    </div>
  );
}

export default MgtInfo;