import React from 'react';
import styles from '../../../assets/css/widget/reservation/ShopInfoCardR.module.css';
import noImage from '../../../assets/images/no_image.jpg';

function ShopInfoCardR({data}) {
  return (
    <>
      {
        data && (
          <div id={styles.shopInfoWrap} className='box flex flex-col flex-gap-20'>
            <div id={styles.topWrap}>매장 정보</div>

            <div id={styles.bottomWrap}>
              <img src={noImage} alt={data.shopName}/>
              <p><span>매장명</span>{data.shopName}</p>
              <p><span>위치</span>{data.shopLocation}</p>
            </div>
          </div>
        )
      }
    </>
  );
}

export default ShopInfoCardR;