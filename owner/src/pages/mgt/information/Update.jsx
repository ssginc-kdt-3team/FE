import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, DatePicker, TimePicker, Form, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { axiosWithBaseUrl } from 'App';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

//시간 형식
const format = 'HH:mm'; 

//사진 업로드
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList;
};

function MgtInfoUpdate() {
  const { state } = useLocation();
  const id = useSelector((state) => state.user.id); 
   // form data 상태변수
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [branchId, setBranchId] = useState('1');
  const [shopInfo, setShopInfo] = useState('');
  const [location, setLocation] = useState('');
  const [businessCeo, setBusinessCeo] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [orderCloseTime, setOrderCloseTime] = useState('');
  const [seat, setSeat] = useState('');
  const [openTime, setOpenTime] = useState(dayjs('12:00', format));
  const [closeTime, setCloseTime] = useState(dayjs('12:00', format));
  const [openDay, setOpenDay] = useState(dayjs());
  const [photos, setPhotos] = useState([]);                              //shopImg
  const [shopImgUrl, setShopImgUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    if (state) {
      shopName(state.shopName);
      shopInfo(state.Info);
      shopImgUrl(state.shopImgUrl)
    }
  }, [state]);
  //등록하기
  const handleSubmit = async () => {
      const shopData = {
      shopName: shopName,
      openTime: openTime.format(format),
      closeTime: closeTime.format(format),
      openDay: openDay.format('YYYY-MM-DD'),
      shopInfo: shopInfo,
      location: location,
      seat: seat,
      ownerName: ownerName,
      businessCeo: businessCeo,
      businessNumber: businessNumber,
      orderCloseTime: orderCloseTime.format(format),
      Id: id, // ownerId
      branchId: branchId, // branchId 값 추가
    };

    // formData > shopData, shopImg, businessImg
    const formData = new FormData();
    const json = JSON.stringify(shopData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("shopData", blob);

    // shopImg 파일 추가
    photos.forEach((file) => {
      formData.append('shopImg', file.originFileObj);
    });


    try {
      const response = await axiosWithBaseUrl
      .post('/owner/shop/update/${id}', formData, {
       headers: {
        'Content-Type': 'multipart/form-data',
        },
        });
      console.log(response);
      console.log(formData);
      //등록되면 매장 정보 페이지로 이동
      navigate('/mgt/info');
    } catch (error) {
      console.error('Error adding shop:', error);
    }
  };

  const onFinish = () => {
  };

  const handleFileChange = (info) => {
    const fileList = normFile(info);
    setPhotos(fileList);
  };

  const handleBranchSelect = (branchId) => {
    setBranchId(branchId);
  };

  //모달
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

  // 정보 입력 폼
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Card  title={<div style={{ textAlign: 'center' }}>매장 정보 수정</div>}
      style={{ width: 1000,}}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '100px' }}>
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
          maxWidth: 500,
        }}
        initialValues={{
          openTime: dayjs('12:00', format),
          closeTime: dayjs('12:00', format),
          openDay: dayjs(),
        }}
        onFinish={onFinish}
      >

        <Form.Item label="지점id" name="branchId" required hidden>
          <Input value={branchId} onChange={(e) => setBranchId(e.target.value)} />
        </Form.Item>
        <Form.Item label="점주id" name="id" required hidden>
          <Input value={id} onChange={(e) => id(e.target.value)} />
        </Form.Item>
        <Form.Item label="매장명" name="shopName" required  initialValue={state.shopName} style={{ width: 'calc(135% - 0px)'}} >
          <Input value={shopName} onChange={(e) => setShopName(e.target.value)} />
        </Form.Item>
        <Form.Item label="매장 설명"  name="shopInfo" required style={{ width: 'calc(170% - 0px)'}}
         rules={[
          {
          max: 50,
          whitespace: true,
          message: '50자 이내로 입력해주세요.',
          },
          ]}
          >
          <Input value={shopInfo} onChange={(e) => setShopInfo(e.target.value)} />
        </Form.Item>
        <Form.Item label="지점 내 위치" name="location" required  style={{ width: 'calc(200% - 0px)'}}
           rules={[
            {
            pattern: /^[A-Z]\d{2}$/,
             message: '알파벳 대문자 1개와 숫자 2개로 입력해주세요. 예시: A01',
              },
               ]}
              >
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
        </Form.Item>
        <Form.Item label="좌석 수" name="seat" required  style={{ width: 'calc(140% - 0px)'}}>
          <Input value={seat} onChange={(e) => setSeat(e.target.value)} />
        </Form.Item>
        {/* 점주 id에서 name 가져오기  */}
        <Form.Item label="점주명" name="ownername" required style={{ width: 'calc(140% - 0px)'}}>
          <Input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
        </Form.Item>

         <Form.Item
          label="매장 전화번호"
          name="phone"
          style={{ width: 'calc(225% - 0px)'}}
          rules={[
            { required: true, message: '전화번호를 입력해주세요.' },
            { len: 11, message: '전화번호는 11자리여야 합니다.' },
          ]}
        >
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>  
        <Form.Item label="개업일" name="openDay" required style={{ width: 'calc(140% - 0px)'}}>
          <DatePicker value={openDay} onChange={setOpenDay} />
        </Form.Item>
        <Form.Item label="오픈시간" name="openTime" required style={{ width: 'calc(160% - 0px)'}}>
          <TimePicker format={format} value={openTime} onChange={setOpenTime} />
        </Form.Item>
        <Form.Item label="마감시간" name="closeTime" required style={{ width: 'calc(160% - 0px)'}}>
          <TimePicker format={format} value={closeTime} onChange={setCloseTime} />
        </Form.Item>
        <Form.Item
          label="주문마감시간"
          name="orderCloseTime"
          required
          style={{ width: 'calc(215% - 0px)'}}
          rules={[
           ({ getFieldValue }) => ({
           validator(_, value) {
            const closeTimeValue = getFieldValue('closeTime');
            if (!value || closeTimeValue.isAfter(value)) {
            return Promise.resolve();
            }
            return Promise.reject(new Error('주문 마감시간은 마감시간 이전이어야 합니다.'));
            },
            }),
          ]}
        >
        <TimePicker format={format} value={orderCloseTime} onChange={setOrderCloseTime} />
      </Form.Item>
      {/* 사진 업로드 */}
      <Form.Item
          label="매장 사진"
          name="shopImg"
          required
          style={{ width: 'calc(170% - 0px)'}}
          rules={[
            { required: true, message: '매장 사진을 업로드해주세요.' },
          ]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="photos"
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
        <Form.Item label="사업주 이름" name="businessCeo" required style={{ width: 'calc(200% - 0px)'}}>
          <Input value={businessCeo} onChange={(e) => setBusinessCeo(e.target.value)} />
        </Form.Item>

        <Form.Item 
        label="사업자 등록번호" 
        name="businessNumber" 
        required 
        style={{ marginRight: '20px', width: 'calc(250% - 0px)'  }} 
         rules={[
          { required: true, message: '사업자 등록번호를 입력해주세요.' },
          { len: 10, message: '사업자 등록번호는 10자리여야 합니다.' },
        ]}>
          <Input value={businessNumber} onChange={(e) => setBusinessNumber(e.target.value)} style={{ width: '150px'}}/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}  style={{ backgroundColor: '#cf1322', justifyContent: 'center'  }}>
            등록하기
          </Button>

          <Modal title="등록" visible={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
            <p>매장을 등록하시겠습니까?</p>
          </Modal>
        </Form.Item>
      </Form>
      </div>
    </Card>
    </div>
  );
}

export default MgtInfoUpdate;