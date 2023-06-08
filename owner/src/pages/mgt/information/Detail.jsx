import React from 'react';
import { Card, Button, Typography } from 'antd';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
// import { Link } from 'react-router-dom';
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
  const userId = useSelector((state) => state.user.id); // useSelector를 사용하여 Redux 상태에서 id 값을 가져옵니다.
  // data 객체에 useSelector에서 가져온 id 값을 할당합니다.
  const updatedData = { ...data, id: userId };


  return (
    <>
      {
        data && (
          <Card style={{ width : '700px'}}
          // 매장명
          title={
            <div style={{ textAlign: "center", marginBottom: "5px" }}>
              <Typography.Title level={3}>{data.shopName}</Typography.Title>
            </div>
          }>
            
            {/* 매장 이미지 */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
         <    Img src={data.shopImgUrl} alt={data.shopName} style={{ width: '100px', height: 'auto' }}/>
          </div> 

          {/* 매장정보*/}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
               <h3>{data.shopInfo}</h3>
                <p><Span>점주명</Span>{data.ownerName}</p>
                <p><Span>지점명</Span>{data.branchName}</p>
                <p><Span>위치</Span>{data.location}</p>
                <p><Span>오픈시간</Span>{data.openTime}</p>
                <p><Span>닫는시간</Span>{data.closeTime}</p>
                <p><Span>주문 마감 시간</Span>{data.orderCloseTime}</p>
                <p><Span>대표자명</Span>{data.businessCeo}</p>
                <p><Span>사업자등록번호</Span>{data.businessNumber}</p>

          {/* 수정하기 버튼 */}
            <Button 
              type='primary' 
              onClick={() => navigate(`/mgt/info/update/${userId}`)} 
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