import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import dayjs from 'dayjs';
import styles from '../../../assets/css/pages/reservation/ResvAdd.module.css';
import '../../../assets/css/widget/Calendar.css'; // css import
import Counter from '../../widget/reservation/Counter';
import TimePicker from '../../widget/reservation/TimePicker';
import { blockCalendar } from '../../../utils/reservation/blockCalendar';
import PageTitle from '../../ui/PageTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import Filter from '../../widget/reservation/Filter';
import { Button } from 'antd';

const initialResvInfo = { // 초기값을 가지는 객체
  reservationDate: "",
  people: 1, 
  child: 0,
  memo: "",
  userId: 0, // 사용자 id
  shopId: 0 // 매장 id
};

function ResvAdd() {
  const { state } = useLocation();
  if(state)
    console.log('[넘어온 state] 지점id :' + state.branchId + ' / 매장id : ' + state.shopId);
  
  const [locationState, setLocationState] = useState(state === null ? null : state); // 받아온 state 값을 useState로 관리

  const loginInfo = useRecoilValue(loginState);
  initialResvInfo.userId = loginInfo.id; // 초기값의 userId 설정

  const navigate = useNavigate();
  const [resvInfo, setResvInfo] = useState(initialResvInfo);


  // 메모 처리
  const handleTextArea = (e) => {
    let { name, value } = e.target;
    console.log('name: ' + name + ' / value: ' + value);

    setResvInfo({
      ...resvInfo,
      [name]: value // 메모 변경
    })
  };

  const [branchId, setBranchId] = useState(state ? state.branchId : 1); // 선택된 지점 id, state가 있으면 초기값을 state의 branchId로 설정
  const [shopId, setShopId] = useState(state ? state.shopId : 0); // 선택된 매장 id, state가 있으면 초기값을 state의 shopId로 설정
  initialResvInfo.shopId = shopId; // 초기값의 shopId 설정

  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD")); // 선택된 날짜

  // const [possibleTimeList, setPossibleTimeList] = useState(null);
  const [selectedTime, setSelectedTime] = useState("00:00:00"); // 선택된 시간

  const [peopleCount, setPeopleCount] = useState(1); // 예약 인원 카운트
  const [childCount, setChildCount] = useState(0); // 유아 수 카운트

  // 매장이 바뀌면 지점, 날짜는 그대로
  // 날짜가 바뀌면 지점, 매장은 그대로
  
  // 시간, 날짜, 예약인원, 유아 수, 매장id가 바뀔 때마다 resvInfo 업데이트
  useEffect(() => {
    setResvInfo( prevResvInfo => ({ // setResvInfo 함수를 호출하면 현재의 resvInfo 상태값을 이전 상태값인 prevResvInfo 매개변수로 전달
      ...prevResvInfo, // 기존 값 복사
      reservationDate: moment(selectedDate).format("YYYY-MM-DD") + " " + selectedTime,
      people: peopleCount,
      child: childCount,
      shopId: shopId
    }))
  }, [selectedDate, selectedTime, peopleCount, childCount, shopId])

  // 예약하기 처리
  const handleReserve = () => {
    console.log(resvInfo);
    console.log(resvInfo.reservationDate.slice(11, ));
    if(resvInfo.reservationDate.slice(11, ) === "00:00:00") { // 시간 선택 검증
      alert("시간을 선택하세요.");
      return;
    }

    axios.post('/customer/reservation/add', resvInfo)
    .then(res => {
      console.log(res);
      alert('예약이 등록되었습니다.');
      navigate("/resv", { replace: true });
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title="예약하기"/>

        {/* 지점, 매장 */}
        {/* 지점이랑 매장의 id, 이름 가져와서 option 안에 넣는다 */}
        <form id={styles.resvForm} className='flex flex-col flex-gap-40'>
          <div id={styles.topWrap} className='flex flex-gap-40'>
            <Filter 
              state={locationState} 
              setState={setLocationState}
              branchId={branchId} 
              setBranchId={setBranchId} 
              shopId={shopId} 
              setShopId={setShopId} 
              resvInfo={resvInfo} 
              setResvInfo={setResvInfo}
            />
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
                  shopId={shopId}
                  defaultValue="00:00" 
                  setSelectedTime={setSelectedTime} 
                  selectedDate={moment(selectedDate).format("YYYY-MM-DD")}
                />
              </div>

              {/* 요구사항 */}
              <div>
                <label>요구사항 <span>* 100자 이하로 작성해주세요.</span></label>
                <textarea name='memo' type='text' cols={50} rows={3} maxLength="100" onChange={handleTextArea}></textarea>
              </div>

            </div>
          </div>

          {/* 버튼 */}
          <div id={styles.buttonWrap} className='center width-100 flex-gap-20'>
            <Button className='button buttonReverse' onClick={() => navigate(-1)}>취소</Button>
            <Button type='primary' className='button' onClick={handleReserve}>완료</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResvAdd;