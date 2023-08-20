import React from "react";
import styled from "styled-components";
import { InputTaskProps } from "./input-task-types";

const InputTaskContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral3};
  padding: ${({ theme }) => theme.spacing.padding.small}px;
  border-radius: ${({ theme }) => theme.spacing.borderRadius.default}px;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  label {
    display: block;
    font-weight: ${({ theme }) => theme.typography.weight.bold};
  }
  input {
    border: none;
    width: 100%;
    font-size: ${({ theme }) => theme.typography.size.s3}px;
    padding: ${({ theme }) => theme.spacing.padding.small}px;
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.padding.small}px 0px;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral3};
  button:nth-child(2) {
    margin-left: ${({ theme }) => theme.spacing.padding.small}px;
  }
`;

const Button = styled.button`
  border: none;
  width: fit-content;
  height: fit-content;
  border-radius: ${({ theme }) => theme.spacing.borderRadius.small}px;
  padding: ${({ theme }) => theme.spacing.padding.small}px
    ${({ theme }) => theme.spacing.padding.medium}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`;

const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: white;
`;

const SecondaryButton = styled(Button)`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
`;

export const InputTask: React.FC = ({
  value,
  onChange,
  onCancel,
  onCreate,
}: InputTaskProps) => (
  <InputTaskContainer>
    <InputContainer>
      <label htmlFor="task-name">Tarea:</label>
      <input
        id="task-name"
        type="text"
        value={value}
        placeholder="Descripción"
        onChange={onChange}
      />
    </InputContainer>

    <ButtonsContainer>
      <SecondaryButton onClick={onCancel}>Cancelar</SecondaryButton>
      <PrimaryButton onClick={onCreate}>Agregar tarea</PrimaryButton>
    </ButtonsContainer>
  </InputTaskContainer>
);
