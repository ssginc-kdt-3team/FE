import React from 'react';
import plus from '../../assets/images/icons/plus.png';
import minus from '../../assets/images/icons/minus.png';

function Count({title, peopleCount, setPeopleCount, childCount, setChildCount, isPeopleCount}) {
  const handleMinus = () => {
    if(isPeopleCount) { // 예약인원 카운트
      if(peopleCount <= 1) {
        alert("최소 예약인원 수는 1명 입니다.");
        return;
      }
      else if(peopleCount - childCount <= 1) {
        alert("유아의 수는 예약인원 수보다 많을 수 없습니다.");
        return;
      }
      setPeopleCount(peopleCount - 1);
    }
    else { // 유아 수 카운트
      if(childCount <= 0) {
        alert("최소 유아 수는 0명 입니다.");
        return;
      }
      setChildCount(childCount - 1);
    };
  }
  
  const handlePlus = () => {
    if(isPeopleCount) { // 예약인원 카운트
      setPeopleCount(peopleCount + 1);
    }
    else { // 유아 수 카운트
      if(peopleCount - childCount <= 1) {
        alert("유아의 수는 예약인원 수보다 많을 수 없습니다.");
        return;
      }
      setChildCount(childCount + 1);
    };
  }

  const buttonStyle = {
    width: '20px', 
    height: '20px', 
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    color: 'var(--main)',
    cursor: 'pointer'
  };


  return (
    <div className='flex flex-gap-10' style={{alignItems: 'center'}}>
      {title}
      <ion-icon name="remove" onClick={handleMinus} style={{...buttonStyle, marginLeft: '10px'}}></ion-icon>
      {/* <div onClick={handleMinus} style={{...buttonStyle, backgroundImage: `url(${minus})`, marginLeft: '10px'}}></div> */}
      <p style={{width: '20px', fontSize: '18px', textAlign: 'center'}}>{isPeopleCount ? peopleCount : childCount}</p>
      {/* <div onClick={handlePlus} style={{...buttonStyle, backgroundImage: `url(${plus})`}}></div> */}
      <ion-icon name="add" onClick={handlePlus} style={buttonStyle}></ion-icon>
    </div>
  );
}

export default Count;