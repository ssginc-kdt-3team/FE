import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BranchShopCard from '../../ui/shop/BranchShopCard';
import PageTitle from '../../ui/PageTitle';
import styles from '../../../assets/css/pages/shop/Shop.module.css';

function BranchList() {
  const [branchList, setBranchList] = useState(null);

  useEffect(() => {
    axios.get('/branch/all')
    .then(res => {
      console.log(res.data);
      setBranchList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title="지점"/>
        <ul id={styles.tileWrap} className='grid-4c flex-gap-10'>
          {
            branchList && branchList.map( branch => (
              <BranchShopCard key={branch.id} data={branch} isShopCard={false}/>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default BranchList;