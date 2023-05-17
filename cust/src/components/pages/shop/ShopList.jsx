import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BranchShopCard from '../../widget/shop/BranchShopCard';
import PageTitle from '../../ui/PageTitle';
import styles from '../../../assets/css/pages/shop/Shop.module.css';

function ShopList() {
  const { branchId } = useParams();
  
  const [shopList, setShopList] = useState(null);

  // const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/shop/list/?id=${branchId}`)
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
        <PageTitle title="매장"/>
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