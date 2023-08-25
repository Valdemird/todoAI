import React from "react";
import { Item, ListItem } from "./ListItem/ListItem";
import { styled } from "styled-components";

interface ListProps {
  /**
   * Array of list items to display
   */
  items: Item[];
  /**
   * Shows a check input in all the list items
   */
  showCheck?: boolean;
  /**
   * Shows a delete button in all the list items
   */
  showDelete?: boolean;
  /**
   * Pass a callback to that is going to be excecuted
   * when the check change or the editable text change
   */
  onChange: (item: Item) => void;
  /**
   * Pass a callback to the delete icon button
   */
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

/**
 * Pass a callback to the delete icon button
 */

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
