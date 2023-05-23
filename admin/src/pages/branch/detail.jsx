import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card } from 'antd';

function  BranchDetail() {
  const { id } = useParams(); // useParams을 사용해서 id 값을 가져옴
  console.log(id);
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/branch/detail/${id}`)
      .then((res) => {
        setBranch(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
    {branch ? (
      <Card title="지점 상세 정보" size="large">
        <ul>
          
          <li><h1>{branch.id}</h1></li>
          <li><p>지점명: {branch.name}</p></li>
          <li><p>지점사진</p>
              <img src={branch.branchImgUrl} alt="지점 이미지" width="200"/>
          </li>
          <li><p>전화번호: {(branch.phone)}</p></li>
          <li><p>주소: {`${branch.address.city} ${branch.address.district} ${branch.address.detail} ${branch.address.zipCode}`}</p></li>
          <li><p>상태: {branch.status}</p></li>
          <li><p>개장시간: {branch.openTime}</p></li>
          <li><p>폐장시간: {branch.closeTime}</p></li>
          <li><p>상태: {branch.status}</p></li>
          <li><p>개점일: {branch.openDay}</p></li>
          <li><p>폐점일: {branch.outDay}</p></li>
        </ul>
      </Card>
      
    ) : (
      <p>Loading branch details...</p>
    )}
  </div>
  );
}

export default BranchDetail;