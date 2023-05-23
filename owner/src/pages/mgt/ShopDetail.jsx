import React from 'react';
import { Card } from 'antd';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
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
                <p><Span>OWNER</Span>{data.ownerName}</p>
                <p><Span>BRANCH</Span>{data.branchName}</p>
                <p><Span>LOCATION</Span>{data.location}</p>
                <p><Span>TIME</Span>{data.openTime}~{data.closeTime} (마감 시간: {data.orderCloseTime})</p>
                <p><Span>CEO</Span>{data.businessCeo}</p>
                <p><Span>BUSINESS NUMBER</Span>{data.businessNumber}</p>
              </div>
            </div>
          </Card>
        )
      }
    </>
  );
}

export default ShopDetail;