import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from 'storybook-addon-react-router-v6';
import { TodoListUI } from ".";

const meta = {
  title: "List/TodoList",
  component: TodoListUI,
  parameters: {
    layout: "centered",
  },
  decorators: [withRouter],

  tags: ["autodocs"],
} satisfies Meta<typeof TodoListUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: [
      {
        id: 1,
        title: "Example 1",
      },
      {
        id: 2,
        title: "Example 3",
      },
      {
        id: 3,
        title: "Example 3",
      },
    ],
  },
};
