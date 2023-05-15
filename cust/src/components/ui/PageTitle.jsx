import React from "react";
import styled from 'styled-components';

const TitleDiv = styled.div`
  font-size: 26px;
  font-weight: 500;
  margin: 70px 0 100px 0;

  @media screen and (max-width: 768px) {
    font-size: 24px;
    margin: 60px 0 80px 0;
  }
`;

function PageTitle({title}) {
  return (
    <TitleDiv>{title}</TitleDiv>
  );
}

export default PageTitle;