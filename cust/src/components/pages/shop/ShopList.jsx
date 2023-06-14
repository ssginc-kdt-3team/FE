import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BranchShopCard from '../../ui/shop/BranchShopCard';
import PageTitle from '../../ui/PageTitle';
import styles from '../../../assets/css/pages/shop/Shop.module.css';

function ShopList() {
  const { branchId } = useParams();
  
  const [shopList, setShopList] = useState(null);

  // const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/shop/list/${branchId}`)
    .then(res => {
      console.log(res.data);
      setShopList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [branchId])

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title='SHOP' phrase='캐주얼한 음식부터 정통 다이닝까지 다양하고 맛있는 세상의 별의 별맛을 만나보세요.'/>
        <ul id={styles.tileWrap} className='grid-4c flex-gap-10'>
          {
            shopList && shopList.map( shop => (
              <BranchShopCard key={shop.id} data={shop} isShopCard={true} branchId={branchId}/>
            ))
          }
      </ul>
    </div>
  </div>
  );
}

export default ShopList;