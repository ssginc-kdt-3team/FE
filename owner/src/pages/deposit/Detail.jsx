import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosWithBaseUrl } from 'App';
import { Card, Typography, Divider, Tag } from 'antd';

// ==============================|| DepositDetail, 예약 상세 정보 ||============================== //


//예약 상세 정보
function DepositDetail() {
  //deposittable 에서  예약id 받아오기 
  const { id } = useParams();
  const [resv, setResv] = useState(null);
  
  const fetchDepositDetail = () => {
    axiosWithBaseUrl
      .get(`/owner/reservation/${id}`)
      .then((res) => {
        setResv(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDepositDetail();                                  
  }, []);    
  

  //상태별 태그 표시
  function getStatusTag(status) {
    let color,
     content;
    if (status === "ALL_PENALTY") {
      color = "volcano";
      content = "전액";
    } else if (status === "RETURN") {
      color = "green";
      content = "환불";
    } else if (status === "HALF_PENALTY") {
      color = "magenta";
      content = "반액";
    } else {
      color = "blue";
      content = "완료";
    }
    return <Tag color={color}>{content}</Tag>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card
        title={
          <div style={{ textAlign: "center", marginBottom: "5px" }}>
            <Typography.Title level={4}>예약금 상세정보</Typography.Title>
          </div>
        }
        style={{
          width: 800,
        }}
      >
        {resv ? (
          <div>
            <li style={{ listStyle: "none" }}>
            <p>
                예약 상태 {getStatusTag(resv.status)}
            </p>            
            </li>
            <Divider>예약금 정보</Divider>
            <ul>
              <li style={{ listStyle: "none" }}>
                <p>예약자명: {resv.name}</p>
              </li>
              <li style={{ listStyle: "none" }}>
                <p>예약금: {resv.originValue}</p>
              </li>
              <li style={{ listStyle: "none" }}>
                <p>위약금: {resv.penaltyValue}</p>
              </li>
            </ul>

            <Divider>예약 정보</Divider>
            <ul>
              <li style={{ listStyle: "none" }}>
                <p>예약일자: {resv.reservationDate.slice(0, 4) + '년'} {resv.reservationDate.slice(5, 7) + '월'} {resv.reservationDate.slice(8, 10) + '일'}</p>
              </li>
              <li style={{ listStyle: "none" }}>
                <p>예약시간: {resv.reservationDate.slice(11, 13) + '시'} {resv.reservationDate.slice(14, 16) + '분'}</p>
              </li>
              <li style={{ listStyle: "none" }}>
                <p>예약 인원: {resv.people}</p>
              </li>
              <li style={{ listStyle: "none" }}>
                <p>유아 수: {resv.child}</p>
              </li>
              <li style={{ listStyle: "none" }}>
                <p>요청사항: {resv.memo}</p>
              </li>
              <li style={{ listStyle: "none" }}>
                <p>취소사유: {resv.cancelReason}</p>
              </li>
            </ul>
          </div>
        ) : (
          <p>Loading reservation details...</p>
        )}
      </Card>
    </div>
  );
}

export default DepositDetail;
