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

  /*const toggleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const updateCompleted = () => {
    onChange({ ...item, completed: !item.completed });
  };

  const keyboardEventHandler = (
    e: React.KeyboardEvent<HTMLElement>,
    key: keyName,
    fn: () => void,
    preventDefault: boolean = false
  ) => {
    if (e.key === key) {
      preventDefault && e.preventDefault();
      fn();
    }
  };*/

  const toggleShowEditOnKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    key: keyName
  ) => {
    if (e.key === key) {
      e.preventDefault();
      setShowEdit(!showEdit);
      //toggleShowEdit()
    }
  };

  const handleCheckboxOnBlur = (
    e: React.KeyboardEvent<HTMLElement>,
    key: keyName
  ) => {
    if (e.key === key) {
      onChange({ ...item, completed: !item.completed });
      /*updateCompleted()*/
    }
  };

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTaskName = (e.target as HTMLFormElement).taskInput.value;
    if (newTaskName !== item.value && newTaskName) {
      onChange({ ...item, value: newTaskName });
    }
    setShowEdit(!showEdit);
    //toggleShowEdit()
  };

  const handleEditInputOnBlur = () => {
    setNewValue(item.value);
    setShowEdit(!showEdit);
    //toggleShowEdit()
  };

  return (
    <Li completed={item.completed.toString()}>
      <CheckLabelContainer>
        {showCheck && (
          <Checkbox
            type="checkbox"
            checked={item.completed}
            onChange={
              () =>
                onChange({
                  ...item,
                  completed: !item.completed,
                }) /*updateCompleted*/
            }
            onKeyDown={(e) => handleCheckboxOnBlur(e, "Enter")}
            //onKeyDown={(e) => keyboardEventHandler(e, "Enter", updateCompleted)}
          />
        )}
        {!showEdit && (
          <EditableSpan
            title={item.value}
            tabIndex={0}
            onClick={() => setShowEdit(!showEdit) /*toggleShowEdit*/}
            onKeyDown={(e) => toggleShowEditOnKeyDown(e, "Enter")}
            //onKeyDown={(e) =>
            //keyboardEventHandler(e, "Enter", toggleShowEdit, true)
            //}
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
              //onKeyDown={(e) =>
              //keyboardEventHandler(e, "Escape", toggleShowEdit)
              //}
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
