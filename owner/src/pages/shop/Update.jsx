import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, DatePicker, TimePicker, Form, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { axiosWithBaseUrl } from 'App';
import { useSelector } from 'react-redux';

// ==================================||ShopUpdate, 매장수정페이지 - 미완성||================================== //

//시간 형식
const format = 'HH:mm'; 

//사진 업로드
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList;
};

function ShopUpdate() {
  // form data 상태변수
  const [shopInfomation, setShopInfomation] =  useState();
  const id = useSelector((state) => state.user.id); 
  const ownerName = useSelector((state) => state.user.name);
  const [branchId, setBranchId]= useState(null);
  const [shopName, setShopName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [shopId, setShopId] = useState(null);
  const [shopInfo, setShopInfo] = useState(null);
  const [location, setLocation] = useState(null);
  const [businessCeo, setBusinessCeo] = useState(null);
  const [businessNumber, setBusinessNumber] = useState(null);
  const [orderCloseTime, setOrderCloseTime] = useState(null);
  const [seat, setSeat] = useState(null);
  const [openTime, setOpenTime] = useState(null);
  const [closeTime, setCloseTime] = useState(null);
  const [openDay, setOpenDay] = useState(null);
  const [shopCategory, setShopCategory ] = useState(null);
  const [photos, setPhotos] = useState([]);                    //shopImg
  const [businessPhotos, setBusinessPhotos] = useState([]);    //businessImg
  const [shopImgUrl, setShopImgUrl] = useState(null);
  const [businessImgUrl, setBusinessImgUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

useEffect(() => {
  axiosWithBaseUrl
    .get(`/owner/shop/detail/${id}`) //owner id
    .then((res) => {
      console.log(res.data);
      console.log(res.data.shopId);
      console.log(id);
      setShopInfomation(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  //등록하기
  const handleSubmit = async () => {
    //기존 정보 다 필수값
      const shopData = {
      shopName: shopName,
      openTime: openTime.format(format),
      closeTime: closeTime.format(format),
      openDay: openDay.format('YYYY-MM-DD'),
      shopInfo: shopInfo,
      shopCategory: shopCategory,
      location: location,
      seat: seat,
      phone: phone,
      ownerName: ownerName,
      businessCeo: businessCeo,
      businessNumber: businessNumber,
      orderCloseTime: orderCloseTime.format(format),
      ownerId: id,                                    // ownerId
      branchId: branchId,                             // branchId
      shopImgUrl: shopImgUrl,
      businessImgUrl: businessImgUrl                       
    };
    // formData > shopData, shopImg, businessImg
    const formData = new FormData();
    const json = JSON.stringify(shopData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("shopData", blob);
    // shopImg 파일 추가
    if (photos.length > 0) {
      formData.append('shopImg', photos[0].originFileObj);
    } else {
      formData.append('shopImg', null); // menuImg가 선택되지 않았을 때 null 값을 할당
    }
    // businessImg 파일 추가
    if (businessPhotos.length > 0) {
      formData.append('businessImg', businessPhotos[0].originFileObj);
    } else {
      formData.append('businessImg', null); // menuImg가 선택되지 않았을 때 null 값을 할당
    }

    try {
      const response = await axiosWithBaseUrl
      .post(`/owner/shop/update/${shopId}`, formData, {
       headers: {
        'Content-Type': 'multipart/form-data',
        },
        });
      console.log(response);
      console.log(formData);
      //수정 성공 시 매장 정보 페이지로 이동
      navigate('/mgt/info');
    } catch (error) {
      console.error('Error updating shop:', error);
    }
  };

  const onFinish = () => {
  };
  const handleFileChange = (info) => {
    const fileList = normFile(info);
    setPhotos(fileList);
    setBusinessPhotos(fileList);
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
    <Card  title={<div style={{ textAlign: 'center' }}>매장 수정</div>}
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
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
    
        <Form.Item label="점주id" name="ownerId" required hidden>
          <Input initialValue={id} />
        </Form.Item>
        {/* 지점 id  */}
        <Form.Item label="지점id" name="branchId" required hidden>
          <Input initialValue={shopInfo.branchId} />
        </Form.Item>
               {/* 매장카테고리 */}
          <div >
         <Form.Item label="매장카테고리" name="shopCategory" required hidden  >
          <Input initialValue={shopInfo.shopCategory} />
        </Form.Item>
        </div>
        {/* 매장명 , 수정가능*/}
        <Form.Item label="매장명" name="shopName" required  style={{ width: 'calc(135% - 0px)'}} >
          <Input initialValue={shopInfo.shopName} onChange={(e) => setShopName(e.target.value)} style={{ width: '300px' }}/>
        </Form.Item>
        {/* 매장 설명 , 수정가능*/}
        <Form.Item label="매장 설명"  name="shopInfo" required style={{ width: 'calc(170% - 0px)'}}
         rules={[
          {
          max: 50,
          whitespace: true,
          message: '50자 이내로 입력해주세요.',
          },
          ]}>
          <Input initialValue={shopInfo.shopInfo} onChange={(e) => setShopInfo(e.target.value)} />
        </Form.Item>
        {/* 지점 내 매장 위치 */}
        <Form.Item label="지점 내 위치"  name="location" required hidden >
          <Input initialValue={shopInfo.location} onChange={(e) => setLocation(e.target.value)} />
        </Form.Item>
        {/* 좌석 수, 수정가능  */}
        <Form.Item label="좌석 수" name="seat" required  style={{ width: 'calc(140% - 0px)'}}>
          <Input value={shopInfo.seat} onChange={(e) => setSeat(e.target.value)} />
        </Form.Item>
        {/* 점주 명 점주 id에서 name 가져오기  */}
        <Form.Item label="점주명" name="ownerName-" required hidden >
        <Input value={shopInfo.ownerName} />
        </Form.Item>
        {/* 매장 전화번호 */}
         <Form.Item label="매장 전화번호" name="phone" hidden >
          <Input value={shopInfo.phone}  />
        </Form.Item>  
        {/* 개업일 */}
        <Form.Item label="개업일" name="openDay" required hidden>
          <DatePicker initialValue={shopInfo.openDay} />
        </Form.Item>
        {/* 오픈시간 , 수정가능*/}
        <Form.Item label="오픈시간" name="openTime" required style={{ width: 'calc(160% - 0px)'}}>
          <TimePicker format={format} initialValue={shopInfo.openTime} value={openTime} onChange={setOpenTime} />
        </Form.Item>
        {/* 마감시간, 수정가능 */}
        <Form.Item label="마감시간" name="closeTime" required style={{ width: 'calc(160% - 0px)'}}>
          <TimePicker format={format} initialValue={shopInfo.closeTime} value={closeTime} onChange={setCloseTime} />
        </Form.Item>
        {/* 주문마감시간, 수정가능 */}
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
          ]}>
        <TimePicker format={format} initialValue={shopInfo.orderCloseTime} value={orderCloseTime} onChange={setOrderCloseTime} />
      </Form.Item>

      {/* 매장 사진, 수정가능 */}
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
            beforeUpload={() => false}  // 자동 업로드 방지
            onChange={handleFileChange}
            fileList={photos}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}></div>
            </div>
          </Upload>
        </Form.Item>
        {/* 사업주이름 */}
        <Form.Item label="사업주 이름" name="businessCeo" required hidden>
          <Input initialValue={businessCeo} />
        </Form.Item>
        {/* 사업자 등록번호 */}
        <Form.Item label="사업자 등록번호" name="businessNumber" required hidden>
          <Input initialValue={shopInfo.businessNumber}/>
        </Form.Item>

        {/* 기존 사업자 등록증 사진 */}
        <Form.Item name="businessImgUrl" hidden initialValue={shopInfo.businessImgUrl}>
          <Input />
        </Form.Item>
          {/* 기존 매장 사진 */}
        <Form.Item name="shopImgUrl" hidden initialValue={shopInfo.shopImgUrl}>
          <Input />
        </Form.Item>

        {/* 등록하기 버튼 */}
        <Form.Item>
          <Button 
          type="primary" 
          onClick={showModal}  
          style={{ backgroundColor: '#cf1322', 
          justifyContent: 'center' }}>
            수정하기
          </Button>
        {/* 등록하기 확인 모달 */}
          <Modal 
          title="매장수정" 
          okText="네"
          cancelText="취소"
          visible={isModalOpen}
          onOk={handleSubmit} 
          onCancel={handleCancel}>
          <p>매장을 수정하시겠습니까?</p>
          </Modal>
        </Form.Item>
      </Form>
      </div>
    </Card>
    </div>
  );
}

export default ShopUpdate;