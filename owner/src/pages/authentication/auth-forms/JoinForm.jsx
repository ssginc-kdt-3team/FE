import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Radio } from 'antd';
import Postcode from 'components/daumpostcode/postcode';

const Join = () => {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState({
    zipCode: null,
    address: null,
    extraAddress: null,
    detail: null,
  });

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
      email: '${label} 형식이 아닙니다.',
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
      default:
        break;
    }
  };

  const handleJoin = () => {
    const data = {
      name: name,
      phone: phone,
      email: email,
      password: password,
      birthday: birthday,
      gender: gender,
      address: {
        address: address.address,
        extraAddress: address.extraAddress,
        detail: address.detail,
        zipCode: address.zipCode,
      }
    };

    axios
      .post('http://localhost:8080/owner/join', data)
      .then((res) => {
        console.log(res.data);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddressChange = (value) => {
    setAddress({
      zipCode: value.zonecode,
      address: value.address,
      extraAddress: value.extraAddress,
      detail: value.detail,
    });
  };

  return (
    <div className='container'>
      <div className='center flex-col'>
        <Form
          {...layout}
          name='nest-messages'
          onFinish={handleJoin}
          style={{
            width: 600,
            alignItems: 'center',
          }}
          validateMessages={validateMessages}
        >
          {/* Form fields */}
          <Form.Item
            name='name'
            label='이름'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder='이름' onChange={handleInput} name='name' />
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
            <Input placeholder='휴대폰 번호' onChange={handleInput} name='phone' />
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
            <Input placeholder='이메일' onChange={handleInput} name='email' />
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
            <Input.Password placeholder='비밀번호' onChange={handleInput} name='password' />
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
            <Input.Password placeholder='비밀번호 확인' onChange={handleInput} name='confirmPassword'/>
          </Form.Item>

 
          <Form.Item name='birthday' label='생년월일'>
            <Input type='date' onChange={handleInput} name='birthday'/>
          </Form.Item>

          <Form.Item name='gender' label='성별'>
            <div style={{ display: 'flex' }}>
              <Radio.Group onChange={handleInput} name='gender'>
                <Radio value='true'>남</Radio>
                <Radio value='false'>여</Radio>
              </Radio.Group>
            </div>
          </Form.Item>

          <Form.Item name='address' label='주소'>
            <Postcode onChange={handleAddressChange} />
            <Input placeholder='우편번호' value={address.zipCode} disabled />
            <Input placeholder='시' value={address.address} disabled />
            <Input placeholder='구' value={address.extraAddress} disabled />
            <Input
              placeholder='상세주소'
              value={address.detail}
              onChange={(e) => setAddress({ ...address, detail: e.target.value })}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit' style={{ marginLeft: '120px', backgroundColor: '#cf1322' }}>
              완료
            </Button>
            <Button onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>
              취소
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Join;