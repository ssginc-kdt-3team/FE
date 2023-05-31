import React, { useState } from 'react';
import { axiosWithBaseUrl } from "App";
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/reducers/userSlice'; 
import { setLoggedIn } from '../../../store/lib/storage';
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
          if (res.data === '') {
            alert('로그인에 실패하였습니다.\n아이디와 비밀번호를 확인하세요.');
          } else {

            dispatch(setUser({ id: res.data.id }));
            dispatch(setLoggedIn(true));

            Modal.success({
              title: '로그인 성공',
              content: '로그인에 성공하였습니다.',
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
                required: true,
                message: '이메일을 입력하세요.',
              },
            ]}
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
                required: true,
                message: '비밀번호를 입력하세요.',
              },
            ]}
          >
            <Input.Password
              autoComplete="current-password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              className="button mt-45"
              type="primary"
              onClick={handleLogin}
              htmlType="submit"
              style={{ marginLeft: '20px' }}
            >
              로그인
            </Button>
          </Form.Item>
        </Form>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginLeft: '80px' }}>
          <div onClick={() => navigate('/find-id')}>아이디 찾기</div>
          <div onClick={() => navigate('/find-pw')}>비밀번호 찾기</div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;