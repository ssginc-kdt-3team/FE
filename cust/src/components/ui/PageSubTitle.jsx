import React from "react";
import styled from 'styled-components';

const H2 = styled.h2`
  width: 100%;
  height: var(--pageTitle-fontSize);
  font-size: var(--pageTitle-fontSize);
  line-height: var(--pageTitle-fontSize);
  font-weight: 500;
  text-align: center;
  margin: 72px 0 72px 0;

  @media screen and (max-width: 768px) {
    margin: 48px 0 48px 0;
  }
`;

function PageSubTitle({title}) {
  return (
    <H2>{title}</H2>
  );
}

export default PageSubTitle;