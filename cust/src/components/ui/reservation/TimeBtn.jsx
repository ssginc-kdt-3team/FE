import React from 'react';
import moment from 'moment';
import styles from '../../../assets/css/widget/reservation/TimePicker.module.css';

function TimeBtn({time, selectedOption, handleOptionChange, selectedDate}) {
  // const date = moment(new Date()).format("YYYY-MM-DD"); // 오늘 날짜
  const dateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:SS"); // 현재 시간
  
  // console.log(selectedDate + " " + time.time)
  // console.log(dateTime)
  // console.log((selectedDate + " " + time.time) <= dateTime)
  return (
    <label 
      key={time.id} 
      className={`center ${styles.radioButton} ${selectedOption === time.time ? styles.selected : ''}`} 
      style={!time.possible || selectedDate + " " + time.time <= dateTime ? { opacity: '0.25' } : {}}
    >
      <input
        type="radio"
        name={time.time}
        value={time.time}
        checked={selectedOption === time.time}
        onChange={handleOptionChange}
        disabled={!time.possible || selectedDate  + " " + time.time <= dateTime} // 예약 불가능하거나 현재 시간보다 뒤이면 비활성화
      />
      {time.time.slice(0, 5)}
    </label>
  );
}

export default TimeBtn;