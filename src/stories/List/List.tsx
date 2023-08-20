import React from "react";
import "./List.css";
import { Item, ListItem } from "./ListItem/ListItem";

interface ListProps {
  items: Item[];
  showCheck?: boolean;
  showDelete?: boolean;
  onChange: (item: Item) => void;
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
      onChange={(item) => onChange(item)}
      showCheck={showCheck}
      showDelete={showDelete}
    />
  ));
  return <ul className="custom-list">{renderItems}</ul>;
};

export default List;
