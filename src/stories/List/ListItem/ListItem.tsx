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
              if (newTaskName !== item.value) {
                setShowEdit(!showEdit);
                onChange({ ...item, value: newTaskName });
              }
            }}
          >
            <input name="taskInput" type="text" placeholder={item.value} />
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
