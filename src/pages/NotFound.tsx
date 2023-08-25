import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-family: ${({ theme }) => theme.typography.type.primary};;
  text-align: center;
  margin: 50px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.size.m3};
  color: ${({ theme }) => theme.colors.primary};
`;

const Message = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.neutral1};
`;

export const NotFound: React.FC = () => {
  return (
    <Container>
      <Title>404 - Page Not Found</Title>
      <Message>The page you're looking for does not exist.</Message>
      <Link to="/">Go Home</Link>
    </Container>
  );
};
