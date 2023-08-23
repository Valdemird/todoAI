import React, { useState } from "react";
import { IconButton } from "../../IconButton";
import styled from "styled-components";
import { Task } from "../../../services/todos/types";

export interface Item extends Task {}

interface ListItemProps {
  item: Item;
  deleteCallback: (item: Item) => void;
  onChange: (item: Item) => void;
  showCheck: boolean;
  showDelete: boolean;
}

const Li = styled.li<{ completed: string }>`
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
  border-radius: ${({ theme }) => theme.spacing.borderRadius.large}px;
  border: 1px solid ${({ theme }) => theme.colors.neutral3};
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px ${({ theme }) => theme.spacing.padding.tiny}px;
  ${({ completed }) =>
    completed === "true" &&
    `
    text-decoration: line-through;
  `}
`;

const CheckLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  position: relative;
  visibility: none;
  text-decoration: none;
`;

const EditableSpan = styled.span`
  padding-left: ${({ theme }) => theme.spacing.padding.tiny}px;
  cursor: pointer;
`;

const EditForm = styled.form`
  display: flex;
  align-items: center;
  input[type="text"] {
    flex: 1;
  }
`;

export const ListItem: React.FC<ListItemProps> = ({
  item,
  deleteCallback,
  onChange,
  showCheck,
  showDelete,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [newValue, setNewValue] = useState(item.value);

  return (
    <Li completed={item.completed.toString()}>
      <CheckLabelContainer>
        {showCheck && (
          <Checkbox
            type="checkbox"
            checked={item.completed}
            onChange={() => onChange({ ...item, completed: !item.completed })}
          />
        )}
        {!showEdit && (
          <EditableSpan onClick={() => setShowEdit(!showEdit)}>
            {item.value}
          </EditableSpan>
        )}
        {showEdit && (
          <EditForm
            onSubmit={(e) => {
              e.preventDefault();
              const newTaskName = (e.target as HTMLFormElement).taskInput.value;
              if (newTaskName !== item.value && newTaskName) {
                setShowEdit(!showEdit);
                onChange({ ...item, value: newTaskName });
              }
            }}
          >
            <input
              autoFocus
              name="taskInput"
              type="text"
              placeholder={item.value}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onBlur={() => {
                setNewValue(item.value);
                setShowEdit(!showEdit);
              }}
            />
          </EditForm>
        )}
      </CheckLabelContainer>
      {showDelete && (
        <IconButton
          iconRef="FaRegTrashAlt"
          shape="circle"
          style="filled"
          color="danger"
          onClick={() => deleteCallback(item)}
        />
      )}
    </Li>
  );
};
