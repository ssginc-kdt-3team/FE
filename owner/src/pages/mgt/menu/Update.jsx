import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList;
};

function MenuUpdate() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [menuImgUrl, setMenuImgUrl] = useState(null);
  const [id, setId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (state) {
      setName(state.name);
      setPrice(state.price);
      setId(state.id);
      console.log(state.id);
      setMenuImgUrl(state.menuImgUrl)
    }
  }, [state]);

  const handleFileChange = (info) => {
    setPhotos(info.fileList);
  };

  const handleSubmit = async () => {
    //이름 , 가격, 기존 이미지 필수값
    const menuData  = {
      name: name,
      price: price,
      menuImgUrl: menuImgUrl
    };

    const formData = new FormData();
    const json = JSON.stringify(menuData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("menuData", blob);
    // const json = JSON.stringify(menuData);
    // const blob = new Blob([json], { type: "application/json" });
    // formData.append("menuData", blob);

    // formData.append('menuData', JSON.stringify(menuData)); // Append menuData as a JSON string
    // formData.append('menuData', JSON.stringify(menuData));
    
    if (photos.length > 0) {
      formData.append('menuImg', photos[0].originFileObj);
    } else {
      formData.append('menuImg', null); // menuImg가 선택되지 않았을 때 null 값을 할당
    }
    try {


     const response = await axios.post(`http://localhost:8080/owner/menu/update/${state.id}`, formData, {
        headers: {
            //  contentType : 'application/json'
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response);
      navigate('/mgt/info');
      // Handle success
    } catch (error) {
      console.error('Error updating menu:', error);
      console.log(formData.menuData);
      console.log(formData.price);
      console.log(formData.name);
      console.log(formData.menuImgUrl);
      // Handle error
    }
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
    <Card title="메뉴 수정">
      <Form onFinish={handleSubmit}>
        <Form.Item label="메뉴명" name="name" initialValue={state.name}>
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="가격" name="price" initialValue={state.price}>
          <Input onChange={(e) => setPrice(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="메뉴 사진"
          name="menuImg"
          rules={[{ message: '메뉴 사진을 업로드해주세요.' }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="menuImg"
            listType="picture-card"
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={photos}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item name="menuImgUrl" hidden initialValue={menuImgUrl}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={showModal}>
            수정하기
          </Button>
          <Modal title="수정" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>메뉴 정보를 수정하시겠습니까?</p>
          </Modal>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default MenuUpdate;