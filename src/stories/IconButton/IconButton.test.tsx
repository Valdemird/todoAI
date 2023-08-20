import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { IconButton, Shape, Style, Color, IconRef } from "./IconButton";

const props = {
  color: "primary" as Color,
  iconRef: "FaRegTrashAlt" as IconRef,
  onClick: vi.fn(),
  style: "filled" as Style,
  shape: "circle" as Shape,
};

describe("IconButton", () => {
  test("renders the icon", () => {
    const { container } = render(<IconButton {...props} />);
    const iconElement = container.querySelector("svg");
    expect(iconElement).toBeDefined();
  });

  test("applies the correct styles", () => {
    render(<IconButton {...props} />);
    const buttonElement = screen.queryByRole("button");

    expect(buttonElement).toBeDefined();
    expect(buttonElement?.classList.contains("rounded")).toBe(true);
    expect(buttonElement?.classList.contains("filled")).toBe(true);
    expect(buttonElement?.classList.contains("primary")).toBe(true);
  });

  test("calls onClick callback when button is clicked", () => {
    render(<IconButton {...props} />);
    const buttonElement = screen.queryByRole("button");
    if (buttonElement) {
      fireEvent.click(buttonElement);
    }
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
