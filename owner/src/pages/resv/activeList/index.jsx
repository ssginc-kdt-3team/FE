import React from 'react';
import { Outlet } from 'react-router-dom';
import Table from "./Table";
import Filter from "./Filter";


function RsvdAcList() {
  return (
    <div>  
    <Outlet/>
    {/* <Filter/> */}
    <Table />
    </div>
  );
}

export default RsvdAcList;