import React from 'react';
import { Outlet } from 'react-router-dom';
import Table from "./Table";

//활성화 된 예약 조회
function RsvdAcList() {
  return (
    <div>  
    <Outlet/>
    <Table />
    </div>
  );
}

export default RsvdAcList;