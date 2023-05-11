// import axios from 'axios';
import React, { useState, useEffect, useReducer } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import styles from '../../../assets/css/pages/reservation/ResvAdd.module.css';
import 'react-calendar/dist/Calendar.css'; // css import
import Counter from '../../ui/Counter';
import { axiosWithBaseUrl } from '../../../App'

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
    setResvInfo({ // 예약 정보 업데이트
      ...resvInfo,
      shopId: e.target.value
    })

    setShopId(e.target.value); // 매장 id 변경
  }

  // 메모 처리
  const handleTextArea = (e) => {
    let { name, value } = e.target;

    setResvInfo({
      ...resvInfo,
      [name]: value // 메모 변경
    })
  };

  const [branchList, setBranchList] = useState(null);
  const [shopList, setShopList] = useState(null);

  const [branchId, setBranchId] = useState(1); // 선택된 지점 id
  const [shopId, setShopId] = useState(1); // 선택된 매장 id

  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜

  const [possibleTimeList, setPossibleTimeList] = useState(null);
  const [selectedTime, setSelectedTime] = useState("00:00:00"); // 선택된 시간

  const [peopleCount, setPeopleCount] = useState(1); // 예약 인원 카운트
  const [childCount, setChildCount] = useState(0); // 유아 수 카운트

  // 지점 정보, 지점별 매장 정보 가져오기
  useEffect(() => {
    const fetchData = async () => { // async는 함수 앞에 붙여서 해당 함수가 Promise를 반환하는 비동기 함수임을 나타냄
      try {
        const [branchRes, shopRes, possibleTimeListRes] = await Promise.all([ // await는 Promise가 실행 될 때까지 대기
          axiosWithBaseUrl.get('/branch/all'),
          axiosWithBaseUrl.get(`/branch/shops/${branchId}`),
          axiosWithBaseUrl.post('/customer/reservation/possible', {
            shopId: shopId,
            date: moment(selectedDate).format("YYYY-MM-DD")
          })
        ]);
        console.log(branchRes.data);
        console.log(shopRes.data);
        setBranchList(branchRes.data);
        setShopList(shopRes.data);
        setPossibleTimeList(possibleTimeListRes.data);
      }
      catch (err) {
        console.log(err);
      }
    };
  
    fetchData(); // 처음 렌더링 시에도 실행되도록 함
    }, [branchId, shopId, selectedDate]); // 지점 정보가 변할 때 마다 리렌더링

    // 지점이 바뀌면 매장 id를 1로 설정한다
    useEffect(() => {
      setShopId(1);
    }, [branchId])

  // 시간 정보 가져오기
  // useEffect(() => {
  //   axiosWithBaseUrl.post(`/customer/reservation/possible`, {
  //     shopId: shopId,
  //     date: moment(selectedDate).format("YYYY-MM-DD")
  //   })
  //   .then(res => {
  //     console.log(res.data);
  //     setPossibleTimeList(res.data);
  //   })
  //   .catch(err => console.log(err));
  // }, [shopId, selectedDate])

  
  // 달력 block
  const tileDisabled = ({ date }) => {
    // const currentDate = new Date(2023, 4, 14, 15, 30, 0);
    const currentDate = new Date(); // 오늘 날짜
    const currentMonth = currentDate.getMonth(); // 이번 달

    const firstDateOfCurrentMonth = new Date(currentDate.getFullYear(), currentMonth, 1); // 이번 달 1일
    const middleDateOfCurrentMonth = new Date(currentDate.getFullYear(), currentMonth, 15); // 이번 달 15일
    const middleDateOfNextMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 15); // 다음 달 15일
    const lastDateOfNextMonth = new Date(currentDate.getFullYear(), currentMonth + 2, 0); // 다음 달 마지막 날

    let minSelectableDate, maxSelectableDate;

    if (currentDate < middleDateOfCurrentMonth) { // 1일 ~ 14일 사이이면 예약 가능 범위는
      minSelectableDate = firstDateOfCurrentMonth; // 이번 달 1일 부터
      maxSelectableDate = middleDateOfNextMonth; // 다음 달 15일까지
    }
    else { // 15일 ~ 말일 사이라면 예약 가능 범위는
      minSelectableDate = middleDateOfCurrentMonth; // 이번 달 15일 부터
      maxSelectableDate = lastDateOfNextMonth; // 다음 달 마지막 날까지
    }
    
    return date < minSelectableDate || date > maxSelectableDate || date < currentDate; // 범위에서 벗어나고 현재 일 보다 이전은 선택 불가능
  };

  // 시간, 날짜, 예약인원, 유아 수가 바뀔 때마다 resvInfo 업데이트
  useEffect(() => {
    setResvInfo( prevResvInfo => ({ // setResvInfo 함수를 호출하면 현재의 resvInfo 상태값을 이전 상태값인 prevResvInfo 매개변수로 전달
      ...prevResvInfo, // 기존 값 복사
      reservationDate: moment(selectedDate).format("YYYY-MM-DD") + " " + selectedTime,
      people: peopleCount,
      child: childCount
    }))
  }, [selectedDate, selectedTime, peopleCount, childCount])

  // 예약하기 처리
  const handleReserve = () => {
    console.log(resvInfo);

    axiosWithBaseUrl.post('/customer/reservation/add', resvInfo)
      .then(res => {
        console.log(res);
        alert('예약이 등록되었습니다.');
      })
      .catch(err => console.log(err))
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
            shopList && shopList.map( shop => (
              <option key={shop.id} value={shop.id}>{shop.name}</option>
            ))
          }
        </select>
      
        {/* 캘린더 */}
        <Calendar onChange={setSelectedDate} value={selectedDate} tileDisabled={tileDisabled}/>

        {/* 상세정보 */}
        {/* 예약 인원 */}
        <Counter
          title='예약 인원' 
          peopleCount={peopleCount} 
          setPeopleCount={setPeopleCount} 
          childCount={childCount} 
          setChildCount={setChildCount} 
          isPeopleCount={true}
        />
        
        {/* 유아 수 */}
        <Counter 
          title='유아' 
          peopleCount={peopleCount} 
          setPeopleCount={setPeopleCount} 
          childCount={childCount} 
          setChildCount={setChildCount} 
          isPeopleCount={false}
        />

        {/* 요구사항 */}
        <textarea name='memo' type='text' cols={50} rows={3} maxlength="100" onChange={handleTextArea}></textarea>

        {/* 시간 선택 */}
        <div>
          {
            possibleTimeList && possibleTimeList.map( time => (
              <button 
                type="button" 
                key={time.id} 
                onClick={() => setSelectedTime(time.time)} 
                disabled={!time.possible}
              >
                {time.time.slice(0, 5)}
              </button>
            ))
          }
        </div>

        <div onClick={handleReserve}>완료</div>
      </form>
    </div>
  );
}

export default ResvAdd;