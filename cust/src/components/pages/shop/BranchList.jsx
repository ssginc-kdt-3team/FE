import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BranchShopCard from '../../ui/shop/BranchShopCard';
import PageTitle from '../../ui/PageTitle';
import styles from '../../../assets/css/pages/shop/Shop.module.css';

function BranchList() {
  const [branchList, setBranchList] = useState(null);

  useEffect(() => {
    axios.get('/branch/all')
    .then(res => {
      // console.log(res.data);
      setBranchList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className='container'>
      <div className='center flex-col'>
        <PageTitle title='BRANCH' phrase={(<>쇼핑. 외식. 레저. 힐링이 한 공간에.<br/>즐거움의 기준이 달라지는 새로운 세계가 열립니다.</>)}/>
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