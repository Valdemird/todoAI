import React from "react";
import "./List.css"; // Asegúrate de que la ruta sea correcta
import { IconButton } from "../IconButton";
import classNames from "classnames";
import { Task } from "../../services/todos/types";

interface ListItemProps {
  item: Item;
  deleteCallback: (item: Item) => void;
  onChange: (checked: boolean) => void;
  showCheck: boolean;
  showDelete: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  deleteCallback,
  onChange,
  showCheck,
  showDelete,
}) => {
  return (
    <li className={classNames("custom-list-item", { checked: item.completed })}>
      <div className="check-label-container">
        {showCheck && (
          <input
          className="rounded-checkbox"
            type="checkbox"
            checked={item.completed}
            onChange={() => onChange(!item.completed)}
          />
        )}
        <span>{item.value}</span>
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

interface Item extends Task{
}

interface ListProps {
  items: Item[];
  showCheck?: boolean;
  showDelete?: boolean;
  onChange: (item: Item, checked: boolean) => void;
  deleteCallback: (item: Item) => void;
}

const List: React.FC<ListProps> = ({
  items,
  showCheck = true,
  showDelete = true,
  onChange,
  deleteCallback,
}) => {
  const renderItems = items.map((item) => (
    <ListItem
      key={`${item.id}`}
      item={item}
      deleteCallback={deleteCallback}
      onChange={(newChecked) =>onChange(item, newChecked)}
      showCheck={showCheck}
      showDelete={showDelete}
    />
  ));
  return <ul className="custom-list">{renderItems}</ul>;
};

export default List;
