import axios from 'axios';
import React, { useEffect } from 'react';
import Pagination from "react-js-pagination";

function Paging({currentPage=0, totalItems=0, itemsPerPage=0, setCurrentPage=() => console.log('함수 없음'), setResvList=() => console.log('함수 없음')}) {
  const handlePage = () => {
    

  }

  console.log(currentPage,itemsPerPage, totalItems)
  return (
    <Pagination
      activePage={currentPage}
      itemsCountPerPage={itemsPerPage}
      totalItemsCount={totalItems}
      pageRangeDisplayed={5}
      prevPageText={''}
      nextPageText={''}
      onChange={setCurrentPage}
    />
  );
};

export default Paging;