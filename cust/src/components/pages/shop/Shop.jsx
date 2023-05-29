import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../ui/PageTitle';
import ShopInfoCard from '../../ui/shop/ShopInfoCard';
import MenuCard from '../../ui/shop/MenuCard';
import ReviewCard from '../../ui/shop/ReviewCard';
import { axiosForJson } from '../../../index';
import styles from '../../../assets/css/pages/shop/Shop.module.css';
import styled from 'styled-components';
import PageSubTitle from '../../ui/PageSubTitle';
import axios from 'axios';
import Paging from '../../ui/Paging';

function Shop() {
  const { shopId } = useParams();

  const [shopInfo, setShopInfo] = useState(null);
  const [menuList, setMenuList] = useState(null);
  const [reviewList, setReviewList] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalItems, setTotalItems] = useState(0); // 총 아이템 수
  const [itemsPerPage, setItemsPerPage] = useState(8) // 페이지당 아이템 수

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
        phone: res.data.phone,
        shopStatus: res.data.shopStatus,
        shopOpenTime: res.data.shopOpenTime,
        shopCloseTime: res.data.shopCloseTime,
        orderCloseTime: res.data.orderCloseTime
      });

      setMenuList(res.data.menus);
    })
    .catch(err => { // 오류 처리
      alert("오류가 발생하였습니다.");
      console.log(err);
    })
  }, [shopId])

  useEffect(() => {
    axios.get(`/shop/detail/review/${shopId}/${currentPage}`)    
    .then(res => {
      console.log(res.data);
      setReviewList(res.data.content);
      setTotalItems(res.data.totalElements); // 총 아이템 수 설정
      setItemsPerPage(res.data.pageable.pageSize); // 페이지당 아이템 수 설정
    })
    .catch(err => { // 오류 처리
      alert("오류가 발생하였습니다.");
      console.log(err);
    })
  }, [shopId, currentPage])

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

        {/* 후기 */}
        <div id={styles.reviewWrap} className='center flex-col'>
          <PageSubTitle title='후기'/>
          <ul id={styles.reviewCardWrap} className='flex flex-col flex-gap-40'>
            {
              reviewList && reviewList.map( (review, index) => (
                <ReviewCard key={index} data={review}/>
              ))
            }
          </ul>
          
          {/* 페이지 */}
          <Paging currentPage={currentPage} totalItems={totalItems} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage}/>
        </div>

      </div>
    </div>
  );
}

export default Shop;