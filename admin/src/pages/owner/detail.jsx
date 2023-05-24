import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function OwnerDetail() {
  const { id } = useParams(); // useParams을 사용해서 id 값을 가져옴
  console.log(id);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/owner/findOne/${id}`)
      .then((res) => {
        setOwner(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
    {owner ? (
      <>
        <h1>점주 상세 정보</h1>
        <ul>
          <li><h1>{owner.ownerId}</h1></li>
          <li><p>점주명 : {String(owner.ownerName)}</p></li>
          <li><p>지점명 : {String(owner.branchName)}</p></li>
          <li><p>매장명 : {String(owner.shopName)}</p></li>
          <li><p>매장위치 : {String(owner.shopLocation)}</p></li>
          <li><p>이메일 : {String(owner.ownerEmail)}</p></li>
          <li><p>전화번호 : {owner.ownerPhone}</p></li>
          <li><p>주소 : {String(owner.ownerAddress)}</p></li>
          <li><p>생년월일 : {owner.ownerBirthday.toString()}</p></li>
          <li><p>상태 : {owner.ownerStatus}</p></li>
        </ul>
      </>
    ) : (
      <p>Loading owner details...</p>
    )}
  </div>
  );
}

export default OwnerDetail;