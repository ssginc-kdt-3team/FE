import React, { useState } from 'react';
import { Card, Button, DatePicker, TimePicker, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

//시간 형식
const format = 'HH:mm';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList;
};

function BranchRegNew() {
  // form data 상태변수
  const [branchName, setBranchName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [detail, setDetail] = useState('');
  const [openingTime, setOpeningTime] = useState(dayjs('12:00', format));
  const [closingTime, setClosingTime] = useState(dayjs('12:00', format));
  const [openingDate, setOpeningDate] = useState(dayjs()); 
  const [photos, setPhotos] = useState([]);

  const onFileUpload = () => {
    const branchData = {
      address: {
        city,
        district,
        detail,
        zipCode,
      },
      name: branchName,
      phone,
      openTime: openingTime.format(format),
      closeTime: closingTime.format(format),
      openDay: openingDate.format('YYYY-MM-DD'),
    };

    // const formData = new FormData();
    // formData.append('branchData', JSON.stringify(branchData));
    
    const formData = new FormData();
    const json = JSON.stringify(branchData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("branchData", blob);

    photos.forEach((file) => {
    formData.append('branchImg', file.originFileObj);
    });

    axios.post('http://localhost:8080/admin/branch/add', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error adding branch:', error);
      });
  };

  const onFinish = () => {
    // Handle form submission if needed
  };

  const handleFileChange = (info) => {
    const fileList = normFile(info);
    setPhotos(fileList);
  };

  const handleSubmit = () => {
    onFileUpload();
  };

  return (
    <Card
      title="지점 등록"
      style={{
        width: 1000,
      }}
    >
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          openingTime: dayjs('12:00', format),
          closingTime: dayjs('12:00', format),
          openingDate: dayjs(),
        }}
        onFinish={onFinish}
      >

        <Form.Item label="지점명" name="branchName" required>
          <Input value={branchName} onChange={(e) => setBranchName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="전화번호"
          name="phone"
          rules={[
            { required: true, message: '전화번호를 입력해주세요.' },
            { len: 11, message: '전화번호는 11자리여야 합니다.' },
          ]}
        >
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>

        <Form.Item name="address" label="주소">
          <Input placeholder="우편번호" name="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          <Input placeholder="시" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
          <Input placeholder="구" name="district" value={district} onChange={(e) => setDistrict(e.target.value)} />
          <Input placeholder="상세주소" name="detail" value={detail} onChange={(e) => setDetail(e.target.value)} />
        </Form.Item>

        <Form.Item label="개장시간" name="openingTime" required>
          <TimePicker format={format} value={openingTime} onChange={setOpeningTime} />
        </Form.Item>
        <Form.Item label="폐장시간" name="closingTime" required>
          <TimePicker format={format} value={closingTime} onChange={setClosingTime} />
        </Form.Item>
        <Form.Item label="개점일" name="openingDate" required>
          <DatePicker value={openingDate} onChange={setOpeningDate} />
        </Form.Item>
        <Form.Item
          label="지점 사진"
          name="photos"
          required
          rules={[
            { required: true, message: '지점 사진을 업로드해주세요.' },
          ]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="photo"
            action="/upload.do"
            listType="picture-card"
            beforeUpload={() => false} // Disable automatic upload
            onChange={handleFileChange}
            fileList={photos}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}></div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            등록하기
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default BranchRegNew;