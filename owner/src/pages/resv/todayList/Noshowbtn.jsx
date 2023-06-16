import { Button, Modal } from 'antd';
import { useState } from 'react';
import { axiosWithBaseUrl } from "App";

// ==================================|| Noshowbtn, 노쇼처리버튼 ||================================== //

const Noshow = ({ id, fetchResTdvList, reservationDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const currentTime = new Date();
  const resDate = new Date(reservationDate);

  //모달
  const showModal = () => {
    if (currentTime > resDate) {        
      setIsModalOpen(true);                //현재시간이 예약시간 이후인 경우 
    } else {
      Modal.warning({                       //현재시간이 예약시간 이전인 경우 
        title: '노쇼 처리 불가',
        content: '예약시간 이전에는 노쇼 처리가 불가합니다.',
        okText : '닫기'
      });
    }
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
        console.log("노쇼 완료");
        fetchResTdvList(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button 
      type="primary" 
      onClick={showModal}
      style={{ backgroundColor: '#ffd666' }}
      >
       노쇼
      </Button>
      <Modal
      title="노쇼"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="네"
      cancelText="취소"
      sx={{
        '.ant-btn-primary': {
          backgroundColor: 'red',
          borderColor: 'red',
        },
      }}
    >
  <p>노쇼 처리하시겠습니까?</p>
</Modal>
    </>
  );
};
export default Noshow;
