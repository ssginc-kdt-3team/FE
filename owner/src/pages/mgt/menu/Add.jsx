import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form, Input, Upload, Modal, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { axiosWithBaseUrl } from 'App';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList;
};

function MenuAdd() {
  // form data 상태변수
  const [menuName, setMenuName] = useState(null);
  const [menuPrice, setMenuPrice] = useState(null);
  const [ownerId, setOwenrId] = useState(14);
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const onFileUpload = async () => {
    const menuData = {
      name: menuName,
      price: menuPrice,
      ownerId: ownerId
    };
  //form data > branchData, branchImg
    const formData = new FormData();
    const json = JSON.stringify(menuData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("menuData", blob);
  
    photos.forEach((file) => {
      formData.append('menuImg', file.originFileObj);
    });
  
    try {
      const response = await axiosWithBaseUrl
      .post('/owner/menu/add', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response);
      navigate('/mgt/info');
    } catch (error) {
      console.error('Error adding menu:', error);
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
  
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
    <Card
      title={
        <div style={{ textAlign: "center", marginBottom: "5px" }}>
          <Typography.Title level={4}>메뉴 등록</Typography.Title>
        </div>
      }
      style={{
        width: '600px',
         height:'500px',
         marginTop: '100px'
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
        onFinish={onFinish}
      >
        <Form.Item label="점주id" name="shopName" required  style={{ display: 'none' }}>
          <Input value={ownerId} onChange={(e) => setOwenrId(e.target.value)} style={{ display: 'none' }} />
        </Form.Item>
        <Form.Item label="메뉴명" name="menuName" required>
          <Input value={menuName} onChange={(e) => setMenuName(e.target.value)} />
        </Form.Item>
     
        <Form.Item label="가격" name="menuPrice" required>
          <Input value={menuPrice} onChange={(e) => setMenuPrice(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="메뉴 사진"
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
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>          <Button type="primary" onClick={showModal} style={{ backgroundColor: '#cf1322' }}>
            등록하기
          </Button>
          <Modal 
          title="등록" 
          visible={isModalOpen} 
          onOk={handleOk} 
          okText="네"
          cancelText="취소"
          onCancel={handleCancel}>
            <p>메뉴를 등록하시겠습니까?</p>
          </Modal>
        </Form.Item>
      </Form>
    </Card>
    </div>
  );
}

export default MenuAdd;
