import { render, screen } from "@testing-library/react";
import { ListItem } from "./ListItem";
import React from "react";
import { fireEvent } from "@storybook/testing-library";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../themes";

const props = {
  item: {
    id: 1,
    value: "choose a song",
    completed: true,
    order: 1,
    list_id: 1,
  },
  deleteCallback: vi.fn(),
  onChange: vi.fn(),
  showCheck: true,
  showDelete: true,
};

const StyledWrapper = (wrapperProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <ListItem {...wrapperProps} />
    </ThemeProvider>
  );
};

describe("ListItem", () => {
  describe("renders propertly", () => {
    test("renders the check when prop showCheck is true", () => {
      render(<StyledWrapper {...props} />);
      const inputCheck = screen.queryByRole("checkbox");
      expect(inputCheck).toBeDefined();
    });
    test("doesn't renders the check when prop showCheck is false", () => {
      render(<StyledWrapper {...{ ...props, showCheck: false }} />);
      const inputCheck = screen.queryByRole("checkbox");
      expect(inputCheck).toBeFalsy();
    });
    test("renders the delete button when prop showDelete is true", () => {
      render(<StyledWrapper {...props} />);
      const deleteButton = screen.queryByRole("button");
      expect(deleteButton).toBeDefined();
    });
    test("doesn't renders the delete button when prop showDelete is false", () => {
      render(<StyledWrapper {...{ ...props, showDelete: false }} />);
      const deleteButton = screen.queryByRole("button");
      expect(deleteButton).toBeFalsy();
    });
  });
  describe("executes the corresponding callbacks", () => {
    test("calls onChange when check is clicked", () => {
      render(<StyledWrapper {...props} />);
      const checkElement = screen.queryByRole("checkbox");
      if (checkElement) {
        fireEvent.click(checkElement);
      }
      expect(props.onChange).toHaveBeenCalledTimes(1);
    });
    test("calls deleteCallback when button is clicked", () => {
      render(<StyledWrapper {...props} />);
      const buttonElement = screen.queryByRole("button");
      if (buttonElement) {
        fireEvent.click(buttonElement);
      }
      expect(props.deleteCallback).toHaveBeenCalledTimes(1);
    });
  });
});
