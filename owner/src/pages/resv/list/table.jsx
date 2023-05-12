import { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Table, Tag } from "antd";
import { Link } from "react-router-dom";
import Paging from "components/pagination/paging";
import DateFilter from "./datefilter";
import StatusFilter from "./statusfilter";

const ResvTable = () => {
  const [resvList, setResvList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    fetchResvList();
  }, [currentPage, selectedDate, selectedTime, statusFilter]);

  const fetchResvList = () => {
    setLoading(true);
    const params = {
      page: currentPage,
      date: selectedDate ? selectedDate.toISOString() : null,
      status: statusFilter,
      time: selectedTime ? selectedTime.toISOString() : null,
    };
    axiosWithBaseUrl
      .get("/owner/reserve", { params })
      .then((response) => {
        setResvList(response.data);
        setTotalItems(response.data.totalElements);
        setItemsPerPage(response.data.numberOfElements);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    console.lig(status);
  };

  const handleFilterClick = () => {
    fetchResvList();
  };

  const columns = [
    {
      title: "변동일자",
      dataIndex: "reservationDate",
      key: "reservationDate",
    },
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
      },
    },
    {
      title: "예약자명",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/resv/detail/${record.reserveId}`}>{text}</Link>
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
    // child 바꾸기 
    {
      title: "예약금",
      dataIndex: "child",
       key: "child",
    },
    {
        title: "위약금",
        dataIndex: "child",
         key: "child",
    }
  ];

  return (
    <>
      <DateFilter
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        onFilterClick={handleFilterClick}
      />
       <StatusFilter
        selectedStatus={statusFilter}
        onStatusChange={handleStatusFilter}
        onFilterClick={handleFilterClick}
      />
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