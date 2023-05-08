import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ShopList() {
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/shop/findAll")
      .then((response) => {
        setShopList(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>매장 리스트</h1>
      <ul>
        {shopList.map((shop) => (
          <li key={shop.id}>
            <Link to={`/shop/detail/${shop.id}`}>{shop.name}, {shop.info}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ShopList;