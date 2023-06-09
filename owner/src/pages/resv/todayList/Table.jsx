import { Table, Tag, Button, Space, Divider, Typography   } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Paging from "components/pagination/Paging";
import { axiosWithBaseUrl } from "App";
import Enter from "pages/resv/todayList/Enterbtn";
import Noshow from "pages/resv/todayList/Noshowbtn";
import { useSelector } from 'react-redux';     

// ==================================|| ResvTdTable, 오늘 예약 조회 테이블 ||================================== //

const ResvTdTable = () => {
 const id = useSelector((state) => state.user.id);        // userSlice의 id 값 가져오기
  const [resvList, setResvList] = useState([]);           // 현재 페이지의 예약 목록
  const [loading, setLoading] = useState(false);          // 데이터를 불러오는 동안의 로딩 상태
  const [currentPage, setCurrentPage] = useState(1);      // 현재 페이지 번호
  const [totalItems, setTotalItems] = useState(0);       
  const [itemsPerPage, setItemsPerPage] = useState(10);   // 한 페이지에 보여줄 예약 수 
  const [selectedType, setSelectedType] = useState("E");   // 기본 값 E

  useEffect(() => {
    fetchResTdvList();                                     
  }, [currentPage, selectedType]);                         
  const fetchResTdvList = () => {
    setLoading(true);
    axiosWithBaseUrl
      .get(`/owner/reservation/activetime/${id}/${selectedType}/${currentPage}`) // 점주 id, 시간 type 선택, 페이징
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

  const handleTypeChange = (type) => {    //type 변경
    setSelectedType(type);
  };
  
  //테이블 columns
  const columns = [
    {
      title: "예약일자",
      dataIndex: "reservationDate",
      key: "reservationDate",
      width: 150,
      align: 'center',
  
      render: reservationDate => {
        return reservationDate.slice(0, 4) + '년' + reservationDate.slice(5, 7) + '월' + reservationDate.slice(8, 10) + '일' 
      }
    },
    {
      title: "예약시간",
      dataIndex: "reservationDate",
      key: "reservationDate",
      width: 150,
      align: 'center',
      render: reservationDate => {
        return  reservationDate.slice(11, 13) + '시' + reservationDate.slice(14, 16) + '분'
      }
    },
    // 상태별 태그
    {
      title: "예약상태",
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
      render: (text) => {
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
    // 예약 상세로 이동
    {
      title: "예약자명",
      dataIndex: "name",
      key: "name",
      width: 150,
      align: 'center',
      render: (text, record) => (
        <Link to={`/resv/detail/${record.id}` } style={{ color: 'black' }}>{text}</Link>
      ),
    },
    {
      title: "예약자 번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 200,
      align: 'center',
    },
    {
      title: "예약인원",
      dataIndex: "people",
      key: "people",
      width: 100,
      align: 'center',
    },
    {
      title: "유아 수",
      dataIndex: "child",
      key: "child",
      width: 100,
      align: 'center',
    },
    {
      title: "버튼",
      dataIndex: "status",
      key: "buttons",
      width: 150,
      align: 'center',
      //예약 상태가 RESERVATION 일 때 완료, 노쇼 버튼 보임
      render: (text, record) => {
        if (text === "RESERVATION") {
          return (
            <>
            <Space>
              {/* 완료버튼 */}
              <Enter id={record.id} fetchResTdvList={fetchResTdvList} reservationDate={record.reservationDate}  />
              <span style={{ marginLeft: '3px' }} />  
              {/* 노쇼버튼 */}
              <Noshow id={record.id} fetchResTdvList={fetchResTdvList} reservationDate={record.reservationDate} />
            </Space>
            </>
          );
        }
        return null;
      },
    },
  ];
  
  return (
    <>

<Typography.Title level={3}>오늘 예약 조회</Typography.Title>

 {/* <Divider  orientation="left" orientationMargin="0" style={{ color: 'black', fontWeight: 'bold' ,fontSize: '15px', borderColor: 'white' }}>시간별 조회</Divider> */}

  <div style={{ textAlign: "" }}>
  <Button onClick={() => handleTypeChange("E")}>전체</Button>
  <Button onClick={() => handleTypeChange("A")}>1시간</Button>
  <Button onClick={() => handleTypeChange("B")}>3시간</Button>
  <Button onClick={() => handleTypeChange("C")}>점심시간</Button>
  <Button onClick={() => handleTypeChange("D")}>저녁시간</Button>
  </div>
      <Divider style={{ marginTop: "30px", fontSize: '18px', fontWeight: 'bold' }}>오늘 예약 목록</Divider>
      <Table
        columns={columns}
        dataSource={resvList}
        pagination={false}
        loading={loading}
        align="center"
        x="max-content"
        style={{ marginTop: "10px"}}

      />
      <Paging
        page={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        setPage={setCurrentPage}
      />
    </>
  );
}

export default ResvTdTable;
