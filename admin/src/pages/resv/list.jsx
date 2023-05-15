import React, { useEffect, useState } from 'react';
import { axiosWithBaseUrl } from "App";
import { Table, Tag } from 'antd';
import { Link } from "react-router-dom";
import Paging from "components/pagination/paging";

const ResvList = () => {
  const [resvList, setResvList] = useState([]);             // 예약 리스트를 담는 배열
  const [loading, setLoading] = useState(false);            // 데이터 로딩 상태를 나타내는 boolean 값
  const [currentPage, setCurrentPage] = useState(1);        // 현재 페이지 번호
  const [totalItems, setTotalItems] = useState(0);          // 전체 아이템 개수
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterType, setFilterType] = useState('branch');   // 초기 선택: 'branch'
  const [filterId, setFilterId] = useState(1);              // 초기 선택: 1
  const [filterStatus, setFilterStatus] = useState('ALL');  // 초기 선택: 'ALL'
  const [branchData, setBranchData] = useState(null);       // 지점 데이터
  const [shopData, setShopData] = useState(null);           // 매장 데이터
// branchId 변수 추가
const [branchId, setBranchId] = useState(null);
// shopId 변수 추가
const [shopId, setShopId] = useState(null);


useEffect(() => {
  //지점 data
  axiosWithBaseUrl
    .get('/branch/all')
    .then((response) => {
      setBranchData(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

useEffect(() => {
    // 매장 데이터 로드
    if (filterType === 'shop' && filterId) {
      axiosWithBaseUrl
        .get(`/branch/shops/${filterId}`)
        .then((response) => {
          setShopData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filterType, filterId]);

  useEffect(() => {
    fetchResvList();
  }, [currentPage, filterType, branchData, shopData, filterStatus]);

  const fetchResvList = () => {
    setLoading(true);

    const params = new URLSearchParams();
    params.append('type', filterType);
    if (filterType === 'branch') {
      params.append('id', branchId);
    } else if (filterType === 'shop') {
      params.append('id', shopId);
    }
    params.append('page', currentPage);

    axiosWithBaseUrl
      .get(`/admin/reservation/?${params.toString()}`)
      .then((response) => {
        console.log(response.data);
        setResvList(response.data);
        console.log(response.data);
        setTotalItems(response.data.totalElements);
        setItemsPerPage(response.data.numberOfElements);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterTypeChange = (value) => {
    setFilterType(value);
    // 선택한 옵션에 따라 branchId와 shopId 초기화
    if (value === 'branch') {
      setBranchId(null);
    } else if (value === 'shop') {
      setShopId(null);
    }
  };

  const handleFilterIdChange = (value) => {
    if (filterType === 'branch') {
      setBranchId(value);
    } else if (filterType === 'shop') {
      setShopId(value);
    }
  };

  const handleFilterStatusChange = (value) => {
    setFilterStatus(value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchResvList();
  };

  const columns = [
    {
      title: '지점명',
      dataIndex: 'branchName',
      key: 'branchName',
      width:40,
    },
    {
    title: '매장명',
    dataIndex: 'shopName',
    key: 'shopName',
    width: 60,
    },
    {
    title: "예약상태",
    dataIndex: "status",
    key: "status",
    width: 50,
    render: (text) => {
    let color, content;
    if (text === "NOSHOW") {
      color = "volcano";
      content = "노쇼";
    } else if (text === "DONE") {
      color = "green";
      content = "완료";
    } else if (text === "CANCEL") {
      color = "gold";
      content = "취소";
    } else if (text === "IMMINENT") {
      color = "magenta";
      content = "취소";
    } else {
      color = "blue";
      content = "예약 중";
    }

    return <Tag color={color}>{content}</Tag>;
  },
},
{
  title: '예약일자',
  dataIndex: 'reservationTime',
  key: 'reservationTime',
  width: 100,
},
{
  title: '예약자명',
  dataIndex: 'customerName',
  key: 'customerName',
  width: 50,
  render: (text, record) => (
    <Link to={`/customer/${record.customerId}`}>{text}</Link>
  ),
},
{
  title: '전화번호',
  dataIndex: 'customerPhone',
  key: 'customerPhone',
  width: 60,
},
{
  title: '예약인원',
  dataIndex: 'people',
  key: 'people',
  width: 60,
},
{
  title: '유아 수',
  dataIndex: 'children',
  key: 'children',
  width: 60,
},
];

return (
<>
<h1>예약내역리스트</h1>
<div>
<label>지점 선택:</label>
<select value={filterId} onChange={(e) => handleFilterIdChange(e.target.value)}>
  <option value="">전체</option>
  {branchData && branchData.map((branch) => (
    <option key={branch.id} value={branch.id}>{branch.name}</option>
  ))}
</select>

  {/* <label>ID:</label>
  <input type="number" value={filterId} onChange={(e) => handleFilterIdChange(e.target.value)} /> */}

  {filterType === 'branch' && (
    <>
      {/* 지점 선택 시에만 매장 선택 옵션 표시 */}
      <label>매장 선택:</label>
      <select value={shopId} onChange={(e) => setShopId(e.target.value)}>
        {/* 매장 옵션들 */}
      </select>
    </>
  )}

  <label>예약 상태:</label>
  <select value={filterStatus} onChange={(e) => handleFilterStatusChange(e.target.value)}>
    <option value="ALL">전체</option>
    <option value="RESERVATION">예약 중</option>
    <option value="DONE">완료</option>
    <option value="CANCEL">취소(정상)</option>
    <option value="IMMINENT">취소</option>
    <option value="NOSHOW">노쇼</option>
  </select>
  <button onClick={handleSearch}>조회하기</button>
</div>

  <Table
    columns={columns}
    dataSource={resvList}
    pagination={false}
    scroll={{
      y: 500,
      x: 'max-content'
    }}
    loading={loading}
  />

  <Paging
    page={currentPage}
    itemsPerPage={itemsPerPage}
    totalItems={totalItems}
    setPage={handlePageChange}
    />
    </>
    );
    };
    
    export default ResvList;