import React, { useState } from "react";
import { IconButton } from "../../IconButton";
import styled from "styled-components";
import { Task } from "../../../services/todos/types";

export interface Item extends Task {}

type keyName = "Escape" | "Enter";

//1. Definir propiedades del componmente
interface ListItemProps {
  item: Item;
  deleteCallback: (item: Item) => void;
  onChange: (item: Item) => void;
  showCheck: boolean;
  showDelete: boolean;
}

//styled components
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
  //3. Definir estados internos y externos
  //showEdit
  //newValue

  //4. Definir funcionalidades
  //- handleEditFormSubmit
  //- toggleShowEditOnKeyDown
  //- handleEditInputOnBlur = () => {};

  //2. Definir estructura del JSX (elementos a utilizar y su relación)
  return (
    <Li completed={item.completed.toString()}>
      <CheckLabelContainer>
        <Checkbox
          type="checkbox"
          //checked={}
          //onChange={}
        />
        <EditableSpan
        //title={}
        //tabIndex={}
        //onClick={}
        //onKeyDown={}
        ></EditableSpan>
        <EditForm
        //onSubmit={}
        >
          <input
            //autoFocus
            //name="editItemValueInput"
            type="text"
            //value={}
            //onChange={}
            //onBlur={}
            //onKeyDown={}
          />
        </EditForm>
      </CheckLabelContainer>
      <IconButton
        iconRef="FaRegTrashAlt"
        shape="circle"
        style="filled"
        color="danger"
        onClick={() => true}
      />
    </Li>
  );
};
