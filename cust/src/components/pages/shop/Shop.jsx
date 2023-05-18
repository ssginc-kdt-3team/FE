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
import axios from 'axios';

function Shop() {
  const { shopId } = useParams();

  const [shopInfo, setShopInfo] = useState(null);
  const [menuList, setMenuList] = useState(null);
  const [reviewList, setReviewList] = useState(null);

  const [isTileWrapOpen, setIsTileWrapOpen] = useState(false);

  useEffect(() => {
    axios.get(`/shop/detail/${shopId}`)    
    .then(res => {
      console.log(res.data);
      setShopInfo({
        shopId: res.data.shopId,
        shopName: res.data.shopName,
        shopInfo: res.data.shopInfo,
        shopImg: res.data.shopImg,
        shopLocation: res.data.shopLocation,
        shopCall: res.data.shopCall,
        shopStatus: res.data.shopStatus,
        shopOpenTime: res.data.shopOpenTime,
        shopCloseTime: res.data.shopCloseTime,
        shopOrderCloseTime: res.data.shopOrderCloseTime
      });

      setMenuList(res.data.menus);
    })
    .catch(err => { // 오류 처리
      // alert("오류가 발생하였습니다.");
      console.log(err);
    })

    // setShopInfo({
    //   shopId: 1,
    //   shopName: 'Shop1',
    //   shopInfo: 'This is Shop1',
    //   shopImg: 'shop1.png',
    //   shopLocation: 'A3',
    //   shopCall: '0000000000',
    //   shopStatus: 'OPEN',
    //   shopOpenTime: '10:30',
    //   shopCloseTime: '20:00',
    //   shopOrderCloseTime: '19:00'
    // });

    // axiosForJson.get('/products')
    // .then(res => {
    //   console.log(res.data);
    //   setMenuList(res.data);
    // })
    // .catch(err => {
    //   console.log(err);
    // })

    axiosForJson.get('/reviews')
    .then(res => {
      console.log(res.data);
      setReviewList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [shopId])

  return (
    <div className='container flex flex-col' style={{padding: '20px 0px 0px 0px'}}>
      <PageTitle title={shopInfo && shopInfo.shopName}/>
      <div id={styles.contentWrap} className='center flex-col flex-gap-40'>
        {/* 매장 정보 */}
        <ShopInfoCard data={shopInfo}/>
        
        {/* 메뉴 */}
        <div id={styles.menuWrap} className='center flex-col'>
          <PageSubTitle title='메뉴'/>
          <div style={{position: 'relative'}}>
            <div id={isTileWrapOpen ? '' : styles.menuForegroud}></div>
            <ul id={styles.tileWrap} className={`${styles.menuTileWrap} grid-4c flex-gap-10 ${isTileWrapOpen ? styles.open : styles.close}`}>
              {
                menuList && menuList.map( menu => (
                  <MenuCard key={menu.menuId} data={menu}/>
                )).slice(0, 8)
              }
            </ul>
          </div>
          <div id={styles.moreBtn} onClick={() => setIsTileWrapOpen(!isTileWrapOpen)} style={isTileWrapOpen ? { display: 'none' } : {}}>더보기</div>
        </div>

        {/* 리뷰 */}
        <div id={styles.reviewWrap} className='center flex-col'>
          <PageSubTitle title='후기'/>
          <ul id={styles.reviewCardWrap} className='flex flex-col flex-gap-40'>
            {
              reviewList && reviewList.map( review => (
                <ReviewCard data={review}/>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Shop;