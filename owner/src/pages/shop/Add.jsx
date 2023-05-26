import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, DatePicker, TimePicker, Form, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

// 시간 형식
const format = 'HH:mm';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList;
};

function ShopAdd() {
  // form data 상태변수
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerId, setownerId] = useState('14');
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
  const [photos, setPhotos] = useState([]);                            //shopImg
  const [businessPhotos, setBusinessPhotos] = useState([]);             //businessImg
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const onFileUpload = async () => {
    const shopData = {
      shopName: shopName,
      openTime: openTime.format(format),
      closeTime: closeTime.format(format),
      openDay: openDay.format('YYYY-MM-DD'),
      shopInfo: shopInfo ,
      location: location ,
      seat: seat ,
      ownerName ,
      businessCeo,
      businessNumber,
      orderCloseTime: orderCloseTime.format(format),
      ownerId: '', // ownerId 값 추가
      branchId: '', // branchId 값 추가
    };

    // form data > shophData, shopImg, businessImg
    const formData = new FormData();

    const json = JSON.stringify(shopData);
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('shopData', blob);

    console.log(FormData);
    console.log(shopData);

    photos.forEach((file) => {
      formData.append('shopImg', file);
      console.log(file);
    });
    
    businessPhotos.forEach((file) => { // 수정: businessPhotos 사용
      formData.append('businessImg', file);
      console.log(file);
    });

    try {
      const response = await axios.post('http://localhost:8080/owner/shop/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      console.log(formData.shopData);
      console.log(formData.shopImg);
      console.log(formData.businessImg);
     
      if (response.status === 200) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = () => {
    // Handle form submission if needed
  };

  const handleAddImages = (event, fieldName) => {
    const imageLists = event.target.files;
    let imageUrlLists = [];
  
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
  
    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
  
    if (fieldName === 'shopImg') {
      setPhotos(imageUrlLists);
    } else if (fieldName === 'businessImg') {
      setBusinessPhotos(imageUrlLists);
    }
  };

  // const handleFileChange = (info, fieldName) => {
  //   if (info.file.status === 'done' || info.file.status === 'removed') {
  //     // Create a new array for each field
  //     if (fieldName === 'shopImg') {
  //       setPhotos([info.file.originFileObj]);
  //     } else if (fieldName === 'businessImg') {
  //       setBusinessPhotos([info.file]);
  //     }
  //   }
  // };
  // const handleFileChange = (info, fieldName) => {
  //   if (info.file.status === 'done' || info.file.status === 'removed') {
  //     // 수정: fileList 대신 file을 사용하여 배열에 추가
  //     if (fieldName === 'shopImg') {
  //       setPhotos(info.fileList.map((file) => file.originFileObj));
  //     } else if (fieldName === 'businessImg') {
  //       setBusinessPhotos(info.fileList);
  //     }
  //   }
  // };

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

  // 정보 입력 폼
  return (
    <Card
      title="매장 등록"
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
          openTime: dayjs('12:00', format),
          closeTime: dayjs('12:00', format),
          openDay: dayjs(),
        }}
        onFinish={onFinish}
      >

        <Form.Item label="지점id" name="branchId" required>
          <Input value={branchId} onChange={(e) => setBranchId(e.target.value)} />
        </Form.Item>
        <Form.Item label="점주id" name="ownerId" required>
          <Input value={ownerId} onChange={(e) => setownerId(e.target.value)} />
        </Form.Item>
        <Form.Item label="매장명" name="shopName" required>
          <Input value={shopName} onChange={(e) => setShopName(e.target.value)} />
        </Form.Item>
        <Form.Item label="매장 설명" name="shopInfo" required>
          <Input value={shopInfo} onChange={(e) => setShopInfo(e.target.value)} />
        </Form.Item>
        <Form.Item label="지점 내 위치" name="location" required>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} />
        </Form.Item>
        <Form.Item label="좌석 수" name="seat" required>
          <Input value={seat} onChange={(e) => setSeat(e.target.value)} />
        </Form.Item>
        {/* 점주 id에서 name 가져오기  */}
        <Form.Item label="점주 이름" name="ownername" required>
          <Input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
        </Form.Item>

        {/* 나중에 추가하기
         <Form.Item
          label="매장 전화번호"
          name="phone"
          rules={[
            { required: true, message: '전화번호를 입력해주세요.' },
            { len: 11, message: '전화번호는 11자리여야 합니다.' },
          ]}
        >
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>  */}

        <Form.Item label="개업일" name="openDay" required>
          <DatePicker value={openDay} onChange={setOpenDay} />
        </Form.Item>
        <Form.Item label="오픈시간" name="openTime" required>
          <TimePicker format={format} value={openTime} onChange={setOpenTime} />
        </Form.Item>
        <Form.Item label="닫는시간" name="closeTime" required>
          <TimePicker format={format} value={closeTime} onChange={setCloseTime} />
        </Form.Item>
        <Form.Item label="주문마감시간" name="orderCloseTime" required>
          <TimePicker format={format} value={orderCloseTime} onChange={setOrderCloseTime} />
        </Form.Item>
        <Form.Item
          label="매장 사진"
          name="photos"
          required
          rules={[
            { required: true, message: '매장 사진을 업로드해주세요.' },
          ]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
          name="shopImg"
          action="/upload.do"
          listType="picture-card"
          beforeUpload={() => false} // Disable automatic upload
          onChange={(e) => handleAddImages(e, 'shopImg')}
          fileList={photos}
>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}></div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="사업주 이름" name="businessCeo" required>
          <Input value={businessCeo} onChange={(e) => setBusinessCeo(e.target.value)} />
        </Form.Item>
        <Form.Item label="사업자 등록번호" name="businessNumber" required>
          <Input value={businessNumber} onChange={(e) => setBusinessNumber(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="사업자 등록증 사진"
          name="businessImg"
          required
          rules={[
            { required: true, message: '사업자 등록증 사진을 업로드해주세요.' },
          ]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
         <Upload
          name="businessImg"
          action="/upload.do"
          listType="picture-card"
          beforeUpload={() => false} // Disable automatic upload
          onChange={(e) => handleAddImages(e, 'businessImg')}
          fileList={businessPhotos}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}></div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={onFileUpload}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* 성공 모달 */}
      <Modal
        title="매장 등록 성공"
        visible={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
          navigate('/mgt/info');
        }}
      >
        <p>매장 등록이 성공적으로 완료되었습니다.</p>
      </Modal>

    </Card>
  );
}

export default ShopAdd;