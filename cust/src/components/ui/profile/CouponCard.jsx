import React from 'react';
import { cashFormat } from '../../../utils/format';
import coupon from '../../../assets/images/coupon.png';
import styled from 'styled-components';

const Li = styled.li`
  width: var(--coupon-width);
  padding: 20px;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  background: url(${coupon});
  background-position: right;
  background-size: auto 100%;
  background-repeat: no-repeat;

  @media screen and (max-width: 768px) {
    
  }
`;

const Span = styled.span`
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

function CouponCard({data}) {
  return (
    <Li className='box space-between'>
      <div className=''>
        <h3>{data.couponName}</h3>
        <p style={{ color: 'var(--description)'}}>{data.givenDay} ~ {data.outDay}</p>
        <h1 style={{ color: 'var(--main)' }}>{cashFormat(data.discountValue)}</h1>
      </div>

      <div style={{transform: 'rotate(-90deg)', position: 'relative'}}>
        <Span>{data.couponCode}</Span>
      </div>
    </Li>
  );
}

export default CouponCard;