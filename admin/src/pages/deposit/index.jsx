import React, { useState } from "react";
import DepositList from './List';
import FilterTemp from "./FilterTemp";

// ==============================|| DepositList - 예약금 리스트 ||============================== //

const Deposit = () => {
  const [type, setType] = useState("branch");
  const [branchId, setBranchId] = useState(1);
  const [shopId, setShopId] = useState(-1);

  // useEffect(() => {
  //   console.log('type: ' + type + ' / branchId: ' + branchId + ' / shopId: ' + shopId);
  // }, [type, branchId, shopId])

  return (
    <div>
      {/* 필터 */}
      <FilterTemp type={type} setType={setType} branchId={branchId} setBranchId={setBranchId} shopId={shopId} setShopId={setShopId} />
      {/* 목록 */}
      <DepositList type={type} branchId={branchId} shopId={shopId}/>
    </div>
  );
}

export default Deposit;