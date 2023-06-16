import { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';                                      //userSlice의 id 값 가져오기
import Paging from "components/pagination/Paging";
import { Table, Tag, Button, Typography, Divider, DatePicker } from "antd";
import { Grid } from '@mui/material';

// ==================================|| DepositTable,위약금 목록 ||================================== //


const DepositTable = () => {
  const id = useSelector((state) => state.user.id);  
  const [resvList, setResvList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);                            // 기본값 PAGE1
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState("ALL");                  // 기본값 ALL
  const [penalty, setPenalty] = useState(0);
  const currentDate = new Date();                                               //LOCALDATE : YEAR, MONTH
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const [selectedDate, setSelectedDate] = useState({ year, month });           //날짜 기본 값 LOCALDATE: YYYY-MM


  useEffect(() => {
    fetchResvList();
    fetchPenalty(); 
  }, [currentPage, selectedDate, selectedStatus]);

    //월별 위약금 리스트
    const fetchResvList = () => {
    setLoading(true);
    const currentPageInt = parseInt(currentPage, 10); 
    const requestBody = {
    year: selectedDate.year,
    month: selectedDate.month,
    status: selectedStatus,           
    }

    axiosWithBaseUrl
       .post(`/owner/deposit/${id}/${currentPageInt}`, requestBody)
      .then((res) => {
        setResvList(res.data.content);
        console.log(res.data.content);
        // console.log(id);
        // console.log(currentPageInt);
        setTotalItems(res.data.totalElements);
        setItemsPerPage(res.data.numberOfElements);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

   //월별 총 위약금
    const fetchPenalty = () => {
    const requestBody = {
      year: selectedDate.year,
      month: selectedDate.month,
    };
  
    axiosWithBaseUrl
      .post(`/owner/deposit/penalty/${id}`, requestBody)
      .then((res) => {
        setPenalty(parseInt(res.data.result));
      //console.log(res.data)
      })
      .catch((error) => {
      //console.log(error);
      });
  };

  const handleDatePickerChange = (dates, dateStrings) => {
    setSelectedDate({ year: dates.year(), month: dates.month() + 1 });
    //console.log(dateStrings);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    //console.log(status);
  };

  const formatNumber = (number) => {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "0";
  };

  const columns = [
    {
      title: "예약일자",
      dataIndex: "reservationDate",
      key: "reservationDate",
      align: "center",
      render: reservationDate => {
        return reservationDate.slice(0, 10) + " " + reservationDate.slice(11, 19)
      }
    },
    //예약 상태별 태그 추가 
    {
      title: "예약상태",
      dataIndex: "reservationStatus",
      key: "reservationStatus",
      align: 'center',
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
      }
      },
    //예약금 상태별 태그 추가
    {
      title: "예약금상태",
      dataIndex: "depositStatus",
      key: "depositStatus",
      align: "center",
      render: (text) => {
        let color, content;
        if (text === "ALL_PENALTY") {
          color = "volcano";
          content = "전액";
        } else if (text === "RETURN") {
          color = "green";
          content = "환불";
        } else if (text === "HALF_PENALTY") {
          color = "magenta";
          content = "반액";
        } else {
          color = "blue";
          content = "완료";
        }
        return <Tag color={color}>{content}</Tag>;
      }
      },
      //예약금 상세로 이동
      {
        title: "예약자명",
        dataIndex: "customerName",
        key: "customerName",
        align: "center",
        render: (text, record) => (
          <Link to={`/resv/deposit/detail/${record.reservationId}`} style={{ color: 'black' }}>{text}</Link>
        ),                                                                        
        
      },
      {
        title: "예약인원",
        dataIndex: "people",
        key: "people",
        align: "center",
      },

      {
        title: "예약금",
        dataIndex: "originDeposit",
        key: "originDeposit",
        align: "center",
      },
      {
        title: "위약금",
        dataIndex: "penaltyValue",
        key: "penaltyValue",
        align: "center",
      }
    ];
  
    return (
      <>
      <Typography.Title level={3}>예약금 내역 조회</Typography.Title>
          {/* 날짜 필터 */}
          <DatePicker 
           format="YYYY-MM" picker="month"
           onChange={handleDatePickerChange}
        />
          {/* 상태별 필터 */}
          <Button onClick={() => handleStatusChange("ALL")}>전체</Button>
          <Button onClick={() => handleStatusChange("RECEIVE")}>완료</Button>
          <Button onClick={() => handleStatusChange("ALL_PENALTY")}>전액</Button>
          <Button onClick={() => handleStatusChange("HALF_PENALTY")}>반액</Button>
          <Button onClick={() => handleStatusChange("RETURN")}>환불</Button>      
          {/* 테이블 제목 */}
          <Divider style={{ marginTop: "30px", fontSize: '18px', fontWeight: 'bold' }}>예약금 목록</Divider>
          {/* 월별 총 위약금 */}
          <Grid container justifyContent="flex-end">
          <Typography.Title level={5}>총 위약금: {formatNumber(penalty)}</Typography.Title>
          </Grid>
          {/* 예약금 테이블 */}
          <Table
          columns={columns}
          dataSource={resvList}
          pagination={false}
          loading={loading}
          align="center"
        />
        <Paging
          page={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          setPage={setCurrentPage}
        />
      </>
    );
  };
  
  export default DepositTable;
