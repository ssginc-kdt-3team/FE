import React from 'react';
import { Outlet } from 'react-router-dom';
import ResvTable from "./Table";
import DateFilter from "./Datefilter";
import StatusFilter from "./Statusfilter";

function ResvList() {
  return ( 
          <div>    
             {/* <DateFilter /> */}
            {/* <StatusFilter />  */}
            <ResvTable />
            <Outlet />
          </div>
  );
}

export default ResvList;