import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoImage } from "../assets/logo.svg";

const StyledLogo = styled.div`
  background-color: ${({theme}) => theme.colors.primary };
`;

export const Logo = (): React.FC => (
  <StyledLogo>
    <LogoImage title="Logo TodoAI" />
  </StyledLogo>
);
