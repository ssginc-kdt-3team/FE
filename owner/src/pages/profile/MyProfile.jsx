import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import { axiosWithBaseUrl } from 'App';
import { useSelector, useDispatch } from 'react-redux';

function MyProfile() {
  const id = useSelector((state) => state.user.id);
  const [ownerData, setOwnerData] = useState(null);

  const navigate = useNavigate();
  // 점주 프로필
  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const res = await 
        axiosWithBaseUrl
        .get(`/owner/detail/${id}`); //owner id
        setOwnerData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOwnerData();
  }, [id]);


  return (
    
    <div className='grid-2c flex-gap-80'>
    <div>
      {ownerData && (
        
        <Card
        //   title={
        //     <div style={{ textAlign: 'center', marginBottom: '5px' }}>
        //       <Typography.Title level={4}>내 프로필</Typography.Title>
        //     </div>
        //   }
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

 </div>
  );
}


export default MyProfile;