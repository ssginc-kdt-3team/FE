import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function DateFilter({dateRange, setDateRange}) {
  const handleDateRangeSelect = (e) => {
    setDateRange(e);
    // console.log('dateRange: ' + e);
  }

  return (
    <Select bordered={false} size='large' value={dateRange} onChange={(e) => handleDateRangeSelect(e)}>
      <Option value={12}>전체</Option>
      <Option value={1}>1개월</Option>
      <Option value={3}>3개월</Option>
      <Option value={6}>6개월</Option>
    </Select>
  );
}

export default DateFilter;