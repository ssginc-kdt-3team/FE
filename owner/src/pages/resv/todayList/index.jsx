import { Outlet } from 'react-router-dom';
import Table from "./Table";

// ==================================|| ResvTdList, 오늘예약리스트 ||================================== //


const ResvTdList = () => {
  return (
  <div>
  <Outlet/>
  <Table />
  </div>
  )
};

export default ResvTdList;