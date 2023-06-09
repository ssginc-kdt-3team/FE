import { Modal, Rate } from 'antd';
import React, { useReducer } from 'react';
import styles from '../../../assets/css/modal/Modal.module.css';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { isEmpty, isPointSelected } from '../../../utils/reservation/reviewValidation';
import { Button } from 'antd';
import { error, success } from './../../../utils/notification';

// action에 따라 안에 데이터를 어떻게 변화시킬지 설정
const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const initialReviewInfo = { // 초기값을 가지는 객체
  userId: 0,
  reservationId: 0, 
  title: "",
  contents: "",
  point: 0
};

function AddReview({isModalOpen, setIsModalOpen, isReviewed, setIsReviewed}) {
  const loginInfo = useRecoilValue(loginState); // 로그인 정보 가져와서
  initialReviewInfo.userId = loginInfo.id; // 초기값의 userId 설정

  const { resvId } = useParams(); // 예약 id 가져와서
  initialReviewInfo.reservationId = resvId; // 초기값의 reservationId로 설정

  const [reviewInfo, dispatch] = useReducer(reducer, initialReviewInfo);
  // const [point, setPoint] = useState(0);

  const handleOnChange = (e) => {
    // console.log(e.target);
    dispatch(e.target); // 데이터를 변화시키기 위한 동작을 할 dispatch, action 값을 보냄
  };

  const handlePoint = (e) => {
    // console.log(e);
    // setPoint(e);
    dispatch({ name: 'point', value: e });
  }
  
  const handleClose = () => {
    setIsModalOpen(false);

    // 모달이 닫히면 내용 초기화
    dispatch({ name: 'point', value: 0 });
    dispatch({ name: 'title', value: '' });
    dispatch({ name: 'contents', value: '' });
  }

  const handleReviewSubmit = () => {
    if(!isEmpty(reviewInfo.title, reviewInfo.contents)) { // 내용이 입력되어 있고
      if(isPointSelected(reviewInfo.point)) { // 별점이 선택되어 있으면
        // console.log(reviewInfo);
    
        axios.post('customer/review/add', reviewInfo)
        .then(res => {
          // console.log(res);
          if(res.data) {
            success('후기가 등록되었습니다.');
            handleClose();
            setIsReviewed(true);
          }
        })
        .catch(err => {
          console.log(err);
          error('오류가 발생하였습니다.');
        })
      }
    }

    // console.log(point);
  }
  
  return (
    <Modal
      className={styles.modalWrap}
      title="후기 등록"
      centered
      open={isModalOpen}
    >
      <form id={styles.addReviewForm}>
        <Rate onChange={handlePoint} value={reviewInfo.point} style={{ fontSize: '30px' }}></Rate>
        <input 
          id={styles.reviewTitle} 
          name='title' onChange={handleOnChange} 
          value={reviewInfo.title}
          maxLength="40" 
          placeholder='제목'
        >
        </input>

        <textarea 
          id={styles.reviewContent} 
          name='contents' 
          value={reviewInfo.contents} 
          type='text' 
          cols={50} 
          rows={6} 
          maxLength="100" 
          placeholder='내용'
          onChange={handleOnChange}
        >
        </textarea>
      </form>

      <div id={styles.buttonWrap}>
        <Button className='button buttonReverse button-s' onClick={handleClose}>취소</Button>
        <Button type="primary" className='button button-s' onClick={handleReviewSubmit}>완료</Button>
      </div>
    </Modal>
  );
}

export default AddReview;