import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <ul>
      <li><Link to={"/resv/add"}>예약하기</Link></li>
      <li><Link to={"/resv"}>예약내역</Link></li>
    </ul>
  );
}

export default Main;