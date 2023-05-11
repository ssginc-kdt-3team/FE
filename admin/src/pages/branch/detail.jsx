import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function  BranchDetail() {
  const { id } = useParams(); // useParams을 사용해서 id 값을 가져옴
  console.log(id);
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/branch/${id}`)
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
      <>
        <h1>지점 상세 정보</h1>
        <ul>
          <li><h1>지점명 : {branch.name}</h1></li>
          {/* <li><p>Email: {String(branch.email)}</p></li> */}
          <li><p>지점주소: {String(branch.adress)}</p></li>
          <p>대표번호: ({branch.phone.slice(0, 3)}) {branch.phone.slice(3, 6)}-{branch.phone.slice(6)}</p>
          <li><p>영업 상태: {String(branch.status)}</p></li>    
          {/* <li><p>Opening Hours: {shop.operationInfo && shop.operationInfo.open_time && shop.operationInfo.close_time ?
                                  `${shop.operationInfo.open_time.toString()} ~ ${shop.operationInfo.close_time.toString()}` : 'Not available'}</p></li>
          <li><p>Order Deadline: {shop.operationInfo && shop.operationInfo.order_close ? 
                                  shop.operationInfo.order_close.toString() : 'Not available'}</p></li> */}
        </ul>
      </>
    ) : (
      <p>Loading shop details...</p>
    )}
  </div>
  );
}

export default BranchDetail;