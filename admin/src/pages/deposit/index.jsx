import React, { useEffect, useState} from "react";
// import { Outlet } from 'react-router-dom';
// import Filter from './filter';
import DepositList from './list';
import FilterTemp from "./FilterTemp";

const Deposit = () => {
  // const [depositBranchID, setDepositBranchID] = useState("");
  const [type, setType] = useState("branch");
  const [branchId, setBranchId] = useState(1);
  const [shopId, setShopId] = useState(-1);

  // useEffect(() => {
  //   console.log('type: ' + type + ' / branchId: ' + branchId + ' / shopId: ' + shopId);
  // }, [type, branchId, shopId])

  return (
    <div>
      {/* <Filter setDepositBranchID={setDepositBranchID} /> */}
      <FilterTemp type={type} setType={setType} branchId={branchId} setBranchId={setBranchId} shopId={shopId} setShopId={setShopId} />
      {/* <Button onClick={}>조회</Button> */}
      <DepositList type={type} branchId={branchId} shopId={shopId}/>
    </div>
  );
}

export default Deposit;