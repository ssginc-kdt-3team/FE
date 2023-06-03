import { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Table, Tag, Button, Typography, Divider, DatePicker } from "antd";
import { Link } from "react-router-dom";
import Paging from "components/pagination/Paging";
import { useSelector } from 'react-redux';   //userSlice의 id 값 가져오기
import StatusFilter from "./Statusfilter";

const { RangePicker } = DatePicker;

const ResvTable = () => {
  const id = useSelector((state) => state.user.id);  
  const [resvList, setResvList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState({start:"1990-01-01", end:"2300-01-01"});
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    fetchResvList();
  }, [currentPage, selectedDate, selectedType]);

  const fetchResvList = () => {
    setLoading(true);
    const currentPageInt = parseInt(currentPage, 10); //  currentPage to an integer
    const requestBody = {
      start: selectedDate.start,                       // selectedDate 객체에서 시작 날짜
      end: selectedDate.end,                           // selectedDate 객체에서 종료 날짜
    };

    axiosWithBaseUrl
       .post(`/owner/reservation/list/${id}/${selectedType}/${currentPageInt}`, requestBody)
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

  const handleRangePickerChange = (dates, dateStrings) => {
    setSelectedDate({ start: dateStrings[0], end: dateStrings[1] });
    console.log(dateStrings);
    fetchResvList();                                                    // 날짜 선택 시 예약 리스트를 가져옴
  };

    const handleTypeChange = (type) => {
    setSelectedType(type);
    console.log(type);
    // fetchResvList(); 
  };
  

  const columns = [
    {
      title: "예약일자",
      dataIndex: "reservationDate",
      key: "reservationDate",
      align: 'center',
  
      render: reservationDate => {
        return reservationDate.slice(0, 4) + '년' + reservationDate.slice(5, 7) + '월' + reservationDate.slice(8, 10) + '일' 
      }
    },
    {
      title: "예약시간",
      dataIndex: "reservationDate",
      key: "reservationDate",
      align: 'center',
      render: reservationDate => {
        return  reservationDate.slice(11, 13) + '시' + reservationDate.slice(14, 16) + '분'
      }
    },
    {
      title: "예약상태",
      dataIndex: "status",
      key: "status",
      align: 'center',
      // 상태별 태그
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
      // 예약 상세페이지로 이동
      {
        title: "예약자명",
        dataIndex: "name",
        key: "name",
        align: 'center',
        render: (text, record) => (
          <Link to={`/resv/detail/${record.id}` }style={{ color: 'black' }}>{text}</Link>
        ),                                                                        
        
      },
      {
        title: "예약자 번호",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        align: 'center',
      },
      {
        title: "예약인원",
        dataIndex: "people",
        key: "people",
        align: 'center',
      },
      {
        title: "예약금",
        dataIndex: "originValue",
        key: "originValue",
        align: 'center',
      },
      {
        title: "위약금",
        dataIndex: "penaltyValue",
        key: "penaltyValue",
        align: 'center',
      }
    ];
  
    return (
      <>
      <Typography.Title level={3}  style={{ marginBottom: "30px"}}>예약 내역 조회</Typography.Title>
      {/* <Divider  orientation="left" orientationMargin="0" style={{ color: 'black', fontWeight: 'bold' ,fontSize: '15px', borderColor: 'white' }}>조회</Divider> */}
        <RangePicker
          format="YYYY-MM-DD"
          onChange={handleRangePickerChange}
        />
        <div style={{ marginTop: '10px' }}></div>

         {/* selectedType */}
         <StatusFilter />
        
        <Divider style={{ marginTop: "30px", fontSize: '18px', fontWeight: 'bold' }}>전체 예약 목록</Divider>

        <Table
          columns={columns}
          dataSource={resvList}
          pagination={false}
          loading={loading}
          align="center"
          style={{ marginTop: "20px"}}

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
  
  export default ResvTable;
