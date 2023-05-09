import React from 'react';
import { Table } from 'antd';


//컬럼명 지정
const columns = [
  {
    title: '지점명',
    dataIndex: 'branch_name',
    width: 40,
  },
  {
    title: '매장명',
    dataIndex: 'shop_name',
    width: 60,
  },
  {
    title: '예약자명',
    dataIndex: 'cust_name',
    width: 50,
  },
  {
    title: '전화번호',
    dataIndex: 'cust_phone',
    width: 60,
  },
  {
    title: '예약상태',
    dataIndex: 'resv_status',
    width: 60,
  },
];
// /admin/deposit/lists

//axios로 데이터 불러오기 (지점명, 매장명, 예약자명, 전화번호, 예약상)
const data = [];

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    branch_name: `스타필드 ${i}`,
    shop_name: `식당 ${i}`,
    cust_name: `Edward King ${i}`,
    cust_phone: `010-1234-1 ${i}`,
    resv_status: i
  });
}

const ResvList = () => (
  <>
  <h1>예약내역리스트</h1>
  <Table
    columns={columns}
    dataSource={data}
    pagination={{
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100']
    }}
    scroll={{
      y: 500,
      x: 'max-content'
    }}
  />
  </>
);

export default ResvList;