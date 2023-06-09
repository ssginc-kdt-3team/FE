import React, { useState } from 'react';
import Calendar from 'react-calendar';
import  '../../assets/css/pages/main/calendar.css';

function MainCalendar() {
  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜

  return (
    <div>
    <Calendar 
        onChange={onChange} 
        value={value}
        formatShortWeekday={(locale, date) => ''}
        />
    </div>
  );
}

export default MainCalendar;