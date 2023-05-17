import axios from 'axios';
import React from 'react';
import styles from '../../../assets/css/widget/reservation/ResvInfoCard.module.css';
import ResvStatusTag from '../../ui/reservation/ResvStatusTag';
import { Link, useNavigate } from 'react-router-dom';

function ResvInfoCard({data, resvId}) {
  // console.log('resvId :' + resvId);

  const navigate = useNavigate();

  const isDisabled = (status) => {
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
    if(window.confirm('예약을 취소하시겠습니까?')) {
      axios.post(`/customer/reservation/cancel/${resvId}`)
      .then(res => {
        alert("예약이 취소되었습니다.");
        navigate('/resv');
      })
      .catch(err => { // 오류 처리
        alert("오류가 발생하였습니다.");
        console.log(err);
      });
    }
    else 
      return;
  }

  return (
    <>
      {
        data && (
          <div id={styles.resvInfoWrap} className='box flex flex-col flex-gap-20'>
            <div id={styles.topWrap} className='space-between'>
              <div>{data.shopName}</div>
              <ResvStatusTag status={data.reservationStatus}/>
            </div>

            <div id={styles.middleWrap}>
              <p><span>예약 시간</span>{data.expectedTime}</p>
              <p><span>예약 인원</span>{data.people}명 (유아 {data.child}명)</p>
              <p><span>요청 사항</span>{data.memo}</p>
            </div>

            <div id={styles.bottomWrap} className='center'>
              <button 
                className='button buttonReverse' 
                disabled={isDisabled(data.reservationStatus)} 
                onClick={() => navigate(`/resv/update/${resvId}`)}
                style={isDisabled(data.reservationStatus) ? { opacity: '0.25' } : {}}
              >
                예약 변경
              </button>

              <button 
                className='button' 
                disabled={isDisabled(data.reservationStatus)} 
                onClick={confirmDelete}
                style={isDisabled(data.reservationStatus) ? { opacity: '0.25' } : {}}
              >
                예약 취소
              </button>
            </div>
          </div>
        )
      }
    </>
  );
}

export default ResvInfoCard;