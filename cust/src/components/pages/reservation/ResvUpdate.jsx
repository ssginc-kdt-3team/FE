import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import dayjs from 'dayjs';
import styles from '../../../assets/css/pages/reservation/ResvAdd.module.css';
import '../../../assets/css/widget/Calendar.css'; // css import
import Counter from '../../widget/reservation/Counter';
import { useNavigate, useParams } from 'react-router-dom';
// import { axiosWithBaseUrl } from '../../../App'
import TimePicker from '../../widget/reservation/TimePicker';
import { blockCalendar } from '../../../utils/reservation/blockCalendar';
import PageTitle from '../../ui/PageTitle';

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

  // 예약 정보 가져오기
  useEffect(() => {
    axios.get(`/customer/reservation/update/${resvId}`)
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
    if(shopId !== null && selectedDate !== null) {
      axios.post('/customer/reservation/possible', {
        shopId: shopId ,
        date: moment(selectedDate).format("YYYY-MM-DD")
      })
      .then(res => {
        console.log(res.data);
        setPossibleTimeList(res.data);
      })
      .catch(err => console.log(err));
    }
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

  // 예약수정 처리
  const handleReserve = () => {
    console.log(resvInfo);

    axios.post(`/customer/reservation/update/${resvId}`, resvInfo)
      .then(res => {
        console.log(res);
        console.log(resvInfo);
        alert('수정이 완료되었습니다.');
        navigate(`/resv/${resvId}`, { replace: true }); // 예약상세 화면으로 이동

      })
      .catch(err => console.log(err))
  }

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title="예약변경"/>

        {/* 지점, 매장 */}
        {/* 지점이랑 매장의 id, 이름 가져와서 option 안에 넣는다 */}
        <form id={styles.resvForm} className='flex flex-col flex-gap-40'>
          <div id={styles.topWrap} className='flex flex-gap-40'>
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
          </div>
        
          <div id={styles.middleWrap} className='grid-2c flex-gap-80'>
            {/* 캘린더 */}
            <Calendar 
              onChange={setSelectedDate} 
              value={selectedDate} 
              next2Label={null}
              prev2Label={null}
              formatDay ={(locale, date) => dayjs(date).format('DD')}
              showNeighboringMonth={false}
              tileDisabled={blockCalendar}
            />

            {/* 상세정보 */}
            <div id={styles.detailWrap} className='flex flex-col flex-gap-40'>
              <div>
                <label>인원 선택</label>
                <div className='flex flex-gap-40'>
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
                </div>
              </div>

              {/* 시간 선택 */}
              <div>
                <label>시간 선택</label>
                <TimePicker 
                  possibleTimeList={possibleTimeList} 
                  defaultValue={selectedTime}
                  setSelectedTime={setSelectedTime} 
                  selectedDate={moment(selectedDate).format("YYYY-MM-DD")}
                />
              </div>

              {/* 요구사항 */}
              <div>
                <label>요구사항 <span>* 100자 이하로 작성해주세요.</span></label>
                <textarea name='memo' type='text' cols={50} rows={3} maxLength="100" ref={memoTextarea} onChange={(e) => setMemo(e.target.value)}></textarea> 
              </div>       

              {/* 시간 선택 */}
              {/* <TimePicker possibleTimeList={possibleTimeList} defaultValue={selectedTime} setSelectedTime={setSelectedTime}/> */}
            </div>
          </div>

          {/* 버튼 */}
          <div id={styles.buttonWrap} className='center width-100 flex-gap-20'>
            <div className='button buttonReverse' onClick={() => navigate(-1)}>취소</div>
            <div className='button' onClick={handleReserve}>완료</div>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default ResvUpdate;