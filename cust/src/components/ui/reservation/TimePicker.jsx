import React, { useEffect, useState } from 'react';
import styles from '../../../assets/css/ui/reservation/TimePicker.module.css';
import TimeBtn from '../../ui/reservation/TimeBtn';
import axios from 'axios';
import moment from 'moment';

function TimePicker({shopId, defaultValue, setSelectedTime, selectedDate}) {
  const [possibleTimeList, setPossibleTimeList] = useState(null);
  
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(defaultValue); // defaultValue를 최신값으로 설정
  }, [defaultValue])

  // console.log('넘어온 defaultValue : ' + defaultValue);
  // console.log('selectedOption : ' + selectedOption);

  // const onChange = (value) => {
  //   console.log(`선택된 시간값: ${value}`);
    // console.log(moment(new Date()).format("HH:mm:SS"));
  // };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    setSelectedTime(value);
    
    // if (onChange) {
    //   onChange(value);
    // }
  };
  
  // 매장별 예약 가능 시간 정보 가져오기
  useEffect(() => {
    if(shopId > 0) { // shopId가 유효하다면
      axios.post('/customer/reservation/possible', {
        shopId: shopId,
        date: moment(selectedDate).format("YYYY-MM-DD")
      })
      .then(res => {
        // console.log(res.data);
        setPossibleTimeList(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    }
  }, [shopId, selectedDate]);

  return (
    <div id={styles.radioWrap} className='flex flex-col flex-gap-20'>
      <div id={styles.amWrap} className='grid-5c flex-gap-5'>
        {
          possibleTimeList && possibleTimeList.map( time => 
            time.time < "12:00:00" // 오전이면
            ? (
              <TimeBtn key={time.id} time={time} selectedOption={selectedOption} handleOptionChange={handleOptionChange} selectedDate={selectedDate}/>
            )
            : ''
          )
        }
      </div>

      <div id={styles.fmWrap} className='grid-5c flex-gap-5'>
        {
          possibleTimeList && possibleTimeList.map( time => 
            time.time >= "12:00:00" // 오후면
            ? (
              <TimeBtn key={time.id} time={time} selectedOption={selectedOption} handleOptionChange={handleOptionChange} selectedDate={selectedDate}/>
            )
            : ''
          )
        }
      </div>
    </div>
  );
}

export default TimePicker;