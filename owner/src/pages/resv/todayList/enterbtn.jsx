import { Button, Modal, Alert } from 'antd';
import { useState } from 'react';
import { axiosWithBaseUrl } from "App";

const Enter = ({ id, fetchResTdvList, reservationDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTime = new Date();
  const resDate = new Date(reservationDate);

  //모달
  const showModal = () => {
    if (currentTime > resDate) {   //현재시간이 예약시간 이전인 경우 
      setIsModalOpen(true);
    } else {
      Modal.error({
        title: '완료 처리 불가',
        content: '예약시간 이전에는 입장 완료 처리가 불가합니다.',
      });
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleEnter(id);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //입장완료 처리
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
    {/* 입장 버튼 */}
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: '#cf1322' }}
      >
        입장
      </Button>
      {/* 모달 내용 */}
      <Modal
        title="입장"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>입장 처리하시겠습니까?</p>
      </Modal>
    </>
  );
};

export default Enter;