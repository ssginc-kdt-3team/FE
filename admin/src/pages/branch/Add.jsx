import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosWithBaseUrl } from "App";
import { Card, Button, DatePicker, TimePicker, Form, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Postcode from 'components/daumpostcode/postcode';

// ==============================|| BranchAdd - 지점등록 ||============================== //

// 시간 형식
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
    address: null,
    extraAddress: null,
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
        address: address.address,
        extraAddress: address.extraAddress,
        detail: address.detail,
        zipCode: address.zipCode,
      },
      name: branchName,
      phone,
      openTime: openingTime.format(format),
      closeTime: closingTime.format(format),
      openDay: openingDate.format('YYYY-MM-DD'),
    };

    // form data > branchData, branchImg
    const formData = new FormData();
    const json = JSON.stringify(branchData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("branchData", blob);

    photos.forEach((file) => {
      formData.append('branchImg', file.originFileObj);
    });

    try {
      const res = await 
      axiosWithBaseUrl
      .post('/admin/branch/add', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res);
      Modal.success({
        title: '지점등록 성공',
        content: '지점등록에 성공하였습니다.',
        okText: "닫기",
        onOk: () => {
          navigate('/branch/list');
        }
      });
    } catch (error) {
      Modal.error({
        title: '지점등록 실패',
        content: '등록정보를 확인해주세요.',
        okText: "닫기"
      });
      console.error('오류가 발생하였습니다.');
    }
  };

  const onFinish = () => {
  };

  const handleFileChange = (info) => {
    const fileList = normFile(info);
    setPhotos(fileList);
  };

  // 모달
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

  // 주소검색
  const handleAddressChange = (value) => {
    setAddress({
      zipCode: value.zonecode,
      address: value.address,
      extraAddress: value.extraAddress,
      detail: value.detail,
    });
  };
  
// 숫자만 입력가능
  const onlyNum = (input) => {
    return input.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
  };
  
// 지점등록 input 전부 not null
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
        {/* 지점명 */}
        <Form.Item
          label="지점명"
          name="branchName"
          rules={[
            { required: true, message: '지점명을 입력해주세요.' }
          ]}
        >
          <Input value={branchName} onChange={(e) => setBranchName(e.target.value)} />
        </Form.Item>
        {/* 전화번호 */}
        <Form.Item
          label="전화번호"
          name="phone"
          rules={[
            { required: true, message: '전화번호를 입력해주세요.' },
            { len: 11, message: '전화번호는 11자리여야 합니다.' },
          ]}
        >
          <Input 
          value={phone} 
          onInput={(e) => { e.target.value = onlyNum(e.target.value) }}
          onChange={(e) => setPhone(e.target.value)} 
           />

        </Form.Item>
        {/* 지점 주소 */}
        <Form.Item
          name="Postcode"
          label="주소"
          rules={[
            { required: true, message: '주소를 입력해주세요.' }
          ]}
        >
          <Postcode onChange={handleAddressChange} />
          <Input placeholder="우편번호" name="zipCode" value={address.zipCode} disabled />
          <Input placeholder="도로명주소" name="city" value={address.address} disabled />
          <Input placeholder="건물명" name="extraAddress" value={address.extraAddress} disabled />
          <Input
              placeholder='상세주소'
              value={address.detail}
              onChange={(e) => setAddress({ ...address, detail: e.target.value })}
            />       
             </Form.Item>
        {/* 개장시간 */}
        <Form.Item
          label="개장시간"
          name="openingTime"
          rules={[
            { required: true, message: '개장시간을 입력해주세요.' },
            ({ getFieldValue }) => ({
              validator(_, value) {
               const closeTimeValue = getFieldValue('closingTime');
               if (!value || closeTimeValue.isAfter(value)) {
               return Promise.resolve();
               }
               return Promise.reject(new Error('개장시간은 폐장시간 이전이어야 합니다.'));
               },
               }),
          ]}
        >
          <TimePicker format={format} value={openingTime} onChange={setOpeningTime} />
        </Form.Item>
        {/* 폐장시간 */}
        <Form.Item
          label="폐장시간"
          name="closingTime"
          rules={[
            { required: true, message: '폐장시간을 입력해주세요.' }
          ]}
        >
          <TimePicker format={format} value={closingTime} onChange={setClosingTime} />
        </Form.Item>
        <Form.Item
          label="개점일"
          name="openingDate"
          rules={[
            { required: true, message: '개점일을 입력해주세요.' }
          ]}
        >
          <DatePicker value={openingDate} onChange={setOpeningDate} />
        </Form.Item>
        {/* 지점 사진 */}
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

        {/* 등록하기 버튼 */}
        <Form.Item>
          <Button type="primary" onClick={showModal}>
            등록하기
          </Button>
          <Modal title="지점 등록" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>지점을 등록하시겠습니까?</p>
          </Modal>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default BranchAdd;