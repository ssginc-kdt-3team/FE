import React from 'react';
import { Outlet } from 'react-router-dom';
import Table from "./table";
import Filter from "./filter";

function ResvTdList() {
  return ( 
          <div>    
            <Outlet/>
            <Filter/>
            <Table />;
          </div>
  );
}

export default ResvTdList;