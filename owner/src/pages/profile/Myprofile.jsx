import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import { axiosWithBaseUrl } from 'App';
import { useSelector } from 'react-redux';

function MyProfile() {
  const id = useSelector((state) => state.user.id);
  const [ownerData, setOwnerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await axiosWithBaseUrl.get(`/owner/detail/${id}`);
        setOwnerData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOwnerData();
  }, [id]);

  return (
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
          {/* <p>주소: {ownerData.ownerAddress}</p> */}
          {/* <p>번호: {ownerData.ownerPhone}</p>
          <p>생년월일: {ownerData.ownerBirthday}</p> */}
          <Button
            type='primary'
            onClick={() => navigate('/profile/update')}
            style={{ backgroundColor: '#cf1322', marginTop: '10px' }}
          >
            수정하기
          </Button>
        </Card>
      )}
    </div>
  );
}

export default MyProfile;
