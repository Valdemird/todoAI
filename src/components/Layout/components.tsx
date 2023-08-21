import { styled } from "styled-components";

export const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: ${({theme}) => theme.typography.type.primary};
`;

export const CenteredHeading = styled.h2`
  width: 100%;
  text-align: left;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 1200px;
  padding: 0 20px;
`;

export const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.padding.small}
  font-size: 13px;
  color: ${({ theme }) => theme.colors.neutral1};
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin: 0;
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
