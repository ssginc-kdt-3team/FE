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
        setReserve(res.data);
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
          <li><h1>{reserve.id}</h1></li>
          <li><p>지점명 : {String(reserve.branch)}</p></li>
          <li><p>예약자명 : {String(reserve.address)}</p></li>
          <li><p>예약인원 : {String(reserve.grade)}</p></li>
          <li><p>방문일자 : {reserve.birthday.toString()}</p></li>
        </ul>
      </>
    ) : (
      <p>Loading reserve details...</p>
    )}
  </div>
  );
}

export default ResvDetail;