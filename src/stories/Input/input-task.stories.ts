import type { Meta, StoryObj } from "@storybook/react";
import { BaseSyntheticEvent } from "react";

import { InputTask } from "./input-task";

const meta = {
  title: "Input/Input Task",
  component: InputTask,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof InputTask>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    value: "",
    onChange: (e: BaseSyntheticEvent) => console.log(e.target.value),
    onCancel: () => alert("Canceled task creation."),
    onCreate: () => alert("Task created"),
  },
};
