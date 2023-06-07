import React from 'react';
import styled from 'styled-components';
// import styles from '../../../assets/css/ui/main/RecdShopCard.module.css';
import { Link } from 'react-router-dom';

const Div = styled.div`
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  max-width: calc(var(--device-width-ml) / 4 - 40px) !important;
  width: calc(85vw / 4 - 40px) !important;
  max-height: calc(var(--device-width-ml) / 4 - 40px) !important;
  height: calc(85vw / 4 - 40px) !important;
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  object-fit: cover; /* 여백 X */
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
      <Img src={data.shopImgUrl} alt={data.name}/>
      <H3>{data.name}</H3>
      <P>하하하하하하핳하하하하하하하하하핳핳하하하핳</P>
    </Link>
  );
}

export default RecdShopCard;