import React from "react";
import { Button, Tag } from "antd";

const StatusFilter = ({ onStatusFilter }) => {
  const handleFilterClick = (status) => {
    onStatusFilter(status);
  };

  return (
    <div>
      <Button onClick={() => handleFilterClick("all")}>전체</Button>
      <Button onClick={() => handleFilterClick("noshow")}>노쇼</Button>
      <Button onClick={() => handleFilterClick("done")}>완료</Button>
      <Button onClick={() => handleFilterClick("cancel")}>정상취소</Button>
      <Button onClick={() => handleFilterClick("imminent")}>취소</Button>
      <Button onClick={() => handleFilterClick("reservation")}>예약 중</Button>
    </div>
  );
};

export default StatusFilter;
