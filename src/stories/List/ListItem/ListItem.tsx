import React, { useState } from "react";
import { IconButton } from "../../IconButton";
import styled from "styled-components";
import { Task } from "../../../services/todos/types";

export interface Item extends Task {}

type keyName = "Escape" | "Enter";

interface ListItemProps {
  item: Item;
  deleteCallback: (item: Item) => void;
  onChange: (item: Item) => void;
  showCheck: boolean;
  showDelete: boolean;
}

const Li = styled.li<{ completed: string }>`
  box-sizing: border-box;
  padding: 0px ${({ theme }) => theme.spacing.padding.tiny}px;
  border-radius: ${({ theme }) => theme.spacing.borderRadius.large}px;
  border: 1px solid ${({ theme }) => theme.colors.neutral3};
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ completed }) =>
    completed === "true" &&
    `
    text-decoration: line-through;
  `}
`;

const CheckLabelContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Checkbox = styled.input`
  position: relative;
  visibility: none;
  text-decoration: none;
`;

const EditableSpan = styled.span`
  padding: 0 ${({ theme }) => theme.spacing.padding.tiny}px;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  text-wrap: nowrap;
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

  const toggleShowEditOnKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    key: keyName
  ) => {
    if (e.key === key) {
      e.preventDefault();
      setShowEdit(!showEdit);
    }
  };

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTaskName = (e.target as HTMLFormElement).taskInput.value;
    if (newTaskName !== item.value && newTaskName) {
      onChange({ ...item, value: newTaskName });
    }
    setShowEdit(!showEdit);
  };

  const handleEditInputOnBlur = () => {
    setNewValue(item.value);
    setShowEdit(!showEdit);
  };

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
          <EditableSpan
            title={item.value}
            tabIndex={0}
            onClick={() => setShowEdit(!showEdit)}
            onKeyDown={(e) => toggleShowEditOnKeyDown(e, "Enter")}
          >
            {item.value}
          </EditableSpan>
        )}
        {showEdit && (
          <EditForm onSubmit={handleEditFormSubmit}>
            <input
              autoFocus
              name="taskInput"
              type="text"
              placeholder={item.value}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onBlur={handleEditInputOnBlur}
              onKeyDown={(e) => toggleShowEditOnKeyDown(e, "Escape")}
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
