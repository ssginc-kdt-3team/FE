import axios from 'axios';
import React, { useState, useEffect, useReducer } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import styles from '../../../assets/css/pages/reservation/ResvAdd.module.css';
import 'react-calendar/dist/Calendar.css'; // css import
import Count from '../../ui/Count';

const initialResvInfo = { // 초기값을 가지는 객체
  reservationDate: "",
  people: 1, 
  child: 0,
  memo: "",
  userId: 2, // 사용자 id
  shopId: 2 // 매장 id
};

function ResvAdd() {
  const [resvInfo, setResvInfo] = useState(initialResvInfo);

  // 선택 상자 처리
  const handleSelect = (e) => {
    setResvInfo({
      ...resvInfo,
      shopId: e.target.value // 매장 id 변경
    })
  }

  // 메모 처리
  const handleInput = (e) => {
    let { name, value } = e.target;

    setResvInfo({
      ...resvInfo,
      [name]: value // 메모 변경
    })
  };

  const [branchList, setBranchList] = useState();
  const [storeList, setStoreList] = useState();

  const [branchId, setBranchId] = useState(1); // 선택된 지점 id
  const [storeId, setStoreId] = useState(); // 선택된 매장 id

  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜

  const [possibleTimeList, setPossibleTimeList] = useState();
  const [selectedTime, setSelectedTime] = useState("00:00"); // 선택된 시간

  const [peopleCount, setPeopleCount] = useState(1); // 예약 인원 카운트
  const [childCount, setChildCount] = useState(0); // 유아 수 카운트

  // 지점 정보, 지점별 매장 정보 가져오기
  useEffect(() => {
    const fetchData = async () => { // async는 함수 앞에 붙여서 해당 함수가 Promise를 반환하는 비동기 함수임을 나타냄
      try {
        const [branchRes, storeRes] = await Promise.all([ // await는 Promise가 실행 될 때까지 대기
          axios.get('http://localhost:8080/branch/all'),
          axios.get(`http://localhost:8080/admin/shop/findAll/${branchId}`)
        ]);
        console.log(branchRes.data);
        console.log(storeRes.data);
        setBranchList(branchRes.data);
        setStoreList(storeRes.data.content);
      }
      catch (err) {
        console.log(err);
      }
    };
  
    fetchData(); // 처음 렌더링 시에도 실행되도록 함
    }, [branchId]); // 지점 정보가 변할 때 마다 리렌더링

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
    setSelectedTime(time);
  }

  // 시간, 날짜, 예약인원, 유아 수가 바뀔 때마다 resvInfo 업데이트
  useEffect(() => {
    setResvInfo({
      ...resvInfo,
      reservationDate: moment(selectedDate).format("YYYY-MM-DD") + " " + selectedTime + ":00",
      people: peopleCount,
      child: childCount
    })
  }, [selectedDate, selectedTime, peopleCount, childCount])

  // 예약하기 처리
  const handleReserve = () => {
    console.log(resvInfo);

    // axios.post('http://localhost:8080/customer/reservation/add', resvInfo)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => console.log(err))
  }

  return (
    <div className='container'>
      {/* 지점, 매장 */}
      {/* 지점이랑 매장의 id, 이름 가져와서 option 안에 넣는다 */}
      <form>
        {/* 지점 선택 */}
        <select onChange={(e) => setBranchId(e.target.value)}>
          {
            branchList && branchList.map( branch => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))
          }
        </select>

        {/* 매장 선택 */}   
        <select onChange={handleSelect}>
          {
            storeList && storeList.map( store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))
          }
        </select>
      
        {/* 캘린더 */}
        <Calendar onChange={setSelectedDate} value={selectedDate}/>

        {/* 상세정보 */}
        {/* 예약 인원 */}
        <Count 
          title='예약 인원' 
          peopleCount={peopleCount} 
          setPeopleCount={setPeopleCount} 
          childCount={childCount} 
          setChildCount={setChildCount} 
          isPeopleCount={true}
        />
        
        {/* 유아 수 */}
        <Count 
          title='유아 수' 
          peopleCount={peopleCount} 
          setPeopleCount={setPeopleCount} 
          childCount={childCount} 
          setChildCount={setChildCount} 
          isPeopleCount={false}
        />

        {/* 요구사항 */}
        <textarea name='memo' type='text' cols={50} rows={10} onChange={handleInput}></textarea>

        {/* 시간 선택 */}
        <div>
          {
            possibleTimeList && possibleTimeList.map( time => (
              <span key={time.id} style={{background: time.possible ? 'white' : 'aqua', marginRight:'20px'}} onClick={() => selectTime(time.time)}>{time.time}</span>
            ))
          }
        </div>

        <div onClick={handleReserve}>완료</div>
      </form>
    </div>
  );
}

export default ResvAdd;