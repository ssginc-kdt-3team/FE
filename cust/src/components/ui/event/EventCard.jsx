import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../assets/css/ui/event/EventCard.module.css';

function EventCard({data}) {
  return (
    <li>
      <Link to={`/event/${data.id}`}>
        <div className={styles.eventCard}>
          <div>
            <img src={data.bannerUrl} alt={data.title}/>
          </div>
          <p className='flex flex-col'>
            <span>{data.branchName} | {data.title}</span>
            <span>{data.startDate.slice(0, 11)} ~ {data.endDate.slice(0, 11)}</span>
          </p>
        </div>
      </Link>
    </li>
  );
}

export default EventCard;