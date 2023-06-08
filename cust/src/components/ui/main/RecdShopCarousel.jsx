import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../state/loginState';
import { useNavigate } from 'react-router-dom';
import next from '../../../assets/images/icons/next.png';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';
import RecdShopCard from './RecdShopCard';
import styles from '../../../assets/css/ui/main/RecdShopCarousel.module.css';

const Div = styled.div`
  max-width: var(--carousel-max-width);
  width: var(--carousel-width);
  margin: 0 auto;
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    gap: 20px;
  }
`;

const settings = {
  dots: false,
  infinite: true,
  autoplay: false,
  slidesToShow: 4,
  slidesToScroll: 4,
	prevArrow : <img src={next} alt='previous'/>,	// 이전 화살표 모양 설정
	nextArrow : <img src={next} alt='next'/>, // 다음 화살표 모양 설정
  responsive: [ // 반응형 웹 구현 옵션
		{ 
			breakpoint: 768, //화면 사이즈 768px일 때
			settings: {	
				//위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
				slidesToShow: 2,
        slidesToScroll: 2,
			} 
		}
	]
};

function RecdShopCarousel() {
  const loginInfo = useRecoilValue(loginState);

  const navigate = useNavigate();

  const [recdShopList, setRecdShopList] = useState(null);

  useEffect(() => {
    axios.post(`/shop/list/${loginInfo.id}`)
    .then(res => {
      console.log(res.data);
      setRecdShopList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [loginInfo])

  return (
    <Div>
      <Slider {...settings} className={styles.sliderWrap}>
        {
          recdShopList && recdShopList.map( shop => (
            <RecdShopCard key={shop.shopId} data={shop}/>
            // <img src={shop.shopImgUrl} alt={shop.name}/>
          ))
        }
      </Slider>
    </Div>
  );
}

export default RecdShopCarousel;