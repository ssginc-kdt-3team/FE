import React from 'react';
import { Outlet } from 'react-router-dom';
import Filter from './filter';
import DepositList from './list';

const Deposit = () => {
 
  return (
    <div>
      <Outlet/>
      <Filter />
      <DepositList />
    </div>
  );
};

export default Deposit;