import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import { axiosWithBaseUrl } from 'App';
import { useSelector, useDispatch } from 'react-redux';
import ShopDetail from '../mgt/information/Detail';
// import { setShopInfo } from 'store/reducers/shopslice';


function ShopProfile() {
  const id = useSelector((state) => state.user.id);
  const [shopInfo, setShopInfo] = useState(null);

  const navigate = useNavigate();

  //매장 정보
  useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/shop/detail/${id}`) //owner id
      .then((res) => {
        console.log(res.data);
        console.log(res.data.shopId);
        console.log(id);
        setShopInfo(res.data);
        // dispatch(setShopInfo({ shopId: res.data.shopId})); // 디스패치 함수 사용
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    
    <div className='grid-2c flex-gap-80'>
           {/* 매장정보 */}
         <div>
          <div >
            {/* ownerid에 해당하는 shopid가 있으면 shopinfo / 없으면 등록하기버튼 */}
            {shopInfo ? (
              <ShopDetail data={shopInfo} />
            ) : (
              <div style={{ textAlign: 'center' }}>
              <Typography.Title level={5}>매장을 등록해주세요.</Typography.Title>
              <Button type='primary' onClick={() => navigate(`/shop/register`)} style={{ backgroundColor: '#cf1322' }}>
                매장 등록하기
              </Button>
            </div>
            )}
          </div>
        </div> 
    </div>
  );
}


export default ShopProfile