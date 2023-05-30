import React from 'react';
import styles from '../../../assets/css/ui/reservation/TimePicker.module.css';

function CashBtn({value, selectedOption, handleOptionChange}) {
  // console.log('selectedDate : ' + selectedDate);
  // console.log('selectedOption : ' + selectedOption);
  // console.log(time.time)
  // console.log(dateTime)
  // console.log((selectedDate + " " + time.time) <= dateTime)
  return (
    <label className={`center ${styles.radioButton} ${selectedOption === value ? styles.selected : ''}`}>
      <input
        type="radio"
        name="cash"
        value={value}
        checked={selectedOption === value}
        onChange={handleOptionChange}
      />
      {value}
    </label>
  );
}

export default CashBtn;