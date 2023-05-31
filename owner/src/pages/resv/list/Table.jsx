import { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Table, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import Paging from "components/pagination/Paging";
import { DatePicker } from 'antd';

//userSlice의 id 값 가져오기
import { useSelector } from 'react-redux';


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
    const currentPageInt = parseInt(currentPage, 10); // Convert currentPage to an integer
    const requestBody = {
      start: selectedDate.start,                       // selectedDate 객체에서 시작 날짜
      end: selectedDate.end,                           // selectedDate 객체에서 종료 날짜
    };
    // let type = selectedType;
    // if (selectedType === "all") {
    //   type = "noshow, reservation, done, cancel, imminent";
    // }

    axiosWithBaseUrl
       .post(`/owner/reservation/list/${id}/${selectedType}/${currentPageInt}`, requestBody)
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

  const handleRangePickerChange = (dates, dateStrings) => {
    setSelectedDate({ start: dateStrings[0], end: dateStrings[1] });
    console.log(dateStrings);
    fetchResvList(); // 날짜 선택 시 예약 리스트를 가져옵니다.
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
    },
    {
      title: "예약상태",
      dataIndex: "status",
      key: "status",
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
      {
        title: "예약자명",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <Link to={`/resv/detail/${record.id}`}>{text}</Link>
        ),                                                                        
        
      },
      {
        title: "예약자 번호",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
      },
      {
        title: "예약인원",
        dataIndex: "people",
        key: "people",
      },
      {
        title: "예약금",
        dataIndex: "originValue",
        key: "originValue",
      },
      {
        title: "위약금",
        dataIndex: "penaltyValue",
        key: "penaltyValue",
      }
    ];
  
    return (
      <>
        <RangePicker
          format="YYYY-MM-DD"
          onChange={handleRangePickerChange}
        />
          <Button onClick={() => handleTypeChange("all")}>전체</Button>
          <Button onClick={() => handleTypeChange("reservation")}>예약중</Button>
          <Button onClick={() => handleTypeChange("done")}>완료</Button>
          <Button onClick={() => handleTypeChange("noshow")}>노쇼</Button>
          <Button onClick={() => handleTypeChange("cancel")}>정상취소</Button>
          <Button onClick={() => handleTypeChange("imminent")}>취소</Button>
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
  
  export default ResvTable;
