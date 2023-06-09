import React from 'react';
import styled from 'styled-components';
import noImage from '../../../assets/images/no_image.jpg';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/css/pages/shop/Shop.module.css';
import { Button } from 'antd';

const ContentWrap = styled.div`
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  /* opacity: 1; */

  @media screen and (max-width: 768px) {
    opacity: 1;
  }
`;

const Title = styled.div`
  color: white;
  transition: all 0.5s;
  /* opacity: 0; */
  /* z-index: 95; */
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  /* border: 1px soild var(--border); */
  border-radius: var(--border-radius);
  /*object-fit: contain; /* 여백 O */
  object-fit: cover; /* 여백 X */
  /* filter: brightness(50%); 이미지 어둡게 처리 */
  transition: all 0.5s;
  /* z-index: 95; */
`;

const Btn = styled.button`
  width: var(--button-width-s);
  height: var(--button-height-s);
  line-height: calc(var(--button-height-s) - 2px);
  /* background-color: var(--gray); */
  /* position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%); */
  /* opacity: 0; */
  /* z-index: 96; */
`;

const Li = styled.li`
  /* width: 250px;
  height: 250px; */
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  font-size: 20px;
  
  position: relative;
  transition: all 0.5s;
  overflow: hidden;
  cursor: pointer;

  /* 호버 처리 */
  &:hover > ${ContentWrap} {
    opacity: 1;
  }
  /* &:hover > ${Title} {
    opacity: 1;
  }
  &:hover > ${Btn} {
    opacity: 1;
    z-index: 96;
  } */
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


function BranchShopCard({data, isShopCard=false, branchId=1}) {
  const navigate = useNavigate();

  return (
    <Li id={styles.tile}>
      <Img src={isShopCard ? data.shopImgUrl ? data.shopImgUrl : noImage : data.branchImgUrl ? data.branchImgUrl : noImage} alt='' onClick={() => navigate(isShopCard ? `/shop/${branchId}/${data.id}` : `/shop/${data.id}`)}/>
      <ContentWrap className='center flex-col flex-gap-20'>
        <Title onClick={() => navigate(isShopCard ? `/shop/${branchId}/${data.id}` : `/shop/${data.id}`)}>{data.name}</Title>
        {
          isShopCard ? (
            <Button 
              className='button buttonReverse buttonTransparent button-s'
              onClick={() => navigate("/resv/add", { state : { branchId: `${branchId}`, shopId: `${data.id}` }})}
              disabled={data.shopStatus === 'OPEN' ? false : true}
              style={data.shopStatus === 'OPEN' ? {} : { opacity: '0.25' }}
            >
              예약하기
            </Button>
          )
          : ''
        }
      </ContentWrap>
    </Li>
  );
}

export default BranchShopCard;