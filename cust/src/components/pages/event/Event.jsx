import React, { useEffect, useState } from 'react';
import PageTitle from '../../ui/PageTitle';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from 'antd';

const Div = styled.div`
  max-width: 800px;
  width: 75%;
  /* position: relative; */

  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const Img = styled.img`
  width: 100%;
`;

const P = styled.p`
  font-size: var(--input-fontSize);
  line-height: var(--input-fontSize);
`;

const Span = styled.span`
  height: var(--input-fontSize);
  padding-right: 8px;
  border-right: 1.5px solid var(--font);
  display: block;
`;

const BUTTON = styled(Button)`
  
`;

function Event() {
  const { eventId } = useParams();
  const [eventInfo, setEventInfo] = useState(null);

  useEffect(() => {
    axios.get(`event/${eventId}`)
    .then(res => {
      console.log(res.data);
      setEventInfo(res.data);
    })
    .catch(err => { // 오류 처리
      console.log(err);
    })
  }, [eventId])

  return (
    <div className='container background'>
      <div className='center flex-col'>
        {
          eventInfo && (
            <>
              <PageTitle title={eventInfo.title} phrase={`스타필드 ${eventInfo.branchName}`}/>
              
              <Div className='center flex-col flex-gap-40'>
                {/* 이미지 */}
                <Img src={eventInfo.contentsUrl} alt={eventInfo.title}/>

                {/* 기간 */}
                <P className='flex flex-gap-8'>
                  <Span>이벤트 기간</Span>
                  {eventInfo.startDate.slice(0, 11)} ~ {eventInfo.endDate.slice(0, 11)}
                </P>

                {/* 버튼 */}
                <div className='flex-start width-100'>
                  <BUTTON type='primary' className='button button-s'>목록</BUTTON>
                </div>
              </Div>
            </>
          )
        }

      </div>
    </div>
  );
}

export default Event;