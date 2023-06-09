import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '../../ui/PageTitle';
import EventCard from '../../ui/event/EventCard';
import styled from 'styled-components';

const Ul = styled.ul`
  max-width: 800px;
  width: 75%;
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

function EventList() {
  const [eventList, setEventList] = useState(null);

  useEffect(() => {
    axios.get(`event/banners/`)
    .then(res => {
      console.log(res.data);
      setEventList(res.data);
    })
    .catch(err => { // 오류 처리
      console.log(err);
    })
  }, [])

  return (
    <div className='container background'>
      <div className='center flex-col'>
        <PageTitle title='이벤트' />

        <Ul className='grid-2c flex-gap-40'>
          {
            eventList && eventList.map( event => (
              <EventCard data={event}/>
            ))
          }
        </Ul>
        
      </div>
    </div>
  );
}

export default EventList;