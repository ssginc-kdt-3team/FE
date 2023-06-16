import React, { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { useParams } from "react-router-dom";

function ResvDetail() {
  const { id } = useParams(); // useParams을 사용해서 id 값을 가져옴
  console.log(id);
  const [reserve, setReserve] = useState(null);

  useEffect(() => {
    axiosWithBaseUrl
      .get(`/admin/reservation/detail/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        setReserve(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
    {reserve ? (
      <>
        <h1>예약 상세 정보</h1>
        <ul>
          <li><h1>{reserve.reservationId}</h1></li>
          <li><p>지점명 : {reserve.branchName}</p></li>
          <li><p>매장명 : {reserve.shopName}</p></li>
          <li><p>예약자명 : {reserve.customerName}</p></li>
          <li><p>예약인원 : {reserve.people}명 (유아: {reserve.child}명)</p></li>
          <li><p>방문일자 : {reserve.reservationTime}</p></li>
        </ul>
      </>
    ) : (
      <p>Loading reserve details...</p>
    )}
  </div>
  );
}

export default ResvDetail;