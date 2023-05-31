import { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Table, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import Paging from "components/pagination/Paging";
import { DatePicker } from 'antd';
//userSlice의 id 값 가져오기
import { useSelector } from 'react-redux';

// const monthFormat = 'YYYY/MM';

const DepositTable = () => {
   const id = useSelector((state) => state.user.id);  
  const [resvList, setResvList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState({year:"2023", month:"5"});
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  useEffect(() => {
    fetchResvList();
  }, [currentPage, selectedDate, selectedStatus]);

  const fetchResvList = () => {
    setLoading(true);
    const currentPageInt = parseInt(currentPage, 10); // Convert currentPage to an integer
    const requestBody = {
    year: selectedDate.year,
    month: selectedDate.month,
    status: selectedStatus,           
    }

    axiosWithBaseUrl
       .post(`/owner/deposit/${id}/${currentPageInt}`, requestBody)
      // .get(`/owner/reservation/list/${3}/noshoww/${currentPageInt}`, { params, data: requestBody })
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
    // fetchResvList(); // 날짜 선택 시 예약 리스트를 가져옵니다.
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    console.log(status);
    // fetchResvList();
  };
  

  const columns = [
    {
      title: "예약일자",
      dataIndex: "reservationDate",
      key: "reservationDate",
    },
    {
      title: "예약금상태",
      dataIndex: "depositStatus",
      key: "depositStatus",
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
      {
        title: "예약자명",
        dataIndex: "customerName",
        key: "customerName",
        render: (text, record) => (
          <Link to={`/resv/detail/${record.id}`}>{text}</Link>
        ),                                                                        
        
      },
      // {
      //   title: "예약자 번호",
      //   dataIndex: "phoneNumber",
      //   key: "phoneNumber",
      // },
      {
        title: "예약인원",
        dataIndex: "people",
        key: "people",
      },

      {
        title: "예약금",
        dataIndex: "originDeposit",
        key: "originDeposit",
      },
      {
        title: "위약금",
        dataIndex: "penaltyValue",
        key: "penaltyValue",
      }
    ];
  
    return (
      <>
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
        
        <Table
          columns={columns}
          dataSource={resvList}
          pagination={false}
          loading={loading}
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
