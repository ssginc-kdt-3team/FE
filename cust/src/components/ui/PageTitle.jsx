import React from "react";
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  height: var(--pageTitle-height);
  /* height: 220px; */
  /* padding: 56px 0; */

  @media screen and (max-width: 768px) {
    /* height: 200px; */
    /* padding: 48px 0; */
  }
`;

const H1 = styled.h1`
  font-size: var(--pageTitle-fontSize);
  /* font-weight: 500; */
  text-align: center;

  > span::before, > span::after {
    width: var(--pageTitle-fontSize);
    height: 0.5px;
    margin: 4px 16px 0 16px;
    font-weight: normal;
    background: var(--main);
    content: " ";
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    /* font-size: 24px; */
  }
`;

const H1_1 = styled.h1`
  font-size: var(--pageTitle-fontSize);
  /* font-weight: 500; */
  text-align: center;
`;

const Span = styled.span`
  width: 100%;
  color: var(--main);
  font-weight: 500;

  word-break: keep-all;
  overflow-wrap: break-word; /* word-wrap의 대체 속성 */
`;

const SPAN = styled.span`
  word-break: keep-all;
  overflow-wrap: break-word; /* word-wrap의 대체 속성 */
  white-space: pre-line; /* 줄바꿈을 위한 속성 추가 */

  @media screen and (max-width: 768px) {
    max-width: calc(100% - 48px - 64px);
  }
`;

const P = styled.p`
  margin: 0;
  text-align: center;
  /* white-space: pre-line; */
`;

function PageTitle({title, type="default", phrase='문구가 표시될 공간 입니다.', button=''}) {
  let result;

  switch(type) {
    case "cash":
      result = (
          <>
            <H1_1><span className="center-h"><span>충전금 잔액 <Span>{title}</Span>원</span></span></H1_1>
            {button}
          </>
        );
      break;
    case "point":
      result = <H1_1><span className="center-h"><span>포인트 잔액 <Span>{title}</Span>P</span></span></H1_1>;
      break;
    // case "withPhrase":
    default:
      result = (
          <>
            <H1><span className="center" style={{fontWeight: '500'}}><SPAN>{title}</SPAN></span></H1>
            <P>{phrase}</P>
          </>
        );
      break;
    // default:
    //   result = <H1><span className="center-h">{title}</span></H1>;
  }

  return (
    <Div className="center flex-col flex-gap-24">
      {result}
    </Div>
  );
}

export default PageTitle;