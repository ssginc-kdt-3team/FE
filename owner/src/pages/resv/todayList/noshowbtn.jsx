import { Button, Modal } from 'antd';
import { useState } from 'react';
import { axiosWithBaseUrl } from "App";


const Noshow = ({ id, fetchResTdvList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleNoshow(id);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleNoshow = (id) => {
    axiosWithBaseUrl
      .post(`/owner/reservation/noshow/${id}`)
      .then((res) => {
        console.log(res.data);
        // setResv({ ...resv, status: "NOSHOW" }); // 예약 상태를"CANCEL"로 업데이트
        console.log("Reservation noshow");
        fetchResTdvList(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button type="danger" onClick={showModal}>
        노쇼
      </Button>
      <Modal title="노쇼" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>노쇼 처리하시겠습니까?</p>
      </Modal>
    </>
  );
};
export default Noshow;