import { Outlet } from 'react-router-dom';
import Table from "./Table";
import Filter from "./Filter";

const ResvTdList = () => {
  return (
  <div>
  <Outlet/>
  {/* <Filter/> */}
  <Table />
  </div>
  )
};

export default ResvTdList;