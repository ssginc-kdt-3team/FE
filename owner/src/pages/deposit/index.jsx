import { Outlet } from 'react-router-dom';
import Table from "./table";

const DepositList = () => {
  return (
  <div>
  <Outlet/>
  {/* <Filter/> */}
  <Table />
  </div>
  )
};

export default DepositList;