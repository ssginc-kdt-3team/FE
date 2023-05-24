import React, { useEffect, useState } from 'react';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { Table, Button, Rate } from "antd";
import axios from 'axios';
import Paging from 'components/pagination/paging';
import { axiosWithBaseUrl } from 'App';
import ReviewContent from './ReviewContent';
import styles from '../../assets/css/pages/mgt/review.module.css';

function MgtReview() {
  const navigate = useNavigate();

  const [reviewList, setReviewList] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalItems, setTotalItems] = useState(0); // 총 아이템 수
  const [itemsPerPage, setItemsPerPage] = useState(8) // 페이지당 아이템 수

  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "작성일",
      dataIndex: "writeTime",
      key: "writeTime",
      render: writeTime => {
        return writeTime.slice(0, 10) + " " + writeTime.slice(11, 19)
      }
    },
    {
      title: "고객명",
      dataIndex: "userName",
      key: "userName"
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "내용",
      dataIndex: "contents",
      key: "contents",
      // render: contents => (
      //   <ReviewContent data={contents}/>
      // )
    },
    {
      title: "별점",
      dataIndex: "point",
      key: "point",
      render: point => (
        <Rate disabled defaultValue={point} />
      )
    }
  ];

  useEffect(() => {
    // axios.get(`/shop/detail/review/${shopId}/${currentPage}`)   
    axiosWithBaseUrl.get(`/shop/detail/review/1/${currentPage}`) 
    .then(res => {
      console.log(res.data);
      setReviewList(res.data.content);
      setTotalItems(res.data.totalElements); // 총 아이템 수 설정
      setItemsPerPage(res.data.pageable.pageSize); // 페이지당 아이템 수 설정
    })
    .catch(err => { // 오류 처리
      // alert("오류가 발생하였습니다.");
      console.log(err);
    })
  }, [currentPage])

  return (
    <>
      <Table
        className={styles.reviewTable}
        columns={columns}
        dataSource={reviewList}
        pagination={false}
        loading={loading}
        // onRow={row => {
        //   return {
        //     onClick: () => { navigate(`/mgt/menu/detail/${row.id}`) }
        //   }
        // }}
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

export default MgtReview;