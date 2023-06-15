import axios from 'axios';
import React, { useState } from 'react';
import styles from '../../../assets/css/ui/reservation/ResvInfoCard.module.css';
import ResvStatusTag from '../../ui/reservation/ResvStatusTag';
import { useNavigate } from 'react-router-dom';
import AddReview from '../../modal/reservation/AddReview';
import { Button } from 'antd';
import { canUpdate } from '../../../utils/reservation/reservationValidation';
import { confirm, error, success } from '../../../utils/notification';

function ResvInfoCard({data, resvId}) {
  // console.log('resvId :' + resvId);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false); // 새로고침을 대신하여 후기가 등록되면 후기등록 버튼 없앤다

  const isDisabled = (status) => {
    // if(data)
    //   canUpdate(data.expectedTime.slice(0, 19));

    console.log('isDisabled :' + status);
    if(status === 'RESERVATION')
      return false;

    return true;
  };

  // const cancelBtn = {
  //   opacity: '0.25',
  //   ':hover': {
  //     backgroundColor: 'var(--main)'
  //   }
  // };

  const confirmDelete = () => {
    confirm('예약을 취소하시겠습니까?', () => {
      axios.post(`/customer/reservation/cancel/${resvId}`)
      .then(res => {
        success("예약이 취소되었습니다.");
        navigate('/resv');
      })
      .catch(err => { // 오류 처리
        error("오류가 발생하였습니다.");
        console.log(err);
      });
    })
  }

  return (
    <>
      {
        data && (
          <div id={styles.resvInfoWrap} className='box shadow-box flex flex-col flex-gap-20'>
            <div id={styles.topWrap} className='space-between'>
              <div>{data.shopName}</div>
              <ResvStatusTag status={data.reservationStatus}/>
            </div>

            <div id={styles.middleWrap} className='flex flex-col'>
              <p><span>예약 시간</span>{data.expectedTime.slice(0, 19)}</p>
              <p><span>예약 인원</span>{data.people}명 (유아 {data.child}명)</p>
              <p><span>요청 사항</span>{data.memo}</p>
            </div>

            <div id={styles.bottomWrap} className='center'>
              <Button 
                className='button buttonReverse' 
                disabled={(isDisabled(data.reservationStatus) || !canUpdate(data.expectedTime.slice(0, 19)))} 
                onClick={() => navigate(`/resv/update/${resvId}`)}
                style={(isDisabled(data.reservationStatus) || !canUpdate(data.expectedTime.slice(0, 19))) ? { opacity: '0.25' } : {}}
              >
                예약 변경
              </Button>

              <Button 
                className='button' 
                type="primary" 
                disabled={isDisabled(data.reservationStatus)} 
                onClick={confirmDelete}
                style={isDisabled(data.reservationStatus) ? { opacity: '0.25' } : {}}
              >
                예약 취소
              </Button>

              <Button 
                className='button' 
                type="primary" 
                onClick={() => setIsModalOpen(true)}
                style={!isReviewed && (data.reservationStatus === 'DONE' && data.canReview) ? { display: 'block' } : { display: 'none' }}
              >
                후기 등록
              </Button>
            </div>
          </div>
        )
      }

      {/* 리뷰 등록 모달 */}
      <AddReview isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isReviewed={isReviewed} setIsReviewed={setIsReviewed}/>
    </>
  );
}

export default ResvInfoCard;