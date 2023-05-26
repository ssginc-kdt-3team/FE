import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosWithBaseUrl } from 'App';
import { Card } from 'antd';
import Reject from "pages/resv/detail/rejectbtn";

function ResvDetail() {
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

  // const handleReject = () => {
  //   axios
  //     .post(`http://localhost:8080/owner/reservation/reject/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       // setResv({ ...resv, status: "CANCEL" }); // 예약 상태를"CANCEL"로 업데이트
  //       console.log("Reservation rejected");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <Card
      title="예약 상세 정보"
    //   예약 중일 때만 거절하기 버튼 보임
      extra={resv && resv.status === "RESERVATION" ? <Reject id={id} /> : null}
      style={{
        width: 800,
      }}
    >
      {resv ? (
        <ul>
          <li>
            <h1>{resv.name}</h1>
          </li>
          <li>
            <p>예약일자: {resv.reservationDate}</p>
          </li>
          <li>
            <p>예약 인원: {resv.people}</p>
          </li>
          <li>
            <p>유아 수: {resv.child}</p>
          </li>
          <li>
            <p>예약자명: {resv.name}</p>
          </li>
          <li>
            <p>예약자 번호: {resv.phoneNumber}</p>
          </li>
          <li>
            <p>예약 상태: {resv.status}</p>
          </li>
          <li>
            <p>예약금: {resv.deposit}</p>
          </li>
          <li>
            <p>위약금: {resv.penalty}</p>
          </li>
          <li>
            <p>요청사항: {resv.memo}</p>
          </li>
          <li>
            <p>취소사유: {resv.cancelReason}</p>
          </li>
        </ul>
      ) : (
        <p>Loading reservation details...</p>
      )}
    </Card>
  );
}

export default ResvDetail;