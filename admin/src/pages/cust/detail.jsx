import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card } from 'antd';


function CustDetail() {
  const { id } = useParams(); // useParams을 사용해서 id 값을 가져옴
  console.log(id);
  const [cust, setCust] = useState(null);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/customer/findById/${id}`)
      .then((res) => {
        setCust(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);


  return (
    <div>
      {cust ? (
        <Card title="고객 상세 정보" size="large">
          <ul>
            
            <li><h1>{cust.id}</h1></li>
            <li><p>{cust.name}</p></li>
            <li><p>이메일: {(cust.email)}</p></li>
            <li><p>전화번호: {(cust.phoneNumber)}</p></li>
            <li><p>생년월일: {cust.birthday}</p></li>
            <li><p>성별: {cust.gender}</p></li>
            <li><p>주소: {`${cust.address.city} ${cust.address.district} ${cust.address.detail} ${cust.address.zipCode}`}</p></li>
            <li><p>등급: {(cust.grade.name)}</p></li>
            <li><p>상태: {cust.status}</p></li>
            <li><p>포인트: {cust.status}</p></li>
            <li><p>충전금: {cust.status}</p></li>
          </ul>
        </Card>
        
      ) : (
        <p>Loading customer details...</p>
      )}
    </div>
  );
}
export default CustDetail;