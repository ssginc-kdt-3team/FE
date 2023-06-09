import React, { useState } from 'react';
import Calendar from 'react-calendar';
import  '../../assets/css/pages/main/calendar.css';
import dayjs from 'dayjs';

// ==================================|| 메인4. 달력 ||================================== //

function MainCalendar() {
  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜

  return (
    <div>
    <Calendar 
        onChange={onChange} 
        value={value}
        formatDay ={(locale, date) => dayjs(date).format('DD')}
        /> 
    </div>
  );
}

export default MainCalendar;