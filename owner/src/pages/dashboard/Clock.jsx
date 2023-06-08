import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div  style={{ textAlign: 'center' }} >
      <h3>현재시간</h3>
      <span style={{ fontSize: '24px' }}>{time.toLocaleTimeString()}</span>
    </div>
  );
};

export default Clock;