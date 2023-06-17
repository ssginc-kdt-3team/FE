import React, { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { useParams } from "react-router-dom";
import { Card } from 'antd';

// ==============================|| OwnerDetail - 점주 상세 ||============================== //

function OwnerDetail() {
  const { id } = useParams(); //  id 값을 가져옴
  // console.log(id);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    axiosWithBaseUrl
      .get(`/admin/owner/findOne/${id}`)
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
      <Card title="점주 상세 정보" size="large" style={{ textAlign: "center" }}>
       <ul>
          <li style={{ listStyle: "none" }}>점주 ID : {owner.ownerId}</li>
          <li style={{ listStyle: "none" }}><p>점주명 : {String(owner.ownerName)}</p></li>
          <li style={{ listStyle: "none" }}><p>지점명 : {String(owner.branchName)}</p></li>
          <li style={{ listStyle: "none" }}><p>매장명 : {String(owner.shopName)}</p></li>
          <li style={{ listStyle: "none" }}><p>매장위치 : {String(owner.shopLocation)}</p></li>
          <li style={{ listStyle: "none" }}><p>이메일 : {String(owner.ownerEmail)}</p></li>
          <li style={{ listStyle: "none" }}><p>전화번호 : {owner.ownerPhone}</p></li>
          <li style={{ listStyle: "none" }}><p>생년월일 : {owner.ownerBirthday.toString()}</p></li>
          <li style={{ listStyle: "none" }}><p>상태 : {owner.ownerStatus}</p></li>
        </ul>
          </Card>
    ) : (
      <p>Loading owner details...</p>
    )}
  </div>
  );
}

export default OwnerDetail;