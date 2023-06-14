import React from "react";
import { Pagination } from 'antd';

const Paging = ({ page, itemsPerPage, totalItems, setPage }) => {

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  return (
    <Pagination
      current={page}
      pageSize={itemsPerPage}
      total={totalItems}
      showSizeChanger={false}
      pageRange = {5}
      onChange={handlePageChange}
      style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}
    />
  );
};

export default Paging;








// import React, { useState } from "react";
// import '../pagination/paging.css';
// import Pagination from "react-js-pagination";

//   const Paging = ({page, itemsPerPage, totalItems, setPage}) => {

//     console.log(page, itemsPerPage, totalItems);
//     return (
//       <Pagination
//         activePage={page}
//         itemsCountPerPage={itemsPerPage}
//         totalItemsCount={totalItems}
//         pageRangeDisplayed={5}
//         prevPageText={"‹"}
//         nextPageText={"›"}
//         onChange={setPage}
//       />
//     );
//   };

// export default Paging;