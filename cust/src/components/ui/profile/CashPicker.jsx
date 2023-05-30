import React from 'react';
import styles from '../../../assets/css/ui/reservation/TimePicker.module.css';
import CashBtn from './CashBtn';

function CashPicker({selectedOption, setSelectedOption}) {
  const onChange = (value) => {
    console.log(`선택된 충전금: ${value}`);
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div id={styles.amWrap} className='grid-3c flex-gap-5'>
      <CashBtn value='5000' selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>
      <CashBtn value='10000' selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>
      <CashBtn value='20000' selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>
      <CashBtn value='30000' selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>
      <CashBtn value='40000' selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>
      <CashBtn value='50000' selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>
    </div>
  );
}

export default CashPicker;