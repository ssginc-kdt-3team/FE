import React, { useRef, useState, useEffect  } from 'react';
import { useNavigate, useParams, useLocation  } from 'react-router-dom';
import { Card, Button,  TimePicker, Form, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { axiosWithBaseUrl } from 'App';
import dayjs from 'dayjs';

// ==============================|| BranchUpdate - 지점수정, 미완성||============================== //

const format = 'HH:mm';  //시간 형식

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList;
};

function BranchUpdate() {
  // form data 상태변수
  const { state } = useLocation(); 
  const [branchName, setBranchName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [openingTime, setOpeningTime] = useState(dayjs('12:00', format));
  const [closingTime, setClosingTime] = useState(dayjs('12:00', format));
  const [openingDate, setOpeningDate] = useState(dayjs()); 
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [branchImgUrl, setBranchImgUrl] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [id, setId] = useState(null);

  //detail 값 가져오기
  useEffect(() => {
    if (state) {
      setBranchName(state.branchName);
      setPhone(state.phone);
      setOpeningTime(state.openingTime);
      setClosingTime(state.closingTime);
      setId(state.id);
      // console.log(state.id);
      setBranchImgUrl(state.branchImgUrl)
    }
  }, [state]);
  
  const onFileUpload = async () => {
    const branchData = {
      phone: phone,
      openTime: openingTime.format(format),
      closeTime: closingTime.format(format),
      openDay: openingDate.format('YYYY-MM-DD'),
    };
  
    // updateDTO + form-data(branchImg) 형식으로 수정하기
    const formData = new FormData();
    const json = JSON.stringify(branchData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("branchData", blob);
  
    photos.forEach((file) => {
      formData.append('branchImg', file.originFileObj);
    });
  
    try {
      const response = await axiosWithBaseUrl
      .post(`/admin/update/${state.id}`, formData, {
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


  // updateDTO : 전화번호, 개장시간, 폐장시간, formdata : 사진, 만 수정가능
  return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <Card
      title="지점 정보 수정"
      style={{
        width: 800,
        textAlign: "center"
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
          justifyContent: "center", alignItems: "center" 
        }}
        onFinish={onFinish}
      >
          {/* 이미지, 번호, 개장시간, 폐장 시간 만 수정가능 */}
           {/* <Form.Item label="기존지점사진" name="branchImgUrl" hidden>
          <Input name="branchImgUrl" initialValue={branchImgUrl} onChange={(e) => setBranchImgUrl(e.target.value)}/>
        </Form.Item>
        <Form.Item label="지점id" name="branchId" hidden>
          <Input name="branchId" initialValue={id} onChange={(e) => setId(e.target.value)}/>
        </Form.Item>  */}
        {/* <Form.Item label="지점명" name="name" >
          <Input name="name" initialValue={branchName} onChange={(e) => setBranchName(e.target.value)} readOnly/>
        </Form.Item> */}
       {/* 지점 전화번호  */}
        <Form.Item
          label="전화번호"
          name="phone"
          rules={[
            { required: true, message: '전화번호를 입력해주세요.' },
            { len: 11, message: '전화번호는 11자리여야 합니다.' },
          ]}
        >
          <Input   name="phone" initialValue={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>
        {/* 개장시간 */}
        <Form.Item label="개장시간" name="openingTime" required >
          <TimePicker format={format} value={openingTime} onChange={setOpeningTime}  />
        </Form.Item>
        {/* 폐장시간 */}
        <Form.Item label="폐장시간" name="closingTime" required>
          <TimePicker format={format} value={closingTime} onChange={setClosingTime} />
        </Form.Item>
        {/* 지점사진 */}
        <Form.Item
          label="지점 사진"
          name="photos"
          rules={[
            { message: '지점 사진을 업로드해주세요.' },
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
        {/* 수정하기 버튼 */}
        <Form.Item>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary" onClick={showModal}  style={{ backgroundColor: '#cf1322' }}>
            수정하기
          </Button>
          </div>
          <Modal title="지점수정" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>지점 정보를 수정하시겠습니까?</p>
          </Modal>
        </Form.Item>
      </Form>
    </Card>
    </div>
  );
}

export default BranchUpdate;