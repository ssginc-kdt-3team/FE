import React from 'react';
import { Outlet } from 'react-router-dom';
import Table from "./table";
import DateFilter from "./datefilter";
import StatusFilter from "./statusfilter";

function ResvList() {
  return ( 
          <div>    
            <DateFilter />
            <StatusFilter />
            <Table />
            <Outlet />
          </div>
  );
}

export default ResvList;