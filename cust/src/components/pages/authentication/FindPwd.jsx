import React, { useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import styles from '../../../assets/css/pages/authentication/Login.module.css';
import { useNavigate } from 'react-router-dom';

function FindPwd() {
  const [name, setName] = useState("");
  const [email, setEamil] = useState("");
  const [phone, setPhone] = useState("");

  // const [result, setResult] = useState(null);
  const result = {
    name: 'name',
    pw: 'pw'
  };

  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title="비밀번호 찾기"/>
        <form className={styles.loginForm}>
          <div>
            <label>NAME</label>
            <input className={styles.loginInput} type='name' value={name} placeholder='이름' onChange={(e) => setName(e.currentTarget.value)}/>
          </div>

          <div>
            <label>EMAIL</label>
            <input className={styles.loginInput} type='email' value={email} placeholder='이메일' onChange={(e) => setPhone(e.currentTarget.value)}/>
          </div>

          <div>
            <label>PHONE</label>
            <input className={styles.loginInput} type='phone' value={phone} placeholder='휴대폰 번호' onChange={(e) => setPhone(e.currentTarget.value)}/>
          </div>

          <div className='button mt-45' onClick={() => navigate(`/find-pw/result`, { state : result })}>비밀번호 찾기</div>
        </form>
      </div>
    </div>
  );
}

export default FindPwd;