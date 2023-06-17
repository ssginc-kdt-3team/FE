import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import { axiosWithBaseUrl } from 'App';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

// ==================================|| MyProfile, 점주프로필 ||================================== //


const Span = styled.span`
  color: #999;
  margin-right: 20px;
`;

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
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOwnerData();
  }, [id]);


  return (
    
    <div>
    <div>
      {ownerData && (
        
        <Card
          style={{ width: '100%', marginTop: '20px' }}
        >
          <div style={{ textAlign: 'center' }}>
          <p><Span>점주명</Span> {ownerData.ownerName}</p>
          <p><Span>이메일</Span> {ownerData.ownerEmail}</p>
          {/* <p>주소: {ownerData.ownerAddress}</p>  */}
          <p><Span>전화번호</Span> {ownerData.ownerPhone}</p> 
          <p><Span>생년월일</Span> {ownerData.ownerBirthday}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button
            type='primary'
            onClick={() => navigate(`/profile/update/${id}`)}
            style={{ backgroundColor: '#cf1322' }}
          >
            수정하기
          </Button>
        </div>
        </Card>
      )}
    </div>

 </div>
  );
}


export default MyProfile;