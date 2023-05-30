import React from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  return (
    <ul>
      <li><Link to='/resv'>예약 내역 조회</Link></li>
      <li><Link to='review'>내가 작성한 후기</Link></li>
      <li><Link to='/cash'>충전금</Link></li>
    </ul>
  );
}

export default Profile;