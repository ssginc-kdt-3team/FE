import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from '../../../assets/css/pages/reservation/ResvList.module.css';
import PageTitle from '../../ui/PageTitle';
import ResvCard from '../../ui/ResvCard';
import Paging from '../../ui/Paging';

function ResvList() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalItems, setTotalItems] = useState(0); // 총 아이템 수
  const [itemsPerPage, setItemsPerPage] = useState(8) // 페이지당 아이템 수
  // let totalPage = 0;
  const [resvList, setResvList] = useState(null);

  // 사용자 예약 내역 호출
  // 첫 렌더링 때 데이터 가져온다
  useEffect(() => {
    axios.get(`http://localhost:8080/customer/reservation/listAll/2/${currentPage}`) // 2는 사용자 id
    .then(res => {
      console.log(res.data);
      setResvList(res.data.content); // 최신 순으로 정렬
      setTotalItems(res.data.totalElements); // 총 아이템 수 설정
      setItemsPerPage(res.data.numberOfElements); // 페이지당 아이템 수 설정
    })
    .catch(err => console.log(err))
  }, [currentPage]);

  console.log(totalItems)
  return (
    <div className='container background'>
      <div className='center flex-col'>
        <PageTitle title="예약 내역" fontSize="1.6rem" marginTop="40px" marginBottom="60px"/>

        <ul id={styles.list} className='grid-2c'>
          {
            resvList && resvList.map( data => (
              // <li key={data.id}>{data.name}</li>
              <ResvCard key={data.id} data={data}/>
            ))
          }
        </ul>

        <Paging currentPage={currentPage} totalItems={totalItems} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} setResvList={setResvList}/>
      </div>
    </div>
  );
}

export default ResvList;