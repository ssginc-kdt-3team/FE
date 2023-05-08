import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function OwnerList() {
  const [ownerList, setOwnerList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/owner/findAll")
      .then((response) => {
        setOwnerList(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>점주 리스트</h1>
      <ul>
        {ownerList.map((owner) => (
          <li key={owner.id}>
            <Link to ={`/owner/detail/${owner.id}`}>{owner.name}, {owner.email}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OwnerList;