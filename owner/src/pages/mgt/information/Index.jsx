import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { axiosWithBaseUrl } from 'App';
import MenuList from '../menu/List';
import ShopDetail from './Detail';
//userSlice의 id 값 가져오기
import { useSelector } from 'react-redux';

function MgtInfo() {
  const id = useSelector((state) => state.user.id);  
  const navigate = useNavigate();
  const [shopInfo, setShopInfo] = useState(null);
  const [menulist, setMenuList] = useState(null);

  useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/shop/detail/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log(id);
        setShopInfo(res.data);
        setMenuList(res.data.menus);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className='grid-2c flex-gap-80'>
        {/* 운영정보 */}
        <div>
          <div className='space-between'>
            {shopInfo ? (
              <ShopDetail data={shopInfo} />
            ) : (
              <Button type='primary' onClick={() => navigate(`/shop/register`)}>
                매장 등록하기
              </Button>
            )}
          </div>
        </div>

        {/* 메뉴 정보 */}
        {shopInfo && (
          <div>
            <h2>메뉴</h2>
            <MenuList menuList={menulist} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MgtInfo;