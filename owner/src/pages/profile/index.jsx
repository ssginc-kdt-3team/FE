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
    
    <div className='grid-2c flex-gap-80'>
     <Grid item >
      <Typography variant="h3" marginBottom="20px" marginTop="30px" >내 프로필</Typography>  
    <MyProfile/>
    </ Grid>


    <ShopProfile/>
    </div>
  );
}


export default Profile