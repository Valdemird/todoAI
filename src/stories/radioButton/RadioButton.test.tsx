import { render, screen, fireEvent } from "@testing-library/react";
import { RadioButton } from "./RadioButton";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("RadioButton", () => {
  test("calls onChange callback when a radio button is clicked", () => {
    const onChangeCallback = vi.fn();

    render(<RadioButton options={options} onChange={onChangeCallback} />);

    const radioButtons = screen.getAllByRole("radio");
    expect(radioButtons).toHaveLength(options.length);

    fireEvent.click(radioButtons[0]);
    expect(onChangeCallback.mock.calls[0][0]).equal("option1");
  });
});
