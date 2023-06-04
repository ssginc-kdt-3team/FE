import { Button } from "antd";
import React from "react";
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: var(--pageTitle-fontSize);
  /* font-weight: 500; */
  text-align: center;
  margin: 70px 0 90px 0;

  /* @media screen and (max-width: 768px) { */
    /* font-size: 24px; */
    /* margin: 60px 0 80px 0; */
  /* } */
`;

const Span = styled.span`
  color: var(--main);
  font-weight: 500;
`;

function PageTitle({title, type="default"}) {
  let result;

  switch(type) {
    case "cash":
      result = <H1 style={{ marginBottom: '35px' }}>충전금 잔액 <Span>{title}</Span>원</H1>;
      break;
    default:
      result = <H1 style={{fontWeight: '500'}}>{title}</H1>;
  }

  return (
    <>
      {result}
    </>
  );
}

export default PageTitle;