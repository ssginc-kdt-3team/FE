import React, { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { useParams } from "react-router-dom";
import { Card, Tag } from 'antd';

// 등급에 따른 태그 색상 매핑
const gradeTagColors = {
  Gold: 'gold',
  Green: 'green',
  Welcome: 'blue',
  // 기본 색상 설정
  default: 'default',
};

// ==============================|| CustDetail - 고객 상세 정보||============================== //

function CustDetail() {
  const { id } = useParams(); // useParams을 사용해서 id 값을 가져옴
  // console.log(id);
  const [cust, setCust] = useState(null);

  useEffect(() => {
    axiosWithBaseUrl
      .get(`/admin/customer/findById/${id}`)
      .then((res) => {
        setCust(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {cust ? (
        <Card title="고객 상세 정보" size="large" style={{ textAlign: "center" }}>
          <ul>
            <li style={{ listStyle: "none" }}><p>등급: <Tag color={gradeTagColors[cust.grade.name]}>{cust.grade.name}</Tag></p></li>
            <li style={{ listStyle: "none" }}><p>고객 id : {cust.id}</p></li>
            <li style={{ listStyle: "none" }}><p>고객명 : {cust.name}</p></li>
            <li style={{ listStyle: "none" }}><p>이메일: {cust.email}</p></li>
            <li style={{ listStyle: "none" }}><p>전화번호: {cust.phoneNumber}</p></li>
            <li style={{ listStyle: "none" }}><p>생년월일: {cust.birthday}</p></li>
            <li style={{ listStyle: "none" }}><p>성별: {cust.gender ? '남성' : '여성'}</p></li>
            <li style={{ listStyle: "none" }}><p>주소: {`${cust.address.address} ${cust.address.extraAddress} ${cust.address.detail} ${cust.address.zipCode}`}</p></li>
            <li style={{ listStyle: "none" }}><p>상태: {cust.status}</p></li>
          </ul>
        </Card>
      ) : (
        <p>Loading customer details...</p>
      )}
    </div>
  );
}

export default CustDetail;