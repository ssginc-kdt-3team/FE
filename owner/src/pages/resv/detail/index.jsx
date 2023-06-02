import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosWithBaseUrl } from 'App';
import { Card, Typography, Divider, Tag } from 'antd';
import Reject from "pages/resv/detail/Rejectbtn";

function ResvDetail() {
  //resvlist 에서  예약id 받아오기 
  const { id } = useParams();
  const [resv, setResv] = useState(null);
  
  useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/reservation/${id}`)
      .then((res) => {
        setResv(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  function getStatusTag(status) {
    let color;
    let content;
    if (status === "NOSHOW") {
      color = "volcano";
      content = "노쇼";
    } else if (status === "DONE") {
      color = "green";
      content = "완료";
    } else if (status === "CANCEL" || status === "IMMINENT") {
      color = "gold";
      content = "취소";
    } else {
      color = "blue";
      content = "예약 중";
    }
    return <Tag color={color}>{content}</Tag>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card
        title={
          <div style={{ textAlign: "center", marginBottom: "5px" }}>
            <Typography.Title level={4}>예약 상세 정보</Typography.Title>
          </div>
        }
        extra={resv && resv.status === "RESERVATION" ? <Reject id={id} /> : null}
        style={{
          width: 800,
        }}
      >
        {resv ? (
          <div>
            <li style={{ listStyle: "none" }}>
            <p>
                예약 상태 {getStatusTag(resv.status)}
              </p>            </li>
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

            <Divider>예약자 정보</Divider>
            <ul>
              <li style={{ listStyle: "none" }}>
                <p>예약자명: {resv.name}</p>
              </li>
              <li style={{ listStyle: "none" }}>
                <p>예약자 번호: {resv.phoneNumber}</p>
              </li>
              <li style={{ listStyle: "none" }}>
                <p>예약금: {resv.deposit}</p>
              </li>
              <li style={{ listStyle: "none" }}>
                <p>위약금: {resv.penalty}</p>
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

export default ResvDetail;