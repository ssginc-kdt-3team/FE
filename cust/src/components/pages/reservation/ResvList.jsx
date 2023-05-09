import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from '../../../assets/css/pages/reservation/ResvList.module.css';
import PageTitle from '../../ui/PageTitle';
import ResvCard from '../../ui/ResvCard';

function ResvList() {
  const [resvList, setResvList] = useState(null);

  // 사용자 예약 내역 호출
  // 첫 렌더링 때 데이터 가져온다
  useEffect(() => {
    axios.get('http://localhost:8080/customer/reservation/listAll/2')
    .then(res => {
      console.log(res.data.content);
      setResvList(res.data.content.reverse()); // 최신 순으로 정렬
    })
    .catch(err => console.log(err))
  }, []);

  return (
    <div className='container background'>
      <div className='center flex-col'>
        <PageTitle title="예약 내역" fontSize="1.6rem" marginTop="80px" marginBottom="100px"/>

        <ul id={styles.list} className='grid-2c'>
          {
            resvList && resvList.map( data => (
              // <li key={data.id}>{data.name}</li>
              <ResvCard key={data.id} data={data}/>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default ResvList;