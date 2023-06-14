import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../ui/PageTitle';
import styled from 'styled-components';
import styles from '../../../assets/css/pages/authentication/Login.module.css';
import { Button } from 'antd';

const P = styled.p`
  font-size: 24px;
  color: var(--main);
  font-weight: 500;
  text-align: center;
`;

function FindPwdResult() {
  const { state } = useLocation();
  console.log(state);
  // const location = useLocation();
  // console.log(location);
  // console.log(location.search.slice(8, ));

  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title='FIND PASSWORD' phrase={`${state.name}님의 정보와 일치하는 비밀번호 입니다.`}/>
        <div className={styles.loginForm} style={{gap: '10px'}}>
          {/* <p style={{textAlign: 'center', marginTop: 0}}>{state.name}님의 정보와 일치하는 비밀번호 입니다.</p> */}
          <P>{state.password}</P>

          <Button type='primary' className='button mt-75' onClick={() => navigate("/login", { replace: true })}>로그인 하기</Button>
        </div>
      </div>
    </div>
  );
}

export default FindPwdResult;