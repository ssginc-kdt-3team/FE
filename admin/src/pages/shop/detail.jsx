import React, { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { useParams } from "react-router-dom";

function  ShopDetail() {
  const { id } = useParams(); // useParams을 사용해서 id 값을 가져옴
  console.log(id);
  const [shop, setShop] = useState(null);

  useEffect(() => {
    axiosWithBaseUrl
      .get(`/admin/shop/findById/${id}`)
      .then((res) => {
        setShop(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
    {shop ? (
      <>
        <h1>매장 상세 정보</h1>
        <ul>
          <li><h1>{shop.name}</h1></li>
          <li><p>Email: {String(shop.email)}</p></li>
          <li><p>매장위치: {String(shop.location)}</p></li>
          <li><p>사업자등록번호: {String(shop.business_name)}</p></li>
          <li><p>Birthday: {shop.birthday.toString()}</p></li>    
          <li><p>Opening Hours: {shop.operationInfo && shop.operationInfo.open_time && shop.operationInfo.close_time ?
                                  `${shop.operationInfo.open_time.toString()} ~ ${shop.operationInfo.close_time.toString()}` : 'Not available'}</p></li>
          <li><p>Order Deadline: {shop.operationInfo && shop.operationInfo.order_close ? 
                                  shop.operationInfo.order_close.toString() : 'Not available'}</p></li>
        </ul>
      </>
    ) : (
      <p>Loading shop details...</p>
    )}
  </div>
  );
}

export default ShopDetail;