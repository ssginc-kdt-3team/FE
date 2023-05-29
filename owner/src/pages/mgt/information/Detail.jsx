import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  const { id } = data;

  return (
    <>
      {
        data && (
          <Card>
            
            {/* title="Default size card" 
            extra={<Button type="primary" onClick={() => navigate(`/mgt/info/update/${'아이디'}`)}>수정</Button>}  */}
            
            <div className='grid-2c flex-gap-40 width-100'>
              <Img src={data.shopImgUrl} alt={data.shopName}/>

              <div>
                <h2 style={{ borderBottom: '1px solid #ccc' }}>{data.shopName}</h2>
                <h3>{data.shopInfo}</h3>
                <p><Span>이름</Span>{data.ownerName}</p>
                <p><Span>지점명</Span>{data.branchName}</p>
                <p><Span>위치</Span>{data.location}</p>
                <p><Span>오픈시간</Span>{data.openTime}</p>
                <p><Span>닫는시간</Span>{data.closeTime}</p>
                <p><Span>주문 마감 시간</Span>{data.orderCloseTime}</p>
                <p><Span>대표자명</Span>{data.businessCeo}</p>
                <p><Span>사업자등록번호</Span>{data.businessNumber}</p>
                <Button type='primary' onClick={() => navigate(`/mgt/info/update/${14}`)}>
                수정
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