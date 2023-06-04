import { Button, Modal } from 'antd';
import { useState } from 'react';
import { axiosWithBaseUrl } from "App";

const Enter = ({ id, fetchResTdvList, reservationDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTime = new Date();                               // 현재시간
  const resDate = new Date(reservationDate);                    // 예약시간

  //모달 - 정상, 경고
  const showModal = () => {
    if (currentTime > resDate) {                                //현재시간이 예약시간 이후인 경우 - 입장 모달
      setIsModalOpen(true);
    } else {
      Modal.error({                                              //현재시간이 예약시간 이전인 경우 - 경고 모달
        title: '완료 처리 불가',
        content: '예약시간 이전에는 입장 완료 처리가 불가합니다.',
        okText : '닫기'
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

  //입장완료 처리 API
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
      {/* 정상 처리 모달 */}
      <Modal
        title="입장"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="네"
        cancelText="취소"
      >
        <p>입장 처리하시겠습니까?</p>
      </Modal>
    </>
  );
};

export default Enter;
