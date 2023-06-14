import React from 'react';
import styles from '../../../assets/css/ui/reservation/ShopInfoCard.module.css';
import noImage from '../../../assets/images/no_image.jpg';

function ShopInfoCard({data}) {
  return (
    <>
      {
        data && (
          <div id={styles.shopInfoWrap} className='box shadow-box flex flex-col flex-gap-20'>
            <div id={styles.topWrap}>매장 정보</div>

            <div id={styles.bottomWrap} className='flex flex-col'>
              <div>
                <img src={data.shopImgUrl ? data.shopImgUrl : noImage} alt={data.shopName}/>
              </div>
              <p><span>매장명</span>{data.shopName}</p>
              <p><span>위치</span>{data.shopLocation}</p>
            </div>
          </div>
        )
      }
    </>
  );
}

export default ShopInfoCard;