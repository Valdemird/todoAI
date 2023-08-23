import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TodoList } from "../../services/todos/types";
import { FaTrashAlt } from "react-icons/fa";

const IconSpan = styled.span`
  display: flex;
  margin-right: 6px;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
`;


const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.padding.small}px;
  margin-bottom: ${({ theme }) => theme.spacing.padding.small}px;
`;

const ListLink = styled(Link)`
  display: flex;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.size.m2}px;

  &:hover {
    text-decoration: underline;
  }
`;

const ListText = styled.span`
  color: ${({ theme }) => theme.colors.neutral1};
  font-size: ${({ theme }) => theme.typography.size.s2}px;
`;

const DeleteButton = styled.button`
  background-color: transparent
  min-width: 40px;
  color: ${({ theme }) => theme.colors.neutral1};
  border: none;
  padding: ${({ theme }) => `${theme.spacing.padding.tiny}px ${theme.spacing.padding.type}px`};
  border-radius: ${({ theme }) => theme.spacing.borderRadius.small}px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
`;

interface TodoListProps {
  data: TodoList[];
  deleteTodoList(id: number): void;
}

export const TodoListUI: React.FC<TodoListProps> = ({ data, deleteTodoList }) => {
  return (
    <ListContainer>
      {data?.map((item) => (
        <ListItem key={item.id}>
          <ListLink to={`/list/${item.id}`}>
            <ListText>{item.title}</ListText>
          </ListLink>
          <DeleteButton onClick={() => deleteTodoList(item.id)}>      <IconSpan>
          <FaTrashAlt />
        </IconSpan></DeleteButton>
        </ListItem>
      ))}
    </ListContainer>
  );
};

