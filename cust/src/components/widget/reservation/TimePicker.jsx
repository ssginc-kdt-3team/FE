import React, { useState } from 'react';
import styles from '../../../assets/css/widget/reservation/TimePicker.module.css';
import TimeBtn from '../../ui/reservation/TimeBtn';

function TimePicker({possibleTimeList, defaultValue, setSelectedTime, selectedDate}) {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const onChange = (value) => {
    console.log(`선택된 시간값: ${value}`);
    // console.log(moment(new Date()).format("HH:mm:SS"));
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    setSelectedTime(value);
    if (onChange) {
      onChange(value);
    }
  };

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