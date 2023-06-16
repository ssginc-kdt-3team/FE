import React from 'react';
import { Outlet } from 'react-router-dom';
import ResvTable from "./Table";

// ==================================|| ResvList, 전체 예약 목록||================================== //

function ResvList() {
  return ( 
          <div>    
            <ResvTable />
            <Outlet />
          </div>
  );
}

export default ResvList;