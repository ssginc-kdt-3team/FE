import React from 'react';
import { Card, Button, Typography } from 'antd';
import {  useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


const Img = styled.img`
  width: 100%;
  /* height: 100px; */
`;

const Span = styled.span`
  color: #999;
  margin-right: 20px;
`;

function ShopDetail({data}) {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id); // useSelector id 값
  const updatedData = { ...data, id: userId };    
  const getTranslatedCategory = (category) => {    //카레고리명 치환
    switch (category) {
      case 'KOREA':
        return '한식';
      case 'CHINA':
        return '중식';
      case 'JAPAN':
        return '일식';
      case 'WEST':
        return '양식';
      case 'ASIAN':
        return '아시안';
      default:
        return category;
    }
  };

  return (
    <>
      {
        data && (
          <Card 
          style={{ width: '100%', marginTop: '20px' }}
          title={
            <div style={{ textAlign: "center", marginBottom: "5px" }}>
              <Typography.Title level={3}>{data.shopName}</Typography.Title>
            </div>
          }>
            
            {/* 매장 이미지 */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
         <    Img src={data.shopImgUrl} alt={data.shopName} style={{ width: '200px', height: 'auto' }}/>
          </div> 

          {/* 매장정보*/}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
               <h3>{data.shopInfo}</h3>
                <p><Span>지점명</Span>{data.branchName}</p>
                <p><Span>위치</Span>{data.location}</p>
                <p><Span>좌석수</Span>{data.seat}</p>
                <p><Span>오픈시간</Span>{data.openTime}</p>
                <p><Span>마감시간</Span>{data.closeTime}</p>
                <p><Span>주문 마감 시간</Span>{data.orderCloseTime}</p>
                <p><Span>카테고리</Span>{getTranslatedCategory(data.shopCategory)}</p>               
                <p><Span>전화번호</Span>{data.businessNumber}</p>

          {/* 수정하기 버튼 */}
            <Button 
              type='primary' 
             onClick={() => navigate(`/mgt/info/update/${data.shopId}`)}
              style={{ backgroundColor: '#cf1322' }}>
              수정하기
            </Button>
          </div>
        </div>
          </Card>
        )
      }
    </>
  );
}

export default ShopDetail;