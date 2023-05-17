import React from 'react';
import styles from '../../../assets/css/widget/shop/ShopInfoCard.module.css'
import noImage from '../../../assets/images/no_image.jpg';

function ShopInfoCard({data}) {
  return (
    <>
    {
      data && (
        <div id={styles.shopInfoWrap}>
          <div id={styles.topWrap} className='flex flex-row flex-gap-40'>
            <img src={noImage} alt=''/>
            <div>
              <p><span>TIME</span>{data.shopOpenTime}~{data.shopCloseTime} (주문 마감: {data.shopOrderCloseTime})</p>
              <p><span>LOCATION</span>{data.shopLocation}</p>
              <p><span>CALL</span>{data.shopCall}</p>
              <p>{data.shopInfo}</p>
            </div>
          </div>
    
        </div>
      )
    }
    </>
  );
}

export default ShopInfoCard;