import React from "react";
import styled from "styled-components";
import { HeaderProps } from "./header-types";
import { Logo } from "./logo";

import { FaAngleLeft } from "react-icons/fa";

const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100vw;
  min-height: 40px;
  padding: ${({ theme }) => theme.spacing.padding.medium}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  &:after {
    content: " ";
    display: block;
    width: 80px;
    height: 1px;
    visibility: hidden;
  }
`;

const BackLinkContainer = styled.div`
  display: flex;
  align-items: center;
  a {
    color: white;
    text-decoration: none;
    font-weight: ${({ theme }) => theme.typography.weight.bold};
  }
  width: 80px;
`;

const LogoContainer = styled.div``;

export const Header: React.FC = ({ linkTo, backLinkTo }: HeaderProps) => (
  <HeaderContainer>
    <BackLinkContainer>
      {backLinkTo && (
        <>
          <a href={backLinkTo}>
            <FaAngleLeft /> Atrás
          </a>
        </>
      )}
    </BackLinkContainer>
    <LogoContainer>
      <a href={linkTo}>
        <Logo />
      </a>
    </LogoContainer>
  </HeaderContainer>
);

Header.defaultProps = {
  linkTo: "",
};
