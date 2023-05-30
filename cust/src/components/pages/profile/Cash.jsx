import React, { useEffect, useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import axios from 'axios';
import Paging from '../../ui/Paging';
import CashInfoCard from '../../ui/profile/CashInfoCard';
import { Button } from 'antd';
import TypeFilter from '../../ui/profile/TypeFilter';
import DateFilter from '../../ui/profile/DateFilter';
import SelectChargeOption from '../../modal/SelectChargeOption';

const Ul = styled.ul`
  max-width: 800px;
  width: 75%;
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const Div = styled.div`
  max-width: 800px;
  width: 75%;
  margin-bottom: 16px;
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const buttonStyle = {
  marginBottom: '65px',
  float: 'right'
};


function Cash() {
  const loginInfo = useRecoilValue(loginState);

  const [cashList, setCashList] = useState(null);
  
  const [type, setType] = useState('all'); // all / get / lost
  const [dateRange, setDateRange] = useState(12); // 12 / 1 / 3 / 6
  
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalItems, setTotalItems] = useState(0); // 총 아이템 수
  const [itemsPerPage, setItemsPerPage] = useState(8) // 페이지당 아이템 수

  const [remainedCash, setRemainedCash] = useState('0'); // 충전금 현황
  
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  // 충전금 내역 가져오기
  useEffect(() => {
    console.log('type: ' + type + ' / dateRange: ' + dateRange);
    // axios.get(`/customer/review/all/${loginInfo.id}/${currentPage}`)
    axios.get(`/customer/charge/list/${loginInfo.id}/${type}/${dateRange}/${currentPage}`)
    .then(res => {
      console.log(res.data);
      setCashList(res.data.content);
      setTotalItems(res.data.totalElements); // 총 아이템 수 설정
      setItemsPerPage(res.data.pageable.pageSize); // 페이지당 아이템 수 설정
    })
    .catch(err => { // 오류 처리
      console.log(err);
      alert("오류가 발생하였습니다.");
    })
  }, [loginInfo.id, type, dateRange, currentPage])

  // 충전금 현황 가져오기
  useEffect(() => {
    // axios.get(`/customer/charge/check/${2}`)
    axios.get(`/customer/charge/check/${loginInfo.id}`)
    .then(res => {
      console.log(res);
      setRemainedCash(res.data.value);
    })
    .catch(err => { // 오류 처리
      console.log(err);
      alert(err.response.data.error);
    })
  }, [loginInfo.id])

  return (
    <>
      <div className='container'>
        <div className='center flex-col'>
          <PageTitle title={remainedCash.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} type="cash"/>
          <div className='flex flex-gap-10'>
            <Button className='button buttonReverse button-s' onClick={() => setIsModalOpen(true)} style={buttonStyle}>충전하기</Button>
            <Button type='primary' className='button button-s' style={buttonStyle}>환불</Button>
          </div>
          
          <Div className='space-between'>
            <TypeFilter type={type} setType={setType} setCurrentPage={setCurrentPage}/>
            <DateFilter dateRange={dateRange} setDateRange={setDateRange} setCurrentPage={setCurrentPage}/>
          </Div>
          <Ul className='flex flex-col' style={{ borderTop: '1px solid var(--input-border)' }}>
            {
              cashList && cashList.map( cash => (
                <CashInfoCard key={cash.id} data={cash}/>
              ))
            }
          </Ul>
      
          {/* 페이지 */}
          <Paging currentPage={currentPage} totalItems={totalItems} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage}/>
        </div>
      </div>

      {/* 충전하기 모달 */}
      <SelectChargeOption isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </>
  );
}

export default Cash;