import React from 'react';
import styled from 'styled-components';
import noImage from '../../../assets/images/no_image.jpg';
import styles from '../../../assets/css/pages/shop/Shop.module.css';

const ContentWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;

  @media screen and (max-width: 768px) {
    opacity: 1;
  }
`;

const Title = styled.div`
  color: white;
  transition: all 0.5s;
  /* opacity: 0; */
  z-index: 94;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  /*object-fit: contain; /* 여백 O */
  object-fit: cover; /* 여백 X */
  transition: all 0.5s;
  z-index: 94;
`;

const Price = styled.div`
  color: white;
  z-index: 95;
`;

const Li = styled.li`
  /* width: 250px;
  height: 250px; */
  border-radius: 10px;
  font-size: 20px;
  
  position: relative;
  transition: all 0.5s;
  overflow: hidden;
  cursor: pointer;

  /* 호버 처리 */
  &:hover > ${ContentWrap} {
    opacity: 1;
  }
  &:hover > ${Img} {
    filter: brightness(50%); /* 이미지 어둡게 처리 */
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    ${Img} {
      filter: brightness(50%); /* 이미지 어둡게 처리 */
    }
  }
`;

function MenuCard({data}) {
  return (
    <Li id={styles.tile} className={styles.menuTile}>
      <Img src={noImage} alt=''/>
      <ContentWrap className='center flex-col flex-gap-20'>
        <Title>{data.menuName}</Title>
        <Price>{data.menuPrice}원</Price>
      </ContentWrap>
    </Li>
  );
}

export default MenuCard;