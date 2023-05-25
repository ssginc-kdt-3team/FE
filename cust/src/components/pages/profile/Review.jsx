import React, { useEffect, useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import ReviewCard from '../../widget/shop/ReviewCard';
import Paging from '../../ui/Paging';
import axios from 'axios';

const reviewCardWrapStyle = {
  maxWidth: '800px',
  width: '75%'
}

function Review() {

  const [reviewList, setReviewList] = useState();
  
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalItems, setTotalItems] = useState(0); // 총 아이템 수
  const [itemsPerPage, setItemsPerPage] = useState(8) // 페이지당 아이템 수

  useEffect(() => {
    // axios.get(`/shop/detail/review/${loginState.id}/${currentPage}`)
    axios.get(`/shop/detail/review/${1}/${currentPage}`)
    .then(res => {
      console.log(res.data);
      setReviewList(res.data.content);
      setTotalItems(res.data.totalElements); // 총 아이템 수 설정
      setItemsPerPage(res.data.pageable.pageSize); // 페이지당 아이템 수 설정
    })
    .catch(err => { // 오류 처리
      alert("오류가 발생하였습니다.");
      console.log(err);
    })
  }, [currentPage])

  return (
    <div className='container background'>
      <div className='center flex-col'>
        <PageTitle title="후기"/>

        <ul className='flex flex-col flex-gap-40' style={reviewCardWrapStyle}>
          {
            reviewList && reviewList.map( (review, index) => (
              <ReviewCard key={index} data={review}/>
            ))
          }
        </ul>
        
        {/* 페이지 */}
        <Paging currentPage={currentPage} totalItems={totalItems} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage}/>
      </div>

    </div>
  );
}

export default Review;