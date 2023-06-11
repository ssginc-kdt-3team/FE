import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Typography} from 'antd';
import { Grid } from '@mui/material';

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
      <div style={{ display: 'flex', justifyContent: 'center',  minHeight: '100vh' }}>
        {/* 메뉴 정보 */}
        {shopInfo && (
          <Grid item xs={12} md={7} lg={12} sx={{pl: 2, pr:2}}>
            <div className='space-between'>
              <h2>메뉴 목록</h2>
              <Button
                type='primary'
                onClick={() => navigate(`/mgt/menu/register`)}
                style={{ backgroundColor: '#cf1322' }}
              >
                등록하기
              </Button>
            </div>
            <MenuList menuList={menulist} />
          </Grid>
        )}
      </div>
    </div>
  );
}

export default MgtInfo;