import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./header";

const meta = {
  title: "Header/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    linkTo: "/home",
    backLinkTo: "/back",
  },
};
