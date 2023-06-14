import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import { axiosWithBaseUrl } from 'App';
import { useSelector } from 'react-redux';
import ShopProfile from './ShopProfile';
import MyProfile from './MyProfile';
import { Grid } from '../../../node_modules/@mui/material/index';
// import { setShopInfo } from 'store/reducers/shopslice';


function Profile() {

  return (
<Grid container spacing={4} style={{ minHeight: '100vh' }}>
  <Grid item xs={12} md={6} lg={6}>
    <Grid item>
      <Typography.Title level={4} marginBottom="20px" marginTop="30px">매장 정보</Typography.Title>  
      <ShopProfile/>
    </Grid>
  </Grid>

  <Grid item xs={12} md={6} lg={6}>
    <Grid item>
      <Typography.Title level={4} marginBottom="20px" marginTop="30px">내 프로필</Typography.Title>  
      <MyProfile/>
    </Grid>
  </Grid>
</Grid>
  );
}


export default Profile