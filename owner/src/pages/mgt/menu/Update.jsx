import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { axiosWithBaseUrl } from 'App';

// ==================================|| MenuUpdate, 메뉴 수정 ||================================== //


const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList;
};

function MenuUpdate() {
  const { state } = useLocation();       // 이전 페이지(MENULIST)의 state를 받아옴
  const navigate = useNavigate(); 
  //수정 상태변수
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
    //이름 , 가격, 기존 이미지url필수값
    const menuData  = {
      name: name,
      price: price,
      menuImgUrl: menuImgUrl
    };

    const formData = new FormData();
    const json = JSON.stringify(menuData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("menuData", blob);

    if (photos.length > 0) {
      formData.append('menuImg', photos[0].originFileObj);
    } else {
      formData.append('menuImg', null); // menuImg가 선택되지 않았을 때 null 값을 할당
    }

    try {


     const response = await 
     axiosWithBaseUrl
     .post(`/owner/menu/update/${state.id}`, formData, {
        headers: {
            //  contentType : 'application/json'
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response);
      navigate('/mgt/info');
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

// 모달
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
          <Modal
            title="수정"
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            okText="네"
            cancelText="취소">
            <p>메뉴 정보를 수정하시겠습니까?</p>
          </Modal>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default MenuUpdate;