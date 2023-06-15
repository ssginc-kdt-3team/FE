import { axiosWithBaseUrl } from "App";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Modal  } from 'antd';

function LoginForm() {
  const navigate = useNavigate();

  const [id, setid] = useState('');
  const [password, setPassword] = useState('');

  const isInputEmpty = (id, password) => {
    return id.trim() === '' || password.trim() === '';
  };

  const handleLogin = (e) => {
    e.preventDefault(); // 기본 동작 방지
    if(!isInputEmpty(id, password)) {
      axiosWithBaseUrl
      .post('/admin/login', {
        loginId: id,
        password: password,
      })
      .then(res => {
        if(res.data === '') {
          Modal.error({
            title: '로그인 실패',
            content: '아이디와 비밀번호를 확인해주세요.',
            okText: "닫기"
          });
          console.log(res.data);
        } else {
          console.log(res.data);
           Modal.success({
            title: '로그인 성공',
            content: '로그인에 성공하였습니다.',
             okText: "닫기"
           });
          navigate('/main'); // 이동할 페이지 URL 설정
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  return (
    <div className='container'>
      <div className='center flex-col'>
      <Form>
          <Form.Item
            label="아이디"
            name="id"
            // rules={[
            //   {
            //     type: 'id',
            //     message: '이메일 형식이 아닙니다.',
            //   },
            //   {
            //     // required: true,
            //     message: '이메일을 입력하세요.',
            //   },
            // ]}
           style={{ width: '250px', marginLeft: '10px' }} 
          >
            <Input
              type="id"
              placeholder="아이디"
              value={id}
              autoComplete="id"
              onChange={(e) => setid(e.target.value)}
              
            />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            // rules={[
            //   {
            //     // required: true,
            //     message: '비밀번호를 입력하세요.',
            //   },
            //   {
            //     min: 8,
            //     message: '8자리 이상이어야 합니다.',
            //   },
            //   {
            //     max: 16,
            //     message: '16자리 이하여야 합니다.',
            //   },
            // ]}
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
        
      </div>
    </div>
  );
}

export default LoginForm;  