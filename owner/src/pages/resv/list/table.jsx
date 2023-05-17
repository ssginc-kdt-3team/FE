import { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Table, Tag } from "antd";
import { Link } from "react-router-dom";
import Paging from "components/pagination/paging";
import DateFilter from "./datefilter";
import StatusFilter from "./statusfilter";
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

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
    const currentPageInt = parseInt(currentPage, 10); // Convert currentPage to an integer
    const params = {
      page: currentPageInt,
    };
    const requestBody = {
      status: statusFilter,
      date: selectedDate ? selectedDate.toISOString() : null,
      time: selectedTime ? selectedTime.toISOString() : null,
    };
    axiosWithBaseUrl
      .get(`/owner/reservation/getall/${3}/${currentPageInt}`, { params, data: requestBody })
      .then((response) => {
        setResvList(response.data.content);
         console.log(response.data.content);
        setTotalItems(response.data.totalElements);
        setItemsPerPage(response.data.numberOfElements);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    console.log(status);
  };

  const handleFilterClick = () => {
    fetchResvList();
    setCurrentPage(1);
  };

  const handleRangePickerChange = (value, dateString) => {
    setSelectedDate(dateString[0]);
    setSelectedTime(dateString[1]);
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
        <RangePicker
          showTime={{
            format: 'HH:mm',
          }}
          format="YYYY-MM-DD HH:mm"
          onChange={handleRangePickerChange}
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