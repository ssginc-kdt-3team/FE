import React, { useState } from "react";
import '../pagination/paging.css';
import Pagination from "react-js-pagination";

  const Paging = ({page, itemsPerPage, totalItems, setPage}) => {

    console.log(page, itemsPerPage, totalItems);
    return (
      <Pagination
        activePage={page}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalItems}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={setPage}
      />
    );
  };

export default Paging;