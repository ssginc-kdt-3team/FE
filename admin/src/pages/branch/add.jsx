import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, DatePicker, TimePicker, Form, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import Postcode from 'components/daumpostcode/postcode';

//시간 형식
const format = 'HH:mm';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList;
};

function BranchAdd() {
  // form data 상태변수
  const [branchName, setBranchName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState({
    zipCode: null,
    city: null,
    district: null,
    detail: null,
  });
  const [openingTime, setOpeningTime] = useState(dayjs('12:00', format));
  const [closingTime, setClosingTime] = useState(dayjs('12:00', format));
  const [openingDate, setOpeningDate] = useState(dayjs());
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const onFileUpload = async () => {
    const branchData = {
      address: {
        city: address.city,
        district: address.district,
        detail: address.detail,
        zipCode: address.zipCode,
      },
      name: branchName,
      phone,
      openTime: openingTime.format(format),
      closeTime: closingTime.format(format),
      openDay: openingDate.format('YYYY-MM-DD'),
    };
  //form data > branchData, branchImg
    const formData = new FormData();
    const json = JSON.stringify(branchData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("branchData", blob);
  
    photos.forEach((file) => {
      formData.append('branchImg', file.originFileObj);
    });
  
    try {
      const response = await axios.post('http://localhost:8080/admin/branch/add', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response);
      navigate('/branch/list');
    } catch (error) {
      console.error('Error adding branch:', error);
    }
  };

  const onFinish = () => {
    // Handle form submission if needed
  };

  const handleFileChange = (info) => {
    const fileList = normFile(info);
    setPhotos(fileList);
  };

  //모달
  const handleSubmit = () => {
    onFileUpload();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleSubmit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //주소검색
  const handleAddressChange = (data) => {
    setAddress({
      zipCode: data.zonecode,
      city: data.city,
      district: data.district,
      detail: data.detailAddress,
    });
  };

  return (
    <Card
      title="지점 등록"
      style={{
        width: 1000,
      }}
    >
      <Form
        ref={formRef}
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
          <Postcode onChange={handleAddressChange} />
          <Input placeholder="우편번호" name="zipCode" value={address.zipCode} disabled />
          <Input placeholder="시" name="city" value={address.city} disabled />
          <Input placeholder="구" name="district" value={address.district} disabled />
          <Input placeholder="상세주소" name="detail" value={address.detail} onChange={(e) => setAddress({ ...address, detail: e.target.value })} />
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
          <Button type="primary" onClick={showModal}>
            등록하기
          </Button>
          <Modal title="등록" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>지점을 등록하시겠습니까?</p>
          </Modal>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default BranchAdd;
