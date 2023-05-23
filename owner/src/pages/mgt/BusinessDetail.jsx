import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
  /* height: 100px; */
`;

const Span = styled.span`
  color: #999;
  margin-right: 20px;
`;

function BusinessDetail({data}) {
  const grid = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns : 'repeat(2, 1fr)',
    gap: '40px'
  };
  
  return (
    <>
      {
        data && (
          <Card>
            <div style={grid}>
              <Img src={data.businessImgUrl} alt='businessCeo'/>

              <div>
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

export default BusinessDetail;