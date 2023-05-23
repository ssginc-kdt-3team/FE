import React, { useRef, useState } from 'react';
import { Card, Button, DatePicker, TimePicker, Form, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const format = 'HH:mm';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function BranchReg() {
  const formRef = useRef(null); // Reference to the form
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFileUpload = (fileList) => {
    const formData = new FormData();

    fileList.forEach((file) => {
      // 파일 데이터 저장
      formData.append('multipartFiles', file.originFileObj);
    });

    axios.post('http://localhost:8080/uploadFiles', formData);
  };

  const onFinish = (values) => {
    const requestBody = {
      branchImg: values.photos[0]?.originFileObj,
      address: {
        // Set address properties as needed
      },
      name: values.branchName,
      phone: values.phone,
      openTime: values.openingTime.format(format),
      closeTime: values.closingTime.format(format),
      openDay: values.openingDate.format('YYYY-MM-DD'),
    };

    axios.post('http://localhost:8080/admin/branch/add', requestBody)
      .then((response) => {
        console.log(response);
        navigate('/branch/list'); // 등록 성공 시 지점 리스트로 이동
      })
      .catch((error) => {
        console.error('Error adding branch:', error);
      });
  };

  const navigate = useNavigate();

  const handleFileChange = (info) => {
    const fileList = normFile(info);
    onFileUpload(fileList);
  };

  const handleSubmit = () => {
    formRef.current.submit(); // Submit the form
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

  return (
    <Card
      title="지점 등록"
      style={{
        width: 1000,
      }}
    >
      <Form
        ref={formRef} // Set the ref to the form
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
          <Input />
        </Form.Item>
        <Form.Item
          label="전화번호"
          name="phone"
          rules={[
            { required: true, message: '전화번호를 입력해주세요.' },
            { len: 11, message: '전화번호는 11자리여야 합니다.' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="개장시간" name="openingTime" required>
          <TimePicker format={format} />
        </Form.Item>
        <Form.Item label="폐장시간" name="closingTime" required>
          <TimePicker format={format} />
        </Form.Item>
        <Form.Item label="개점일" name="openingDate" required>
          <DatePicker />
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
            action="/upload.do"
            listType="picture-card"
            beforeUpload={() => false} // Disable automatic upload
            onChange={handleFileChange}
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

export default BranchReg;