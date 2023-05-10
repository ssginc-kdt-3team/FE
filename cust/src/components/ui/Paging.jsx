import axios from 'axios';
import React, { useEffect } from 'react';
import Pagination from "react-js-pagination";

function Paging({currentPage=1, totalItems=10, itemsPerPage=5, setCurrentPage=() => console.log('함수 없음')}) {
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