import { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Table, Tag, Button, Typography, Divider } from "antd";
import { Link } from "react-router-dom";
import Paging from "components/pagination/Paging";
import { DatePicker } from 'antd';
import { useSelector } from 'react-redux';  //userSlice의 id 값 가져오기

const DepositTable = () => {
   const id = useSelector((state) => state.user.id);  
  const [resvList, setResvList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState({year:"2023", month:"6"});   // 기본값 2023년 6월
  const [selectedStatus, setSelectedStatus] = useState("ALL");                  // 기본값 ALL

  useEffect(() => {
    fetchResvList();
  }, [currentPage, selectedDate, selectedStatus]);

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
      .then((response) => {
        setResvList(response.data.content);
        console.log(response.data.content);
        console.log(id);
        setTotalItems(response.data.totalElements);
        setItemsPerPage(response.data.numberOfElements);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleDatePickerChange = (dates, dateStrings) => {
    setSelectedDate({ year: dates.year(), month: dates.month() + 1 });
    console.log(dateStrings);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    console.log(status);
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
    //상태별 태그 추가
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
          <Link to={`/resv/deposit/detail/${record.id}`} style={{ color: 'black' }}>{text}</Link>
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

          <DatePicker 
           format="YYYY-MM" picker="month"
           onChange={handleDatePickerChange}
        />
          <Button onClick={() => handleStatusChange("ALL")}>전체</Button>
          <Button onClick={() => handleStatusChange("RECEIVE")}>완료</Button>
          <Button onClick={() => handleStatusChange("ALL_PENALTY")}>전액</Button>
          <Button onClick={() => handleStatusChange("HALF_PENALTY")}>반액</Button>
          <Button onClick={() => handleStatusChange("RETURN")}>환불</Button>
          {/* <Button onClick={() => handleStatusChange("cancel")}>정상취소</Button> */}
        
        <Divider style={{ marginTop: "30px", fontSize: '18px', fontWeight: 'bold' }}>예약금 목록</Divider>

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
