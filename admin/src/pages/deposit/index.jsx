import React, { useState} from "react";
// import { Outlet } from 'react-router-dom';
import Filter from './filter';
import DepositList from './list';

const Deposit = () => {
  const [depositBranchID, setDepositBranchID] = useState("");

  return (
    <div>
      <Filter setDepositBranchID={setDepositBranchID} />
      <DepositList depositBranchID={depositBranchID} />
    </div>
  );
}

export default Deposit;