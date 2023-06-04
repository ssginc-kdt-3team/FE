import React, { useState } from 'react';
import { axiosWithBaseUrl } from "App";
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/reducers/userSlice'; 
import { setLoggedIn } from '../../../store/reducers/loginSilce';
import { Form, Input, Button, Modal  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { isEmailValid } from '../../../utils/auth';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isInputEmpty = (email, password) => {
    return email.trim() === '' || password.trim() === '';
  };

  const handleLogin = () => {
    if (!isInputEmpty(email, password) && isEmailValid(email)) {
      axiosWithBaseUrl
        .post('/owner/login', {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data.id);
          console.log(res.data);
          if (res.data === '') {
            Modal.error({
              title: '로그인 실패',
              content: '아이디와 비밀번호를 확인해주세요.',
            });
          } else {

            dispatch(setUser({ id: res.data.id, username: res.data.name }));
            dispatch(setLoggedIn(true));

            Modal.success({
              title: '로그인 성공',
              content: '로그인에 성공하였습니다.',
              okText: "닫기"
            });

            navigate('/main', { replace: true });
          }
        })
        .catch((err) => {
          alert('오류가 발생하였습니다.');
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="center flex-col">
        <Form>
          <Form.Item
            label="이메일"
            name="email"
            rules={[
              {
                type: 'email',
                message: '이메일 형식이 아닙니다.',
              },
              {
                // required: true,
                message: '이메일을 입력하세요.',
              },
            ]}
            style={{ width: '250px', marginLeft: '10px' }}
          >
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                // required: true,
                message: '비밀번호를 입력하세요.',
              },
              {
                min: 8,
                message: '8자리 이상이어야 합니다.',
              },
              {
                max: 16,
                message: '16자리 이하여야 합니다.',
              },
            ]}
            style={{ width: '260px' }}
          >
            <Input.Password
              autoComplete="current-password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                width: '200px', // 원하는 너비 값 설정
              }}
            />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Item>
          <Button
            className="button"
            type="primary"
            onClick={handleLogin}
            htmlType="submit"
            style={{ marginTop: '10px', backgroundColor: '#cf1322' }}
            >
              로그인
            </Button>
          </Form.Item>
          </div>
        </Form>
        

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', justifyContent: 'center' }}>          
          <div onClick={() => navigate('/find-id')}>아이디 찾기</div>
          <div onClick={() => navigate('/find-pw')}>비밀번호 찾기</div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;