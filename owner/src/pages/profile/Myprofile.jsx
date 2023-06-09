import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import { axiosWithBaseUrl } from 'App';
import { useSelector } from 'react-redux';
import ShopDetail from '../../pages/mgt/information/Detail';


function MyProfile() {
  const id = useSelector((state) => state.user.id);
  const [ownerData, setOwnerData] = useState(null);
  const [shopInfo, setShopInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await 
        axiosWithBaseUrl.get(`/owner/detail/${id}`);
        setOwnerData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOwnerData();
  }, [id]);

  useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/shop/detail/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log(id);
        setShopInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='grid-2c flex-gap-80'>
    <div>
      {ownerData && (
        <Card
          title={
            <div style={{ textAlign: 'center', marginBottom: '5px' }}>
              <Typography.Title level={4}>마이 프로필</Typography.Title>
            </div>
          }
          style={{ width: 400, marginTop: '20px' }}
        >
          <p>점주명: {ownerData.ownerName}</p>
          <p>이메일: {ownerData.ownerEmail}</p>
          {/* <p>주소: {ownerData.ownerAddress}</p>  */}
          <p>번호: {ownerData.ownerPhone}</p> 
          <p>생년월일: {ownerData.ownerBirthday}</p>
          <Button
            type='primary'
            onClick={() => navigate(`/profile/update/${id}`)}
            style={{ backgroundColor: '#cf1322', marginTop: '10px' }}
          >
            수정하기
          </Button>
        </Card>
      )}
    </div>

           {/* 운영정보 */}
         <div>
          <div >
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


export default MyProfile