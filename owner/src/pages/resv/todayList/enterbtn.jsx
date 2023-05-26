import { Button, Modal } from 'antd';
import { useState } from 'react';
import { axiosWithBaseUrl } from "App";

const Enter = ({id, fetchResTdvList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleEnter(id);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleEnter = (id) => {
    axiosWithBaseUrl
      .post(`/owner/reservation/enter/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log("입장완료");
        fetchResTdvList(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
       입장
      </Button>
      <Modal title="입장" 
      open={isModalOpen} 
      onOk={handleOk} 
      onCancel={handleCancel}>
        <p>입장 처리하시겠습니까?</p>
      </Modal>
    </>
  );
};
export default Enter;