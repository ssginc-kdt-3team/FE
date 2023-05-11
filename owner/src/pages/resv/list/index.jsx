import { Outlet } from 'react-router-dom';
import Table from "./table";
import Filter from "./filter";

const ResvList = () => {
  return (
  <div>
  <Outlet/>
  <Filter/>
  <Table />;
  </div>
  )
};

export default ResvList;