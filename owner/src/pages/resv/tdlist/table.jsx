import { Table, Tag, Button  } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Paging from "components/pagination/paging";
import { axiosWithBaseUrl } from "App";

const ResvTdTable = () => {
  const [resvList, setResvList] = useState([]);           // 현재 페이지의 예약 목록을 저장 
  const [loading, setLoading] = useState(false);          // 데이터를 불러오는 동안의 로딩 상태를 저장
  const [currentPage, setCurrentPage] = useState(1);      // 현재 페이지 번호를 저장
  const [totalItems, setTotalItems] = useState(0);        // 전체 고객 수를 저장
  const [itemsPerPage, setItemsPerPage] = useState(10);   // 한 페이지에 보여줄 고객 수 저장
  const [selectedType, setSelectedType] = useState("");   // 기본 값 E

  useEffect(() => {
    fetchResTdvList();                                     // 함수를 호출하여 페이지가 변경될 때마다 고객 목록을 가져옴
  }, [currentPage, selectedType]);                         //currentPage가 변경될 때마다 fetchCustomerList 함수가 호출



  const fetchResTdvList = () => {
    setLoading(true);
    axiosWithBaseUrl
      .get(`/owner/reservation/activetime/${selectedType}`) // Use the selectedType value in the URL
      .then((response) => {
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

  const handleEnter = (id) => {
    axiosWithBaseUrl
      .post(`/owner/reservation/enter/${id}`)
      .then((res) => {
        console.log(res.data);
        // setResv({ ...resv, status: "DONE" }); // 예약 상태를"CANCEL"로 업데이트
        console.log("Reservation done");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNoshow = (id) => {
    axiosWithBaseUrl
      .post(`/owner/reservation/noshow/${id}`)
      .then((res) => {
        console.log(res.data);
        // setResv({ ...resv, status: "NOSHOW" }); // 예약 상태를"CANCEL"로 업데이트
        console.log("Reservation noshow");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };
  

  
  const columns = [
    {
      title: "예약일자",
      dataIndex: "reservationDate",
      key: "reservationDate",
      width: 250
    },
    {
      title: "예약상태",
      dataIndex: "status",
      key: "status",
      width: 200,
      align: "center",
      render: (text) => {                          //열 내용 render
        let color;
        let content;
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
      title: "예약자명",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (text, record) => (
        <Link to={`/resv/detail/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "예약자 번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 200
    },
    {
      title: "예약인원",
      dataIndex: "people",
      key: "people",
      width: 150
    },
    {
      title: "유아 수",
      dataIndex: "child",
       key: "child",
       width: 150
      },
      {
        title: "버튼",
        dataIndex: "",
        key: "",
        render: (_, record) => (
          <>
            <Button type="primary" onClick={() => handleEnter(record.id)}>입장</Button>
            <Button danger onClick={() => handleNoshow(record.id)}>노쇼</Button>
          </>
        ),
      },
  ];

  return (
    <>
      <Button onClick={() => handleTypeChange("E")}>전체</Button>
      <Button onClick={() => handleTypeChange("A")}>1시간</Button>
      <Button onClick={() => handleTypeChange("B")}>3시간</Button>
      <Button onClick={() => handleTypeChange("C")}>점심시간</Button>
      <Button onClick={() => handleTypeChange("D")}>저녁시간</Button>
      <Table   
        columns={columns}
        dataSource={resvList}
        pagination={false}
        loading={loading}
        x='max-content'
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


export default ResvTdTable;