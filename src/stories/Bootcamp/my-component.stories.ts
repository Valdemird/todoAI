import type { Meta, StoryObj } from "@storybook/react";

import { MyComponent } from "./my-component";

const meta = {
  title: "Bootcamp/MyComponent",
  component: MyComponent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
};
