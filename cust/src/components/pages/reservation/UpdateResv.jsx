import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import dayjs from 'dayjs';
import styles from '../../../assets/css/pages/reservation/AddResv.module.css';
import '../../../assets/css/ui/reservation/Calendar.css'; // css import
import Counter from '../../ui/reservation/Counter';
import { useNavigate, useParams } from 'react-router-dom';
import TimePicker from '../../ui/reservation/TimePicker';
import { blockCalendar } from '../../../utils/reservation/blockCalendar';
import PageTitle from '../../ui/PageTitle';
import { Button, Select } from 'antd';
import PayUpdate from '../../modal/reservation/PayUpdate';

const { Option } = Select;

function UpdateResv() {
  const navigate = useNavigate(); // 페이지 이동을 위한 Hook
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

  // const [possibleTimeList, setPossibleTimeList] = useState(null);
  const [selectedTime, setSelectedTime] = useState("00:00:00"); // 선택된 시간

  const [peopleCount, setPeopleCount] = useState(1); // 예약 인원 카운트
  const [childCount, setChildCount] = useState(0); // 유아 수 카운트
  const [payedDeposit, setPayedDeposit] = useState(0); // 지불된 예약금

  const [memo, setMemo] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 예약 정보 가져오기
  useEffect(() => {
    axios.get(`/customer/reservation/update/${resvId}`)
    .then(res => {
      // console.log(res.data);
      setPreviousResvInfo(res.data);
      setResvInfo(prevResvInfo => ({
        ...prevResvInfo,
        branchName: res.data.branchName,
        shopName: res.data.shopName,
      })); // 매장명, 지점명
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

  // useEffect(() => {
  //   console.log('selectedTime : ' + selectedTime);
  // }, [selectedTime])

  useEffect(() => {
    previousResvInfo && setPayedDeposit((parseInt(previousResvInfo.people) - parseInt(previousResvInfo.child)) * 2000);
    // console.log('지불된 예약금: ' + payedDeposit);
  }, [previousResvInfo])

  // 시간, 날짜, 예약인원, 유아 수가 바뀔 때마다 resvInfo 업데이트
  useEffect(() => {
    setResvInfo( prevResvInfo => ({ // setResvInfo 함수를 호출하면 현재의 resvInfo 상태값을 이전 상태값인 prevResvInfo 매개변수로 전달
      ...prevResvInfo, // 기존 값 복사
      reservationDateTime: moment(selectedDate).format("YYYY-MM-DD") + " " + selectedTime,
      people: peopleCount,
      child: childCount,
      memo: memo,
    }))
  }, [selectedDate, selectedTime, peopleCount, childCount, memo])


  return (
    <>
      <div className='container'>
        <div className='center flex-col'>
          <PageTitle title='RESERVATION' phrase='예약 변경'/>

          {/* 지점, 매장 */}
          {/* 지점이랑 매장의 id, 이름 가져와서 option 안에 넣는다 */}
          <form id={styles.resvForm} className='flex flex-col flex-gap-40'>
            <div id={styles.topWrap} className='flex flex-gap-40'>
              {/* 지점 선택 */}
              {
                previousResvInfo && (
                  <Select className='select' bordered={false} size='large' value={previousResvInfo.branchName} disabled>
                    <Option value={previousResvInfo.branchName}>{previousResvInfo.branchName}</Option>
                  </Select>
                )
              }

              {/* 매장 선택 */} 
              {
                previousResvInfo && (
                  <Select className='select' bordered={false} size='large' value={previousResvInfo.shopName} disabled>
                    <Option value={previousResvInfo.shopName}>{previousResvInfo.shopName}</Option>
                  </Select>
                )
              }  
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
                    // possibleTimeList={possibleTimeList}
                    shopId={shopId} 
                    defaultValue={selectedTime}
                    setSelectedTime={setSelectedTime} 
                    selectedDate={moment(selectedDate).format("YYYY-MM-DD")}
                  />
                </div>

                {/* 요구사항 */}
                <div>
                  <label>요구사항 <span>* 100자 이하로 작성해주세요.</span></label>
                  <textarea name='memo' type='text' cols={50} rows={4} maxLength="100" ref={memoTextarea} onChange={(e) => setMemo(e.target.value)}></textarea> 
                </div>
                
              </div>
            </div>

            {/* 버튼 */}
            <div id={styles.buttonWrap} className='center width-100 flex-gap-20'>
              <Button className='button buttonReverse' onClick={() => navigate(-1)}>취소</Button>
              <Button type='primary' className='button' onClick={() => setIsModalOpen(true)}>결제하기</Button>
            </div>
            
          </form>
        </div>
      </div>

      <PayUpdate
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        data={resvInfo} 
        setData={setResvInfo}
        payedDeposit={payedDeposit} 
      />
    </>
  );
}

export default UpdateResv;