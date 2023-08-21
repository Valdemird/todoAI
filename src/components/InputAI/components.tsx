import styled from "styled-components";

export const InputContainer = styled.div`
  min-height: 70px;
  display: flex;
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.spacing.padding.large}px;
`;

export const StyledInput = styled.input`
  width: 100%;
  margin-right: ${({ theme }) => theme.spacing.padding.small}px;;
  padding: ${({ theme }) => theme.spacing.padding.tiny}px;
  border: 1px solid ${({ theme }) => theme.colors.neutral3};
  border-radius: ${({ theme }) => theme.spacing.borderRadius.small}px;;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  outline: none;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger1};;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  margin-top: ${({ theme }) => theme.spacing.padding.tiny}px;
`;

export const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  margin-left: ${({ theme }) => theme.spacing.padding.small}px;
  padding: ${({ theme }) => theme.spacing.padding.medium}px;
  border-radius: ${({ theme }) => theme.spacing.borderRadius.default}px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  cursor: pointer;
  border: none;
`;

export const IconSpan = styled.span`
  display: flex;
  margin-right: 6px;
  font-size: ${({ theme }) => theme.typography.size.m1}px;
`;
