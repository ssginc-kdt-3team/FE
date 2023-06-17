import React, { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { useParams, useNavigate  } from "react-router-dom";
import { Card, Button, Typography } from 'antd';

// ==============================|| BranchDetail - 지점상세||============================== //

function  BranchDetail() {
  const { id } = useParams(); // id 값을 가져옴
  // console.log(id);
  const [branch, setBranch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosWithBaseUrl
      .get(`/admin/branch/detail/${id}`)
      .then((res) => {
        setBranch(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/branch/update/${id}`);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    {/* branch 정보 있을 때 */}
    {branch ? (
      <Card  
      style={{
        width: 700,
      }}
      title={
      <div style={{ textAlign: "center", justifyContent: "space-between"}}>
      <Typography.Title level={4}>지점 상세 정보</Typography.Title>

      </div> 
      
      }
    >
        <ul  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <li style={{ listStyle: "none" }}>
          <li>
              <img src={branch.branchImgUrl} alt="지점 이미지" width="250"/>
          </li>
          
          <li>지점id: {branch.id}</li>
          <li><p>지점명: {branch.name}</p></li>
          <li><p>전화번호: {(branch.phone)}</p></li>
          <li><p>주소: {` ${branch.address.zipCode} ${branch.address.address} ${branch.address.detail} ${branch.address.extraAddress}`}</p></li>
          <li><p>상태: {branch.status}</p></li>
          <li><p>개장시간: {branch.openTime}</p></li>
          <li><p>폐장시간: {branch.closeTime}</p></li>
          <li><p>상태: {branch.status}</p></li>
          <li><p>개점일: {branch.openDay}</p></li>
          <li><p>폐점일: {branch.outDay}</p></li>
          </li>
        </ul>
        {/* 지점수정으로 이동 */}
        <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" onClick={handleEdit} style={{ backgroundColor: '#cf1322' }}>수정하기</Button>
      </div>
   </Card>
      
    ) : (
      <p>Loading branch details...</p>
    )}
  </div>
  );
}

export default BranchDetail;