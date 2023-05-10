import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CustDetail() {
  const { id } = useParams(); // useParams을 사용해서 id 값을 가져옴
  console.log(id);
  const [cust, setCust] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/customer/findById/${id}`)
      .then((res) => {
        setCust(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
    {cust ? (
      <>
        <h1>고객 상세 정보</h1>
        <ul>
          <li><h1>{cust.name}</h1></li>
          <li><p>이메일: {String(cust.email)}</p></li>
          <li><p>주소: {String(cust.address)}</p></li>
          <li><p>등급: {String(cust.grade)}</p></li>
          <li><p>생년월일: {cust.birthday.toString()}</p></li>
        </ul>
      </>
    ) : (
      <p>Loading customer details...</p>
    )}
  </div>
  );
}

export default CustDetail;