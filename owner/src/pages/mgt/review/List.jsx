import React, { useEffect, useState } from 'react';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { Table, Button, Rate, Modal, Divider, DatePicker, Typography } from "antd";
import Paging from 'components/pagination/Paging';
import { axiosWithBaseUrl } from 'App';
import styles from '../../../assets/css/pages/mgt/review.module.css';
import { useSelector } from 'react-redux';           //userSlice의 id 값 가져오기

// ==================================|| MgtReview, 후기 리스트 ||================================== //

const { RangePicker } = DatePicker;
//매장 후기 리스트
function MgtReview() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.id); 
  console.log(id);
  const [reviewList, setReviewList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);                       // 현재 페이지
  const [totalItems, setTotalItems] = useState(0);                         // 총 아이템 수
  const [itemsPerPage, setItemsPerPage] = useState(8)                      // 페이지당 아이템 수
  const [modalVisible, setModalVisible] = useState(false);                 // 모달
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState({start:"2010-01-01", end:"2050-01-01"});
  const [selectedType, setSelectedType] = useState("pointDesc");


  useEffect(() => {
    fetchReviewList();                                     // 함수를 호출하여 페이지가 변경될 때마다 고객 목록을 가져옴
  }, [currentPage, selectedDate, selectedType]); 

  const fetchReviewList = () => {
    setLoading(false);
    const currentPageInt = parseInt(currentPage, 10); //  currentPage to an integer
    const requestBody = {
      start: selectedDate.start,                       // selectedDate 객체에서 시작 날짜
      end: selectedDate.end,                           // selectedDate 객체에서 종료 날짜
    };

    axiosWithBaseUrl
    .post(`/owner/reviewList/${selectedType}/${id}/${currentPage}`, requestBody) 
    .then(res => {
      console.log(res.data);
      setReviewList(res.data.content);
      setTotalItems(res.data.totalElements); 
      setItemsPerPage(res.data.pageable.pageSize); 
    })
    .catch(err => { // 오류 처리
      // alert("오류가 발생하였습니다.");
      console.log(err);
      setLoading(false);

    })
  };

  const handleOpenModal = (review) => {
    setSelectedReview(review);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    setModalVisible(false);
  };

  const handleRangePickerChange = (dates, dateStrings) => {
    setSelectedDate({ start: dateStrings[0], end: dateStrings[1] });
    console.log(dateStrings);
    fetchReviewList();                                                    // 날짜 선택 시 리뷰 리스트를 가져옴
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    console.log(type);
     fetchReviewList();    
  };

  const columns = [
    {
      title: "작성일",
      dataIndex: "writeTime",
      key: "writeTime",
      align: 'center',
      render: writeTime => {
        return writeTime.slice(0, 10) + " " + writeTime.slice(11, 19)
      }
    },
    {
      title: "고객명",
      dataIndex: "userName",
      key: "userName",
      align: 'center'
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      align: 'center',
    },
    //보기 -> 내용 모달
    {
      title: "내용",
      dataIndex: "contents",
      key: "contents",
      align: 'center',
      render: (_, record) => (
        <Button onClick={() => handleOpenModal(record)}>
          보기
        </Button>
      )
    },
    {
      title: "별점",
      dataIndex: "point",
      key: "point",
      align: 'center',
      render: point => (
        <Rate disabled value={point} />
      ),
    },
    {
      title: "상태",
      dataIndex: "reviewStatus",
      key: "reviewStatus",
      align: 'center',
    }
  ];


  return (
    <>
    <Typography.Title level={3}>매장 후기 조회</Typography.Title>

    <Divider  orientation="left" orientationMargin="0" style={{ color: 'black', fontWeight: 'bold' ,fontSize: '15px', borderColor: 'white' }}></Divider>
      {/* 날짜 필터 */}
      <RangePicker
          format="YYYY-MM-DD"
          onChange={handleRangePickerChange}
        />
      {/* 내림차순, 오름차순 정렬 */}
      <Button onClick={() => handleTypeChange("pointDesc")}>높은 순</Button>            
      <Button onClick={() => handleTypeChange("pointAsc")}>낮은 순</Button>

      <Divider style={{ marginTop: "30px", fontSize: '18px', fontWeight: 'bold' }}>매장 후기 목록</Divider>

     <Table
        className={styles.reviewTable}
        columns={columns}
        dataSource={reviewList}
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

      {/* 리뷰내용 모달 */}
        <Modal
        visible={modalVisible}
        onCancel={handleCloseModal}
        title="후기 내용"
        footer={null}
      >
        {selectedReview && selectedReview.contents}
      </Modal>
    </>
  );
}

export default MgtReview;