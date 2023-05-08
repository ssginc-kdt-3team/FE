import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import styles from '../../../assets/css/pages/reservation/ResvAdd.module.css';
import 'react-calendar/dist/Calendar.css'; // css import

function ResvAdd() {
  const [branchList, setBranchList] = useState();
  const [storeList, setStoreList] = useState();

  const [branchId, setBranchId] = useState(1); // 선택된 지점 id
  const [storeId, setStoreId] = useState(); // 선택된 매장 id

  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜

  const [possibleTimeList, setPossibleTimeList] = useState();
  const [selecteTime, setSelectedTime] = useState("00:00"); // 선택된 시간

  // 지점 정보 가져오기
  useEffect(() => {

  }, [])
  
  // 매장 정보 가져오기
  useEffect(() => {
    axios.get(`http://localhost:8080/admin/shop/findAll/${branchId}`)
    .then(res => {
      console.log(res);
      setStoreList(res.data.content);
    })
    .catch(err => {
      console.log(err);
    });

  }, [branchId])

  // 시간 정보 가져오기
  useEffect(() => {
    axios.get(`http://localhost:3001/possible`)
    .then(res => {
      console.log(res.data);
      setPossibleTimeList(res.data);
    })
    .catch(err => console.log(err));
  }, [])
  
  // 시간 선택
  const selectTime = (time) => {
    console.log(time);
  }

  // 예약하기 처리
  const handleReserve = () => {

  }

  return (
    <div className='container'>
      {/* 지점, 매장 */}
      {/* 지점이랑 매장의 id, 이름 가져와서 option 안에 넣는다 */}
      <form>
        {/* 지점 선택 */}
        <select>
          <option></option>
        </select>

        {/* 매장 선택 */}   
        <select>
          {
            storeList && storeList.map( store => (
              <option key={store.id} selectedDate={store.id}>{store.name}</option>
            ))
          }
        </select>
      </form>

      {/* 캘린더 */}
      <Calendar onChange={setSelectedDate} selectedDate={selectedDate} />
      <input name='' type='date' value={moment(selectedDate).format("YYYY-MM-DD")}/>

      {/* 상세정보 */}
      <form>
        {/* 예약 인원 */}
        <input name='' type='' />
        
        {/* 유아 수 */}
        <input name='' type='' />

        {/* 요구사항 */}
        <textarea name='' type='text' cols={50} rows={10}></textarea>
      </form>

      {/* 시간 선택 */}
      <div>
        {
          possibleTimeList && possibleTimeList.map( time => (
            <span key={time.id} style={{background: time.possible ? 'white' : 'aqua', marginRight:'20px'}} onClick={() => selectTime(time.time)}>{time.time}</span>
          ))
        }
      </div>

      <div onClick={() => handleReserve}>완료</div>
    </div>
  );
}

export default ResvAdd;