import React from 'react';
import { cashFormat } from '../../../utils/format';

function CouponCard({data}) {
  return (
    <li className='box'>
      <div className='space-between'>
        <h3>{data.couponName}</h3>
        <span style={{ color: 'var(--description)'}}>{data.couponCode}</span>
      </div>
      <p style={{ color: 'var(--description)'}}>{data.givenDay} ~ {data.outDay}</p>

      <h1 style={{ color: 'var(--main)' }}>{cashFormat(data.discountValue)}</h1>
    </li>
  );
}

export default CouponCard;