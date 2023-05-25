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
              운영시간 넣어야
              {/* <p><span>TIME</span>{data.shopOpenTime.slice(0, 5)}~{data.shopCloseTime.slice(0, 5)} (주문 마감: {data.shopOrderCloseTime.slice(0, 5)})</p> */}
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