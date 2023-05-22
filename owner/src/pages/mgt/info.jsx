import React from 'react';
import { Link } from 'react-router-dom';

function MgtInfo() {
  const text = '수정하기';
  return ( 
  <div>
  <div>매장 정보 페이지</div>
   <Link to="/mgt/info/update">{text}</Link> 
  </div>
  );
}

export default MgtInfo;