import React from 'react';
import styled from 'styled-components';
// import styles from '../../../assets/css/ui/main/RecdShopCard.module.css';
import { Link } from 'react-router-dom';

const Div = styled.div`
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  max-width: calc(var(--carousel-max-width) / 4 - 40px) !important;
  width: calc(var(--carousel-width) / 4 - 40px) !important;
  max-height: calc(var(--carousel-max-width) / 4 - 40px) !important;
  height: calc(var(--carousel-width) / 4 - 40px) !important;
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  object-fit: cover; /* 여백 X */
  
  @media screen and (max-width: 768px) {
    max-width: calc((100vw - 60px) / 2) !important;
    width: calc((100vw - 60px) / 2) !important;
    max-height: calc((100vw - 60px) / 2) !important;
    height: calc((100vw - 60px) / 2) !important;
  }
`;

const H3 = styled.h3`
  margin-top: 16px;
  font-weight: 500;
  text-align: center;
`;

const P = styled.p`
  text-align: center;
`;

function RecdShopCard({data}) {
  return (
    <Link to={`/shop/${data.branchId}/${data.shopId}`}>
      <Img src={data.shopImgUrl} alt={data.shopName}/>
      <H3>{data.shopName}</H3>
      <P>{data.shopInfo}</P>
    </Link>
  );
}

export default RecdShopCard;