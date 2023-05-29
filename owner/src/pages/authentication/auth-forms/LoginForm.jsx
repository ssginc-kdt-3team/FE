import React, { useState } from 'react';
import { axiosWithBaseUrl } from "App";
import { useDispatch } from 'react-redux';
import { LOGIN } from "store/reducers/actions";
import { Form, Input, Button, Modal  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { isEmailValid } from '../../../utils/auth';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onFinish = (values) => {
      const { email, password } = values;
      if (isEmailValid(email)) {
        dispatch(
          LOGIN({
            email: email,
            password: password,
          })
        )
          .then((res) => {
            if (res === '') {
              alert('로그인에 실패하였습니다.\n아이디와 비밀번호를 확인하세요.');
            } else {
              setLoginInfo({
                id: res.data.id,
                isLoggedIn: true,
              });
              alert('로그인에 성공하였습니다.');
              navigate('/', { replace: true }); // 메인화면으로 이동
            }
          })
          .catch((err) => {
            alert('오류가 발생하였습니다.');
            console.log(err);
          });
      }
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    const isInputEmpty = (email, password) => {
      return email.trim() === '' || password.trim() === '';
    };
  
    const setLoginInfo = (info) => {
      // Implement your logic to set the login info
      console.log('Setting login info:', info);
    };
  
    // 로그인 처리
    const handleLogin = () => {
      if (!isInputEmpty(email, password)) { // 입력칸이 모두 채워져 있으면
        if (isEmailValid(email)) {
          axiosWithBaseUrl
            .post('/owner/login', {
              email: email,                         // email
              password: password,                   // password
            })
            .then(res => {                          // 받아오는 정보가 있다
              console.log(res.data.id);
              if (res.data === "")
                alert('로그인에 실패하였습니다.\n아이디와 비밀번호를 확인하세요.');
              else {
                setLoginInfo({                       // 로그인된 상태로 변경
                  id: res.data.id,
                  isLoggedin: true
                });
                Modal.success({
                  title: '로그인 성공',
                  content: '로그인에 성공하였습니다.',
                  onOk: () => {
                    navigate('/', { replace: true });
                  },
                });
              }
            })
            .catch(err => { // 오류 처리
              alert("오류가 발생하였습니다.");
              console.log(err);
            });
        }
      }
    };
  
    return (
      <div className="container">
        <div className="center flex-col">
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              label="이메일"
              name="username"
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
  
            <Form.Item
              label="비밀번호"
              autocomplete="current-password"
              // style={{ marginLeft:'5px' }}
              rules={[
                {
                  required: true,
                  message: '비밀번호를 입력하세요.',
                },
              ]}
            >
              <Input.Password
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
  
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button onClick={handleLogin} className="button mt-45" type="primary" htmlType="submit" style={{ marginLeft:'20px' }}>
                로그인
              </Button>
            </Form.Item>
          </Form>
  
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginLeft:'80px' }}>
           <div onClick={() => navigate('/find-id')}>
             아이디 찾기
            </div>
            <div onClick={() => navigate('/find-pw')}>
             비밀번호 찾기
             </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginForm;