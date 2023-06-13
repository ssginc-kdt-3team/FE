import React, { useEffect, useState } from 'react';
import BranchSelector from './BranchSelector';
import axios from 'axios';
import styles from '../../../assets/css/ui/main/BranchInfoCard.module.css';

function BranchInfoCard() {
  const [branchId, setBranchId] = useState(1);
  const [branchInfo, setBranchInfo] = useState(null);

  useEffect(() =>{
    axios.get(`/admin/branch/detail/${branchId}`)
    .then(res => {
      console.log(res);
      setBranchInfo(res.data);
      // setBranchImg(res.data.branchImgUrl); // 지점 이미지 설정
    })
    .catch(err => {
      console.log(err);
    })
  }, [branchId])

  return (
    <div id={styles.cardWrap} className='flex flex-col flex-gap-20'>
      <BranchSelector branchId={branchId} setBranchId={setBranchId}/>
      {
        branchInfo && (
          // <img src={branchInfo.branchImgUrl} alt={branchInfo.name}/>
          <div id={styles.infoWrap} className='flex flex-gap-80' >
            {/* 선택한 지점명 */}
            <div id={styles.nameWrap} className='flex flex-col'>
              <p>스타필드</p>
              <h1>{branchInfo.name}</h1>
            </div>

            {/* 지점 정보 */}
            <div id={styles.detailWrap}>
              <p><span>영업시간</span>{branchInfo.openTime} ~ {branchInfo.closeTime}</p>
              <p><span>대표전화</span>{branchInfo.phone}</p>
              <p className='flex'><span>위치</span>{branchInfo.address.address} {branchInfo.address.extraAddress} {branchInfo.address.detail}</p>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default BranchInfoCard;