import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import PageTitle from '../../ui/PageTitle';
import { cashFormat } from '../../../utils/format';
import { Button } from 'antd';
import TypeFilter from '../../ui/profile/TypeFilter';
import DateFilter from '../../ui/profile/DateFilter';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import Paging from '../../ui/Paging';
import axios from 'axios';
import CashPointInfoCard from '../../ui/profile/CashPointInfoCard';

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

function Point() {
  const loginInfo = useRecoilValue(loginState);

  const [pointList, setPointList] = useState(null);
  
  const [type, setType] = useState('all'); // all / get / lost
  const [dateRange, setDateRange] = useState(12); // 12 / 1 / 3 / 6
  
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalItems, setTotalItems] = useState(0); // 총 아이템 수
  const [itemsPerPage, setItemsPerPage] = useState(8) // 페이지당 아이템 수

  const [remainedPoint, setRemainedPoint] = useState('0'); // 충전금 현황

  // 포인트 내역 가져오기
  useEffect(() => {
    console.log('type: ' + type + ' / dateRange: ' + dateRange);
    // axios.get(`/customer/review/all/${loginInfo.id}/${currentPage}`)
    axios.get(`/customer/point/list/${loginInfo.id}/${type}/${dateRange}/${currentPage}`)
    .then(res => {
      console.log(res.data);
      setPointList(res.data.content);
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
    axios.get(`/customer/point/check/${loginInfo.id}`)
    .then(res => {
      console.log(res);
      setRemainedPoint(res.data.value);
    })
    .catch(err => { // 오류 처리
      console.log(err);
      alert(err.response.data.error);
    })
  }, [loginInfo.id])

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title={cashFormat(remainedPoint)} type="point"/>
        
        {/* 필터 */}
        <Div className='space-between'>
          <TypeFilter type={type} setType={setType} setCurrentPage={setCurrentPage}/>
          <DateFilter dateRange={dateRange} setDateRange={setDateRange} setCurrentPage={setCurrentPage}/>
        </Div>

        {/* 총 개수, 조회 기간 */}
        <Div className='space-between box' style={{ paddingTop: '16px', border: '1px solid var(--input-border)' }}>
          <div>총 <span style={{ color: 'var(--main)', fontWeight: '500' }}>{totalItems}</span>개</div>
          <span>{moment(new Date()).clone().subtract(dateRange, 'month').format("YYYY-MM-DD")} ~ {moment(new Date()).format("YYYY-MM-DD")}</span>
        </Div>

        {/* 리스트 */}
        <Ul className='flex flex-col' style={{ borderTop: '0px solid var(--input-border)' }}>
          {
            pointList && pointList.map( point => (
              <CashPointInfoCard key={point.id} data={point} remained={remainedPoint} isCash={false}/>
            ))
          }
        </Ul>
    
        {/* 페이지 */}
        <Paging currentPage={currentPage} totalItems={totalItems} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage}/>
      </div>
    </div>
  );
}

export default Point;