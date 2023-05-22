import React from 'react';
import { Link } from 'react-router-dom';

function MyProfile() {
  const text = '수정하기';

  return ( 
    <div>
      <div>점주 프로필 페이지</div>
      <Link to="/profile/update">{text}</Link> 
    </div>
  );
}

export default MyProfile;