import React, { useEffect, useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import styles from '../../../assets/css/pages/authentication/Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import { isInputEmpty } from '../../../utils/authentication/joinValidation';
import { onlyNum } from '../../../utils/format';

function FindId() {
  const navigate = useNavigate();

  const [inputInfo, setInputInfo] = useState({
    name: '',
    phone : ''
  })

  // input 처리
  const handleInput = (e) => {
    // console.log(e);
    let { name, value } = e.target;
    // console.log('name: ' + name + ' / value: ' + value);

    setInputInfo({
      ...inputInfo,
      [name]: value // 메모 변경
    })
  };

  // 아이디 찾기 수행
  const handleFindId = () => {
    if(!isInputEmpty(inputInfo)) {
      axios.post(`/customer/findEmail`, inputInfo)
      .then(res => { // 받아오는 정보가 있다
        console.log(res);
        if(res.data !== null) {
          alert('아이디 찾기에 성공하였습니다.');
          navigate(`/find-id/result`, { replace: true, state: { name: inputInfo.name, email: res.data } });
        }
      })
      .catch(err => { // 오류 처리
        console.log(err);
        alert(err.response.data);
      });
    }
  }

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title="아이디 찾기"/>
        <form className={styles.loginForm}>
          <div>
            <label>NAME</label>
            <input className={styles.loginInput} type='text' name='name' value={inputInfo.name} placeholder='이름' onChange={handleInput}/>
          </div>

          <div>
            <label>PHONE</label>
            <input 
              className={styles.loginInput} 
              type='text' 
              name='phone' 
              value={inputInfo.phone} 
              placeholder='휴대폰 번호' 
              onInput={(e) => { e.target.value = onlyNum(e.target.value) }}
              onChange={handleInput}
            />
          </div>

          {/* <div className='button mt-45' onClick={() => navigate(`/find-id/result?userId=${result}`)}>아이디 찾기</div> */}
          {/* <div className='button mt-45' onClick={() => navigate(`/find-id/result`, { state: result })}>아이디 찾기</div> */}
          <Button type='primary' className='button mt-45' onClick={handleFindId}>아이디 찾기</Button>
        </form>
      </div>
    </div>
  );
}

export default FindId;