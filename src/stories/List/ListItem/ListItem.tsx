import React, { useState } from "react";
import { IconButton } from "../../IconButton";
import classNames from "classnames";
import { Task } from "../../../services/todos/types";
import "./ListItem.css";

export interface Item extends Task {}

interface ListItemProps {
  item: Item;
  deleteCallback: (item: Item) => void;
  onChange: (item: Item) => void;
  showCheck: boolean;
  showDelete: boolean;
}

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
    <li className={classNames("custom-list-item", { checked: item.completed })}>
      <div className="check-label-container">
        {showCheck && (
          <input
            className="rounded-checkbox"
            type="checkbox"
            checked={item.completed}
            onChange={() => onChange({ ...item, completed: !item.completed })}
          />
        )}
        {!showEdit && (
          <span onClick={() => setShowEdit(!showEdit)}>{item.value}</span>
        )}
        {showEdit && (
          <form
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
          </form>
        )}
      </div>
      {showDelete && (
        <IconButton
          iconRef="FaRegTrashAlt"
          shape="circle"
          style="filled"
          color="danger"
          onClick={() => deleteCallback(item)}
        />
      )}
    </li>
  );
};
