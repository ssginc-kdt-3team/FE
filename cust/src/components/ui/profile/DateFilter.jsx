import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function DateFilter({dateRange, setDateRange, setCurrentPage}) {
  const handleDateRangeSelect = (e) => {
    setDateRange(e);
    setCurrentPage(1); // 페이지 1번으로
    // console.log('dateRange: ' + e);
  }

  return (
    <Select bordered={false} size='large' value={dateRange} onChange={(e) => handleDateRangeSelect(e)} style={{ marginRight: '-11px' }}>
      <Option value={12}>최대(1년)</Option>
      <Option value={1}>1개월</Option>
      <Option value={3}>3개월</Option>
      <Option value={6}>6개월</Option>
    </Select>
  );
}

export default DateFilter;