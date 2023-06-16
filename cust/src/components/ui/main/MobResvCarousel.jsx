import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from '../../../assets/css/ui/main/MobResvCarousel.module.css';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import axios from 'axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import MobResvCard from './MobResvCard';

const settings = {
  dots: false,
  infinite: false,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
	prevArrow : '',	// 이전 화살표 모양 설정
	nextArrow : '', // 다음 화살표 모양 설정
};

function MobResvCarousel() {
  const loginInfo = useRecoilValue(loginState);

  const navigate = useNavigate();

  const [resvList, setResvList] = useState(null);

  useEffect(() => {
    if(loginInfo.id !== -1) {
      axios.get(`/customer/reservation/listActive/${loginInfo.id}/1`) // 2는 사용자 id
      .then(res => {
        // console.log(res.data);
        setResvList(res.data.content);
      })
      .catch(err => console.log(err))
    }
  }, [loginInfo]);

  return (
    <div id={styles.carouselWrap}>
      {
        loginInfo.id !== -1 ? ( // 로그인 되어 있고
          resvList && resvList.length !== 0 ? ( // 리스트가 있으면
            <Slider {...settings} className={styles.sliderWrap}>
              {
                resvList.map( data => (
                  <MobResvCard key={data.reservationId} data={data}/>
                ))
              }
            </Slider>
          )
          : ( // 리스트가 없으면
              <div className={`${styles.infoMessageWrap} box border-box center`}>
                <div className='center flex-col flex-gap-32'>
                  현재 예약 내역이 없습니다.
                  <Button 
                    type='primary' 
                    className='button' 
                    onClick={() => navigate('/resv/add')}
                  >
                    예약하기
                  </Button>
                </div>
              </div>
          )
        )
        : ( // 로그인이 되어있지 않으면
            <div className={`${styles.infoMessageWrap} box border-box center`}>
              <div className='center flex-col flex-gap-32'>
                로그인이 필요합니다.
                <Button 
                  type='primary' 
                  className='button' 
                  onClick={() => navigate('/login')}
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

export default MobResvCarousel;