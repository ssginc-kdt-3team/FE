import React from 'react';
import styles from '../../../assets/css/widget/shop/ShopInfoCard.module.css'
import noImage from '../../../assets/images/no_image.jpg';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function ShopInfoCard({data}) {
  const navigate = useNavigate();

  return (
    <>
    {
      data && (
        <div id={styles.shopInfoWrap}>
          <div id={styles.topWrap} className='grid-2c flex-gap-40'>
            <img src={data.shopImg ? data.shopImg : noImage} alt=''/>
            <div>
              <p><span>TIME</span>{data.shopOpenTime.slice(0, 5)}~{data.shopCloseTime.slice(0, 5)} (주문 마감: {data.orderCloseTime.slice(0, 5)})</p>
              <p><span>LOCATION</span>{data.shopLocation}</p>
              <p><span>CALL</span>{data.phone}</p>
              <p>{data.shopInfo}</p>
              <Button 
                type="primary"
                className='button'
                onClick={() => navigate("/resv/add", { state : { branchId: `${1}`, shopId: `${data.shopId}` }})}
              >
                예약하기
              </Button>
            </div>
          </div>
    
        </div>
      )
    }
    </>
  );
}

export default ShopInfoCard;