import { Button, Modal } from 'antd';
import { useState } from 'react';
import { axiosWithBaseUrl } from 'App';


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


  const handleReject = (id) => {
    axiosWithBaseUrl
      .post(`/owner/reservation/reject/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log("Reservation rejected");
        // Perform any necessary actions after rejecting the reservation
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