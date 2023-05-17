import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [redirectTo, setRedirectTo] = useState(null); // 이동할 페이지 URL
  const navigate = useNavigate();

  const isInputEmpty = (email, password) => {
    if (email === '' || password === '') {
      alert('내용을 입력하세요.');
      return true;
    }
    return false;
  };

  const handleLogin = (values) => {
    const { email, password } = values;
    if (!isInputEmpty(email, password)) {
      axios
        .post('http://localhost:8080/admin/login', {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.data === '') {
            alert('로그인에 실패하였습니다.\n아이디와 비밀번호를 확인하세요.');
          } else {
            alert('로그인에 성공하였습니다.');
            setRedirectTo('/'); // 이동할 페이지 URL 설정
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo); // 페이지 이동
      setRedirectTo(null); // 상태(state) 초기화
    }
  }, [redirectTo, navigate]);

  return (
    <div className="container">
      <div className="center flex-col">
        <Form name="basic" onFinish={handleLogin}>
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
            <Input type="email" placeholder="이메일" />
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
            <Input.Password placeholder="비밀번호" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
          </Form.Item>
        </Form>

        <div>
          <div onClick={() => alert('아이디 찾기로 이동')}>아이디 찾기 &gt;</div>
          <div onClick={() => alert('비밀번호 찾기로 이동')}>비밀번호 찾기 &gt;</div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;