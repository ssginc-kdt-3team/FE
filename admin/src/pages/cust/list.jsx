import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link  } from "react-router-dom";

function CustList() {
  const [custList, setCustList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/cust/findAll")
      .then((response) => {
        setCustList(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>고객 리스트</h1>
      <ul>
        {custList.map((cust) => (
          <li key={cust.id}>
            <Link to={`/cust/detail/${cust.id}`}>{cust.name}, {cust.email}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustList;