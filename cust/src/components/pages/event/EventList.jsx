import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '../../ui/PageTitle';
import EventCard from '../../ui/event/EventCard';
import styled from 'styled-components';
import { Empty } from 'antd';

const Ul = styled.ul`
  max-width: 800px;
  width: 75%;
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

function EventList() {
  const [hasData, setHasData] = useState(false);
  const [eventList, setEventList] = useState(null);

  useEffect(() => {
    axios.get(`/event/banners`)
    .then(res => {
      // console.log(res.data);
      setEventList(res.data);
      setHasData(res.data.length > 0);
    })
    .catch(err => { // 오류 처리
      console.log(err);
      setHasData(false);
    })
  }, [])

  return (
    <div className='container background'>
      <div className='center flex-col'>
        <PageTitle title='EVENTS' phrase='이벤트'/>

        {
          hasData ? (
            <Ul className='grid-2c flex-gap-40'>
              {
                eventList && eventList.map( event => (
                  <EventCard data={event}/>
                ))
              }
            </Ul>
          )
          : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> 
          )
        }

        
      </div>
    </div>
  );
}

export default EventList;