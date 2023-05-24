import React, { useState } from 'react';
import styled from 'styled-components';

function ReviewContent({data}) {
  const [isContentWrapOpen, setIsContentWrapOpen] = useState(false);
  
  const toggleStyle = {
    width: '20px', 
    height: '20px', 
    lineHeight: '20px',
    marginLeft: '20px',
    transform: isContentWrapOpen ? 'rotate(270deg)' : 'rotate(90deg)'
  }

  const contentStyle = {
    width: 'calc(100% - 40px)',
    whiteSpace: 'nowrap', /* 텍스트가 한 줄로 표시되도록 설정 */
    overflow: 'hidden', /* 너비를 초과하는 부분을 숨김 */
    textOverflow: 'ellipsis' /* 너비를 초과하는 부분을 "..."으로 표시 */
  }

  return (
    <>
      {
        data && (
          <div style={{ width: '100%' }}>
            <div className='space-between'>
              <span style={contentStyle}>{data}</span>
              
              {/* <CaretDownOutlined /> */}
              <div 
                onClick={() => setIsContentWrapOpen(!isContentWrapOpen)} 
                style={toggleStyle}
              >▶
              </div>
            </div>
          </div>

        )
      }
    </>
  );
}

export default ReviewContent;