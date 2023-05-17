import React from "react";
import styled from 'styled-components';

const TitleH2 = styled.h2`
  font-size: 26px;
  font-weight: 500;
  margin: 60px 0 60px 0;

  @media screen and (max-width: 768px) {
    font-size: 24px;
    margin: 40px 0 40px 0;
  }
`;

function PageSubTitle({title}) {
  return (
    <TitleH2>{title}</TitleH2>
  );
}

export default PageSubTitle;