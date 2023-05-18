import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputNumber, Radio } from 'antd';

const Join = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [detail, setDetail] = useState('');

  const navigate = useNavigate();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'birthday':
        setBirthday(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'zipCode':
        setZipCode(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'district':
        setDistrict(value);
        break;
      case 'detail':
        setDetail(value);
        break;
      default:
        break;
    }
  };

  const handleJoin = () => {
    // Perform your registration logic here
    // You can access the form values using the state variables

    const data = {
      name,
      phone,
      email,
      password,
      birthday,
      gender,
      zipCode,
      city,
      district,
      detail,
    };

    // Send the data to your API endpoint for registration
    // You can use axios or fetch for this
    // Example using axios:
    axios.post('http://localhost:8080/owner/join', data)
      .then((res) => {
        // Handle the successful response
        console.log(res.data);
      })
      .catch((err) => {
        // Handle any errors
        console.log(err);
      });
  };

  return (
    <div className='container' >
      <div className='center flex-col'>
        <Form
          {...layout}
          name='nest-messages'
          onFinish={handleJoin}
          style={{
            width: 600,
            alignItems: "center"
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name='name'
            label='이름'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder='이름' onChange={handleInput} />
          </Form.Item>

          <Form.Item
            name='phone'
            label='휴대폰 번호'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder='휴대폰 번호' onChange={handleInput} />
          </Form.Item>

          <Form.Item
            name='email'
            label='이메일'
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input placeholder='이메일' onChange={handleInput} />
          </Form.Item>

          <Form.Item
            name='password'
            label='비밀번호'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder='비밀번호' onChange={handleInput} />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            label='비밀번호 확인'
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('비밀번호가 같지 않습니다.')
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder='비밀번호 확인' onChange={handleInput} />
          </Form.Item>

          <Form.Item name='birthday' label='생년월일'>
            <Input type='date' onChange={handleInput} />
          </Form.Item>

          <Form.Item name='gender' label='성별'>
            <div style={{ display: 'flex' }}>
              <Radio.Group onChange={handleInput}>
                <Radio value='남'>남</Radio>
                <Radio value='여'>여</Radio>
              </Radio.Group>
            </div>
          </Form.Item>

          <Form.Item name='zipCode' label='우편번호'>
            <Input placeholder='우편번호' onChange={handleInput} />
          </Form.Item>

          <Form.Item name='city' label='도시'>
            <Input placeholder='시' onChange={handleInput} />
          </Form.Item>

          <Form.Item name='district' label='구'>
            <Input placeholder='구' onChange={handleInput} />
          </Form.Item>

          <Form.Item name='detail' label='상세주소'>
            <Input placeholder='상세주소' onChange={handleInput} />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit' style={{ marginLeft: '120px' }}>
              완료
            </Button>
            <Button onClick={() => navigate(-1)} style={{ marginLeft: '10px' }} >취소</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Join;