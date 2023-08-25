import React, { useState } from "react";
import { IconButton } from "../../IconButton";
import styled from "styled-components";
import { Task } from "../../../services/todos/types";

export interface Item extends Task {}

//1. Definir propiedades del componmente
interface ListItemProps {
  item: Item;
  deleteCallback: (item: Item) => void;
  onChange: (item: Item) => void;
  showCheck: boolean;
  showDelete: boolean;
}

//styled components
const Li = "";
const CheckLabelContainer = "";
const Checkbox = "";
const EditableSpan = "";
const EditForm = "";

export const ListItem: React.FC<ListItemProps> = ({
  item,
  deleteCallback,
  onChange,
  showCheck,
  showDelete,
}) => {
  //3. Definir estados internos y externos

  //4. Definir funcionalidades

  //5. Refactorizar

  //2. Definir estructura del JSX (elementos a utilizar y su relación)
  return <div>Punto de partida</div>;
};
