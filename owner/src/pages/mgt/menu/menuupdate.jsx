import React from 'react';
import { useLocation } from '../../../../node_modules/react-router-dom/dist/index';

function MenuUpdate() {
  const { state } = useLocation(); // state에 기존 정보 들어 있다
  console.log(state);
  
  return (
    <div>
      메뉴 수정 페이지
    </div>
  );
}

export default MenuUpdate;