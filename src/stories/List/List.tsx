import React from "react";
import { Item, ListItem } from "./ListItem/ListItem";
import { styled } from "styled-components";

interface ListProps {
  items: Item[];
  showCheck?: boolean;
  showDelete?: boolean;
  onChange: (item: Item) => void;
  deleteCallback: (item: Item) => void;
}

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.margin.small}px;
  width: 100%;
  list-style-type: none;
  padding: 0;
`;

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
  return <Ul>{renderItems}</Ul>;
};

export default List;
