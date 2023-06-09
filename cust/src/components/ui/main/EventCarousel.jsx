import React, { useEffect, useState } from 'react';
import styles from '../../../assets/css/ui/main/EventCarousel.module.css';
import axios from 'axios';
import Slider from 'react-slick';
import '../../../assets/css/ui/slick-dots.css';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left;
  display: block !important;
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: false,
  autoplaySpeed: 4000,
  pauseOnHover : true, // 슬라이드 이동	시 마우스 호버하면 슬라이더 멈추게 설정
  // vertical : true, // 세로 방향 슬라이드 옵션
  slidesToShow: 1,
  slidesToScroll: 1,
};

function EventCarousel() {
  const [eventList, setEventList] = useState(null);

  useEffect(() => {
    axios.get('/event/banners')
    .then(res => {
      console.log(res.data);
      setEventList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div id={styles.carouselWrap} className='box'>
      <Slider {...settings} dotsClass='slick-dots' className={styles.sliderWrap}>
        {
          eventList && eventList.map( event => (
            <Img key={event.id} src={event.bannerUrl} alt={event.title}/>
          ))
        }
      </Slider>
    </div>
  );
}

export default EventCarousel;  