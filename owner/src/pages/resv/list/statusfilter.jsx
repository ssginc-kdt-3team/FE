import React from "react";
import { Button } from "antd";

const StatusFilter = ({ onStatusFilter }) => {
  const handleFilterClick = (status) => {
    onStatusFilter(status);
  };

  return (
    <div>
      <Button onClick={() => handleFilterClick(null)}>전체</Button>
      <Button onClick={() => handleFilterClick("NOSHOW")}>노쇼</Button>
      <Button onClick={() => handleFilterClick("DONE")}>완료</Button>
      <Button onClick={() => handleFilterClick("CANCEL")}>취소</Button>
      <Button onClick={() => handleFilterClick("IMMINENT")}>취소</Button>
      <Button onClick={() => handleFilterClick("RESERVED")}>예약 중</Button>
    </div>
  );
};

export default StatusFilter;
