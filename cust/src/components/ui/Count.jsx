import React from 'react';

function Count({title, peopleCount, setPeopleCount, childCount, setChildCount, isPeopleCount}) {
  const handleMinus = () => {
    if(isPeopleCount) { // 예약인원 카운트
      if(peopleCount <= 1) {
        alert("최소 예약인원 수는 1명 입니다.");
        return;
      }
      else if(peopleCount - childCount >= 1) {
        alert("유아가 있을 경우 최소 1명의 성인이 있어야합니다.");
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
        alert("유아가 있을 경우 최소 1명의 성인이 있어야합니다.");
        return;
      }
      setChildCount(childCount + 1);
    };
  }

  return (
    <div className='center flex-gap-10'>
      {title}
      <ion-icon name="remove-outline" onClick={handleMinus}></ion-icon>
      <p>{isPeopleCount ? peopleCount : childCount}</p>
      <ion-icon name="add-outline" onClick={handlePlus}></ion-icon>
    </div>
  );
}

export default Count;