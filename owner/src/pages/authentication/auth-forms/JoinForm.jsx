import { axiosWithBaseUrl } from "App";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Radio } from 'antd';
import { useMediaQuery, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Postcode from 'components/daumpostcode/postcode';

// ==============================|| Joinform||============================== //


const Join = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
    required: '${label}를 입력해주세요.',
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

    axiosWithBaseUrl
      .post('/owner/join', data)
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
    
    <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12} style={{ justifyContent: 'center' }}>
        {/* form 항목 전부 필수 값*/}
          <Form
            {...layout}
            name='nest-messages'
            onFinish={handleJoin}
            style={{
              width: isMobile ? '100' : '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            validateMessages={validateMessages}
          >
          {/* 이름 */}
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
            {/* 전화 번호*/}
          <Form.Item
            name='phone'
            label='전화 번호'
            rules={[
                { required: true, message: '전화번호를 입력해주세요.' },
                { len: 11, message: '전화번호는 11자리여야 합니다.' },
            ]}
          >
            <Input placeholder='전화번호' onChange={handleInput} name='phone' />
          </Form.Item>
          {/* 이메일 */}
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
            {/* 비밀번호 */}
            <Input.Password placeholder='비밀번호' onChange={handleInput} name='password' />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            label='비밀번호 확인'
            rules={[
              {
                required: true,
                message: '비밀번호를 한번 더 입력해주세요.',
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

          {/* 생년월일 */}
          <Form.Item
            name='birthday'
             label='생년월일'
              rules={[
              {
                required: true,
                validator: (_, value) => {
                if (!value) {
                return Promise.reject(new Error('생년월일을 입력해 주세요.'));
                }
                return Promise.resolve();
                },
              },
            ]}
            >
            <Input type='date' onChange={handleInput} name='birthday' />
          </Form.Item>
          {/* 성별 */}
          <Form.Item
            name='gender'
            label='성별'
            rules={[
              {
                required: true,
                validator: (_, value) => {
                if (!value) {
                return Promise.reject(new Error('성별을 선택해주세요.'));
               }
                return Promise.resolve();
                },
              },
              ]}
            >
             <div>
              <Radio.Group onChange={handleInput} name='gender'>
                <Radio value='true'>남</Radio>
                <Radio value='false'>여</Radio>
              </Radio.Group>
            </div>
          </Form.Item>
          {/* 주소 */}
          <Form.Item name='address' label='주소' required>
            <Postcode onChange={handleAddressChange} />
            <Input placeholder='우편번호' value={address.zipCode} disabled />
            <Input placeholder='도로명주소' value={address.address} disabled />
            <Input placeholder='건물명' value={address.extraAddress} disabled />
            <Input
              placeholder='상세주소'
              value={address.detail}
              onChange={(e) => setAddress({ ...address, detail: e.target.value })}
            />
          </Form.Item>
          {/* 완료버튼 */}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit' style={{ backgroundColor: '#cf1322' }}>
              완료
            </Button>
            <Button onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>
              취소
            </Button>
          </Form.Item>
        </Form>
      </Grid>
    </Grid>
  );
};

export default Join;