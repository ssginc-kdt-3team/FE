import React, { useEffect, useState } from 'react';
import styles from '../../../assets/css/ui/main/EventCarousel.module.css';
import axios from 'axios';
import Slider from 'react-slick';
import '../../../assets/css/ui/slick-dots.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover : true, // 슬라이드 이동	시 마우스 호버하면 슬라이더 멈추게 설정
  // vertical : true, // 세로 방향 슬라이드 옵션
  slidesToShow: 1,
  slidesToScroll: 1,
};

function EventCarousel() {
  const [branchList, setBranchList] = useState(null);

  useEffect(() => {
    axios.get('/branch/all')
    .then(res => {
      console.log(res.data);
      setBranchList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div id={styles.carouselWrap} className='box border-box'>
      <Slider {...settings} dotsClass='slick-dots' className={styles.sliderWrap}>
        <div className={styles.cardWrap}>1</div>
        <div className={styles.cardWrap}>2</div>
        <div className={styles.cardWrap}>3</div>
      </Slider>
    </div>
  );
}

export default EventCarousel;  