import React, { useEffect, useState } from 'react';
import PageSubTitle from '../../ui/PageSubTitle';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from '../../../assets/css/ui/main/ResvInfoCarousel.module.css';
import next from '../../../assets/images/icons/next.png';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import axios from 'axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const settings = {
  dots: false,
  infinite: true,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
	prevArrow : <img src={next} alt='previous'/>,	// 이전 화살표 모양 설정
	nextArrow : <img src={next} alt='next'/>, // 다음 화살표 모양 설정
};

function ResvInfoCarousel() {
  const loginInfo = useRecoilValue(loginState);

  const navigate = useNavigate();

  const [resvList, setResvList] = useState(null);

  useEffect(() => {
    if(loginInfo.id !== -1) {
      axios.get(`/customer/reservation/listActive/${loginInfo.id}/1`) // 2는 사용자 id
      .then(res => {
        console.log(res.data);
        setResvList(res.data.content); // 
      })
      .catch(err => console.log(err))
    }
  }, [loginInfo]);

  return (
    <div id={styles.carouselWrap} className='box border-box center-h flex-col'>
      <PageSubTitle title='예약 내역'/>

      {
        loginInfo.id !== -1 ? ( // 로그인 되어 있고
          resvList && resvList.length !== 0 ? ( // 리스트가 있으면
            <Slider {...settings} className={styles.sliderWrap}>
              {
                resvList.map( data => (
                  <div key={data.reservationId}>
                    {/* 매장명 */}
                    <h2>{data.shopName}</h2>

                    {/* 예약 시간 */}
                    <label>예약 시간</label>
                    <p>{data.expectedDate} {data.expectedTime}</p>
                    
                    {/* 예약 인원 */}
                    <label>예약 인원</label>
                    <p>{data.people}명 (유아 {data.child}명)</p>

                    {/* 버튼 */}
                    <Button type='primary' className='button button-s' onClick={() => navigate(`/resv/${data.reservationId}`)}>상세보기</Button>
                  </div>
                ))
              }
            </Slider>
          )
          : ( // 리스트가 없으면
              <div className={`${styles.infoMessageWrap} center`}>
                <div className='flex flex-col flex-gap-32'>
                  현재 예약 내역이 없습니다.
                  <Button 
                    type='primary' 
                    className='button' 
                    onClick={() => navigate('/resv/add')}
                    style={{width: 'var(--button-width)'}}
                  >
                    예약하기
                  </Button>
                </div>
              </div>
          )
        )
        : ( // 로그인이 되어있지 않으면
            <div className={`${styles.infoMessageWrap} center`}>
              <div className='center flex-col flex-gap-32'>
                로그인이 필요합니다.
                <Button 
                  type='primary' 
                  className='button' 
                  onClick={() => navigate('/login')}
                  style={{width: 'var(--button-width)'}}
                >
                  로그인
                </Button>
              </div>
            </div>
        )
      }
          </div>
        );
      }

export default ResvInfoCarousel;