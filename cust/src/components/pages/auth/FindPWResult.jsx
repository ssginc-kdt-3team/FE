import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../ui/PageTitle';
import styled from 'styled-components';
import styles from '../../../assets/css/pages/auth/Login.module.css';

const ResultP = styled.p`
  font-size: 24px;
  color: var(--main);
  font-weight: 500;
  text-align: center;
`;

function FindPwResult() {
  const location = useLocation();
  console.log(location);
  console.log(location.search.slice(8, ));

  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title="비밀번호 찾기" fontSize="1.6rem" marginTop="60px" marginBottom="80px"/>
        <div className={styles.loginForm} style={{gap: '10px'}}>
          <p style={{textAlign: 'center', marginTop: 0}}>OOO님의 정보와 일치하는 비밀번호 입니다.</p>
          <ResultP>OOOOOOOOOO</ResultP>

          <div className='button mt-75' onClick={() => navigate("/login", { replace: true })}>로그인 하기</div>
        </div>
      </div>
    </div>
  );
}

export default FindPwResult;