import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from '../../../assets/css/pages/reservation/ResvList.module.css';
import PageTitle from '../../ui/PageTitle';
import ResvCard from '../../ui/reservation/ResvCard';
import Paging from '../../ui/Paging';
import { axiosWithToken } from '../../../index';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';

function ResvList({isActiveList}) {
  const loginInfo = useRecoilValue(loginState);
  const userId = loginInfo.id;

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalItems, setTotalItems] = useState(0); // 총 아이템 수
  const [itemsPerPage, setItemsPerPage] = useState(8) // 페이지당 아이템 수
  // let totalPage = 0;
  const [resvList, setResvList] = useState(null);

  // 사용자 예약 내역 호출
  // 첫 렌더링 때 데이터 가져온다
  useEffect(() => {
    axiosWithToken.get(`/customer/reservation/${isActiveList ? 'listActive' : 'listAll'}/${userId}/${currentPage}`) // 2는 사용자 id
    .then(res => {
      console.log(res.data);
      setResvList(res.data.content); // 
      setTotalItems(res.data.totalElements); // 총 아이템 수 설정
      setItemsPerPage(res.data.pageable.pageSize); // 페이지당 아이템 수 설정
    })
    .catch(err => console.log(err))
  }, [isActiveList, userId, currentPage]);

  console.log(totalItems);
  return (
    <div className='container background'>
      <div className='center flex-col'>
        <PageTitle title="예약 내역"/>

        <ul id={styles.list} className='flex flex-col flex-gap-40'>
          {
            resvList && resvList.map( data => (
              <ResvCard key={data.reservationId} data={data}/>
            ))
          }
        </ul>

        <Paging currentPage={currentPage} totalItems={totalItems} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage}/>
      </div>
    </div>
  );
}

export default ResvList;