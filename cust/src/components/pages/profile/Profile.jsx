import React from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const payInfo = {
		name : "5만원 충전",
		value : "50000",
    price : "50000",
		customerId : "6"
  }

  const payPopup = (url) => {
    let popHeight = 600; // 띄울 팝업창 높이   
    let popWidth = 500; // 띄울 팝업창 너비
    let winHeight = window.outerHeight; // 현재창의 높이
    let winWidth = window.outerWidth; // 현재창의 너비
    let winY = window.screenTop; // 현재창의 y좌표
    let winX = window.screenLeft; // 현재창의 x좌표
    let popY = winY + (winHeight - popHeight) / 4;
    let popX = winX + (winWidth - popWidth) / 8;

    console.log(winHeight);
    window.open(url, '카카오 페이 결제', 'top='+popY+', left='+popX+', width='+popWidth+', height='+popHeight+', scrollbars=no, resizable=no');
    // window.location.href = url
  }

  const handlePay = () => {
    axios.post('/customer/charge/ready', payInfo)
    .then(res => {
      console.log(res);
      payPopup(res.data.next_redirect_pc_url);
    })
    .catch(err => {
      console.log(err);
      // alert('오류가 발생하였습니다.');
    })
  }

  return (
    <Button onClick={handlePay}>결제</Button>
  );
}

export default Profile;