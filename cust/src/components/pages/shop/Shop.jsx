import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../ui/PageTitle';
import ShopInfoCard from '../../widget/shop/ShopInfoCard';
import MenuCard from '../../widget/shop/MenuCard';
import ReviewCard from '../../widget/shop/ReviewCard';
import { axiosForJson } from '../../../index';
import styles from '../../../assets/css/pages/shop/Shop.module.css';
import styled from 'styled-components';
import PageSubTitle from '../../ui/PageSubTitle';

function Shop() {
  const { shopId } = useParams();

  const [shopInfo, setShopInfo] = useState(null);
  const [menuList, setMenuList] = useState(null);
  const [reviewList, setReviewList] = useState(null);

  const [isTileWrapOpen, setIsTileWrapOpen] = useState(false);

  useEffect(() => {
    setShopInfo({
      shopId: 1,
      shopName: 'Shop1',
      shopInfo: 'This is Shop1',
      shopImg: 'shop1.png',
      shopLocation: 'A3',
      shopCall: '0000000000',
      shopStatus: 'OPEN',
      shopOpenTime: '10:30',
      shopCloseTime: '20:00',
      shopOrderCloseTime: '19:00'
    });

    axiosForJson.get('/products')
    .then(res => {
      console.log(res.data);
      setMenuList(res.data);
    })
    .catch(err => {
      console.log(err);
    })

    axiosForJson.get('/reviews')
    .then(res => {
      console.log(res.data);
      setReviewList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title='Shop1'/>
        <div id={styles.tileWrap} className='flex flex-col flex-gap-40'>
          {/* 매장 정보 */}
          <ShopInfoCard data={shopInfo}/>
          
          {/* 메뉴 */}
          <div className='center flex-col'>
            <PageSubTitle title='메뉴'/>
            <ul id={styles.tileWrap} className={`${styles.menuTileWrap} grid-4c flex-gap-10 ${isTileWrapOpen ? styles.open : styles.close}`}>
              {
                menuList && menuList.map( menu => (
                  <MenuCard data={menu}/>
                )).slice(0, 8)
              }
            </ul>
            <div onClick={() => setIsTileWrapOpen(!isTileWrapOpen)} style={isTileWrapOpen ? { display: 'none' } : {}}>더보기</div>
          </div>

          {/* 리뷰 */}
          <div className='center flex-col'>
            <PageSubTitle title='후기'/>
            <ul>
              <ReviewCard/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;