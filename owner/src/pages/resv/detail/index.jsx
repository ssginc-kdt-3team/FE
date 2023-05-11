import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResvDetail() {
  const { id  } = useParams(); // useParams을 사용해서 id 값을 가져옴
  console.log(id );
  const [resv, setResv] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/owner/reservation/${id}`)
      .then((res) => {
        setResv(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
    {resv ? (
      <>
        <h1>예약 상세 정보</h1>
        <ul>
          <li><h1>{resv.name}</h1></li>
          <li><p>예약일자 : {resv.reservationDate}</p></li>
          <li><p>예약 인원 : {(resv.people)}</p></li>
          <li><p>유아 수 : {(resv.child)}</p></li>
          <li><p>예약자명 : {(resv.name)}</p></li>
          <li><p>예약자 번호 : {(resv.phoneNumber)}</p></li>
          <li><p>예약 상태 : {(resv.status)}</p></li>
          <li><p>예약금 : {(resv.deposit)}</p></li>
          <li><p>요청사항 : {(resv.memo)}</p></li>
          <li><p>취소사유 : {(resv.cancelReason)}</p></li>
        </ul>
      </>
    ) : (
      <p>Loading reservation details...</p>
    )}
  </div>
  );
}

export default ResvDetail;