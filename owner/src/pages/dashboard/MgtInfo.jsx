import React, { useEffect, useState } from 'react';
import { Card, Button, Typography } from 'antd';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { axiosWithBaseUrl } from 'App';
import { useNavigate } from 'react-router-dom';

// ==================================|| 메인2. 매장정보 ||================================== //

const Span = styled.span`
  color: #999;
  margin-right: 20px;
`;

function MgtInfo() {
  const id = useSelector((state) => state.user.id); 
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/shop/detail/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log(id);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {
        data && (
        <div style={{ textAlign: "center", marginBottom: "5px" }}>
              <Typography.Title level={4}>{data.shopName}</Typography.Title>
          
          {/* 매장정보*/}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                <p><Span>지점명 :</Span>{data.branchName}</p>
                <p><Span>오픈시간 :</Span>{data.openTime}</p>
                <p><Span>닫는시간 :</Span>{data.closeTime}</p>
                <p><Span>주문마감시간 :</Span>{data.orderCloseTime}</p>
                <p><Span>좌석 수 :</Span>{data.seat}</p>

          </div>
        </div>
        </div>
       
        )
      }
    </>
  );
}

export default MgtInfo;