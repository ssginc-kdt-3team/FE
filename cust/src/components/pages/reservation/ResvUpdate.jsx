// import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import styles from '../../../assets/css/pages/reservation/ResvUpdate.module.css';
import 'react-calendar/dist/Calendar.css'; // css import
import Counter from '../../ui/Counter';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosWithBaseUrl } from '../../../App'
import TimePicker from '../../ui/TimePicker';
import { blockCalendar } from '../../../utils/reservation/blockCalendar';

function ResvUpdate() {
  const { resvId } = useParams();
  
  const [resvInfo, setResvInfo] = useState({
    reservationId: resvId,
    branchName: "",
    shopName: "",
    reservationDateTime: "",
    people: 0,
    child: 0,
    memo: ""
  }); // 백엔드로 넘겨줄 객체

  const memoTextarea = useRef(null); // Textarea

  const [previousResvInfo, setPreviousResvInfo] = useState(null); // 이전 데이터
  const [shopId, setShopId] = useState(null); // 매장id

  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜

  const [possibleTimeList, setPossibleTimeList] = useState(null);
  const [selectedTime, setSelectedTime] = useState("00:00:00"); // 선택된 시간

  const [peopleCount, setPeopleCount] = useState(1); // 예약 인원 카운트
  const [childCount, setChildCount] = useState(0); // 유아 수 카운트

  const [memo, setMemo] = useState('');
  
  const navigate = useNavigate(); // 페이지 이동을 위한 Hook

  // 지점 정보 가져오기
  useEffect(() => {
    axiosWithBaseUrl.get(`/customer/reservation/update/${resvId}`)
    .then(res => {
      console.log(res.data);
      setPreviousResvInfo(res.data);
      setShopId(res.data.shopId);
      setSelectedDate(res.data.reservationDateTime.split(" ")[0]); // 날짜
      setSelectedTime(res.data.reservationDateTime.split(" ")[1]); // 시간
      setPeopleCount(res.data.people); // 예약인원
      setChildCount(res.data.child); // 유아 수
      setMemo(res.data.memo); // 메모
      memoTextarea.current.value = res.data.memo; // 메모 데이터 TextArea에 뿌린다
    })
    .catch(err => {
      console.log(err);
    });
  }, [resvId])

  // 시간 정보 가져오기
  useEffect(() => {
    axiosWithBaseUrl.post('/customer/reservation/possible', {
      shopId: shopId ,
      date: moment(selectedDate).format("YYYY-MM-DD")
    })
    .then(res => {
      console.log(res.data);
      setPossibleTimeList(res.data);
    })
    .catch(err => console.log(err));
  }, [shopId, selectedDate]);

  // 시간, 날짜, 예약인원, 유아 수가 바뀔 때마다 resvInfo 업데이트
  useEffect(() => {
    setResvInfo( prevResvInfo => ({ // setResvInfo 함수를 호출하면 현재의 resvInfo 상태값을 이전 상태값인 prevResvInfo 매개변수로 전달
      ...prevResvInfo, // 기존 값 복사
      reservationDateTime: moment(selectedDate).format("YYYY-MM-DD") + " " + selectedTime,
      people: peopleCount,
      child: childCount,
      memo: memo
    }))
  }, [selectedDate, selectedTime, peopleCount, childCount, memo])

  // 예약하기 처리
  const handleReserve = () => {
    console.log(resvInfo);

    // axiosWithBaseUrl.post(`/customer/reservation/update/${resvId}`, resvInfo)
    //   .then(res => {
    //     console.log(res);
    //     alert('수정이 완료되었습니다.');
    //     navigate(`/resv/${resvId}`); // 예약상세 화면으로 이동

    //   })
    //   .catch(err => console.log(err))
  }

  return (
    <div className='container'>
      {/* 지점, 매장 */}
      {/* 지점이랑 매장의 id, 이름 가져와서 option 안에 넣는다 */}
      <form>
        {/* 지점 선택 */}
        <select disabled>
          {
            previousResvInfo && (<option value={previousResvInfo.branchName} selected>{previousResvInfo.branchName}</option>)
          }          
        </select>

        {/* 매장 선택 */}   
        <select disabled>
          {
            previousResvInfo && (<option value={previousResvInfo.shopName} selected>{previousResvInfo.shopName}</option>)
          }
        </select>
      
        {/* 캘린더 */}
        <Calendar onChange={setSelectedDate} value={selectedDate} tileDisabled={blockCalendar}/>

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
        <textarea name='memo' type='text' cols={50} rows={3} maxlength="100" ref={memoTextarea} onChange={(e) => setMemo(e.target.value)}></textarea>        

        {/* 시간 선택 */}
        <TimePicker possibleTimeList={possibleTimeList} defaultValue={selectedTime} setSelectedTime={setSelectedTime}/>

        <div onClick={handleReserve}>완료</div>
      </form>
    </div>
  );
}

export default ResvUpdate;