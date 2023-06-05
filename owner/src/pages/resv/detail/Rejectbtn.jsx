import { Button, Modal, Select } from 'antd';
import { useState } from 'react';
import { axiosWithBaseUrl } from 'App';


const Reject = ({id, fetchResvDetail}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);    // 모달 오픈
  const [rejectReason, setRejectReason] = useState(null);   // 거절 사유 상태

  
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
        fetchResvDetail();                        //reject 버튼 누르고 detail fetch 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRejectReason = (reason) => {
    setRejectReason(reason);
  };

  const rejectReasons = ['재료소진', '매장사정', '개인사정']; // 거절 사유 목록


  return (
    <>
      <Button type="primary" onClick={showModal} style={{ backgroundColor: '#cf1322' }}>
        거절
      </Button>
      <Modal 
      title="거절" 
      open={isModalOpen} 
      onOk={handleOk} 
      onCancel={handleCancel}
      okText="네"
      cancelText="취소">
        <p>예약 거절 처리하시겠습니까?</p>
        <Select placeholder="거절 사유 선택" onChange={handleRejectReason} style={{ marginTop: '10px', width: '100%' }}>
          {rejectReasons.map((reason) => (
            <Select.Option key={reason} value={reason}>
              {reason}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};
export default Reject;
