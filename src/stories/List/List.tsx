import React from "react";
import "./List.css"; // Asegúrate de que la ruta sea correcta
import { IconButton } from "../IconButton";
import classNames from "classnames";

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
    <li className={classNames("custom-list-item", { checked: item.checked })}>
      <div className="check-label-container">
        {showCheck && (
          <input
            type="radio"
            checked={item.checked}
            onChange={() => onChange(!item.checked)}
          />
        )}
        <span>{item.label}</span>
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

interface Item {
  id: number;
  label: string;
  checked: boolean;
}

interface ListProps {
  items: Item[];
  showCheck: boolean;
  showDelete: boolean;
  onChange: () => void;
  deleteCallback: (item: Item) => void;
}

const List: React.FC<ListProps> = ({
  items,
  showCheck,
  showDelete,
  onChange,
  deleteCallback,
}) => {
  const renderItems = items.map((item) => (
    <ListItem
      key={`${item.id}`}
      item={item}
      deleteCallback={deleteCallback}
      onChange={onChange}
      showCheck={showCheck}
      showDelete={showDelete}
    />
  ));
  return <ul className="custom-list">{renderItems}</ul>;
};

export default List;
