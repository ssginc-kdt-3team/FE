import { Radio } from 'antd';
import React from 'react';
import styles from '../../../../assets/css/ui/profile/cash/TypeFilter.module.css'

function TypeFilter({type, setType, setCurrentPage}) {
  const handleTypeRadio = (e) => {
    console.log(e.target.value);
    setType(e.target.value);
    setCurrentPage(1); // 페이지 1번으로
    // console.log('type: ' + e.target.value);
  };

  return (
    <Radio.Group id={styles.radioWrap} className='box' value={type} buttonStyle="solid" size="large" onChange={handleTypeRadio} style={{ padding: 0 }}>
      <Radio.Button value="all" style={ type === 'all' ? { background: 'var(--main)', color: '#fff', borderColor: 'var(--main)' } : {} }>전체</Radio.Button>
      <Radio.Button value="get" style={ type === 'get' ? { background: 'var(--main)', color: '#fff',borderColor: 'var(--main)' } : {} }>충전</Radio.Button>
      <Radio.Button value="lost" style={ type === 'lost' ? { background: 'var(--main)', color: '#fff',borderColor: 'var(--main)' } : {} }>사용</Radio.Button>
    </Radio.Group>
  );
}

export default TypeFilter;