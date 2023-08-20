import { render, screen } from "@testing-library/react";
import List from "./List";
import React from "react";

const props = {
  items: [
    {
      id: 1,
      value: "choose a song",
      completed: true,
      order: 1,
      list_id: 1,
    },
    {
      id: 2,
      value: "download the guitar tab",
      completed: false,
      order: 2,
      list_id: 1,
    },
    {
      id: 3,
      value: "devide the song by short pieces",
      completed: false,
      order: 3,
      list_id: 1,
    },
  ],
  showCheck: true,
  showDelete: true,
  onChange: vi.fn(),
  deleteCallback: vi.fn(),
};

describe("List", () => {
  test("renders the list with all its corresponding items", () => {
    render(<List {...props} />);
    const expectedListItems = props.items.map((listItem) => listItem.value);
    expectedListItems.forEach((itemText) => {
      const listItemElement = screen.getByText(itemText);
      expect(listItemElement).toBeDefined();
    });
  });
});
