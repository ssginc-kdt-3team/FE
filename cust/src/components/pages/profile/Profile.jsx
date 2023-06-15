import React, { useState } from 'react';
import { Switch } from 'antd';
import { Link } from 'react-router-dom';
import styles from '../../../assets/css/pages/profile/Profile.module.css';
import ProfileInfoCard from '../../ui/profile/ProfileInfoCard';
import next from '../../../assets/images/icons/next.png';

function Profile() {
  const [checked, setChecked] = useState(true);

  const handleSwitch = (checked) => {
    setChecked(checked);
    console.log(checked)
  };

  return (
    <div id={styles.container} className='container background center'>
      {/* <div className='center flex-col'> */}
        <div id={styles.profileWrap} className='flex flex-col flex-gap-40'>
          {/* 알림 설정 */}
          <div id={styles.toggleWrap} className='flex-end flex-gap-16'>
            <label>알림 설정</label>
            <Switch checked={checked} onChange={handleSwitch} style={checked ? {background: 'var(--main)'} : {background: 'var(--main)', opacity: '0.25'}}/>
          </div>

          {/* 사용자 정보 */}
          <ProfileInfoCard/>

          {/* 페이지 이동 카드 */}
          <div id={styles.cardWrap} className='grid-4c flex-gap-40'>
            <Link to='/resv' className='box shadow-box'>
              <div>
                예약 내역
                <img src={next} alt='move to page'/>
              </div>
            </Link>

            <Link to='/cash' className='box shadow-box'>
              <div>
                충전금 내역
                <img src={next} alt='move to page'/>
              </div>
            </Link>

            <Link to='/point' className='box shadow-box'>
              <div>
                포인트 내역
                <img src={next} alt='move to page'/>
              </div>
            </Link>

            <Link to='/profile/review' className='box shadow-box'>
              <div>
                작성한 후기
                <img src={next} alt='move to page'/>
              </div>
            </Link>
          </div>
        </div>



        {/* <ul>
          <li><Link to='/resv'>예약 내역 조회</Link></li>
          <li><Link to='review'>내가 작성한 후기</Link></li>
          <li><Link to='/cash'>충전금</Link></li>
        </ul> */}
      {/* </div> */}
    </div>
  );
}

export default Profile;