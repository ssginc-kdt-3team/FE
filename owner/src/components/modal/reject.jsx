import { Button, Modal } from 'antd';
import { useState } from 'react';
import axios from "axios";


const Reject = ({id}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleReject(id);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleReject = () => {
    axios
      .post(`http://localhost:8080/owner/reservation/reject/${id}`)
      .then((res) => {
        console.log(res.data);
        // setResv({ ...resv, status: "CANCEL" }); // 예약 상태를"CANCEL"로 업데이트
        console.log("Reservation rejected");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        거절
      </Button>
      <Modal title="거절" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>예약 거절 처리하시겠습니까?</p>
      </Modal>
    </>
  );
};
export default Reject;