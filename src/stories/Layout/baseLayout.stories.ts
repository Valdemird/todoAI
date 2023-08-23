import type { Meta, StoryObj } from "@storybook/react";

import { BaseLayout } from ".";

const meta = {
  title: "Core/BaseLayout",
  component: BaseLayout,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
} satisfies Meta<typeof BaseLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    error: undefined,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    error: undefined,
    isLoading: true,
  },
};


export const Error: Story = {
    args: {
      error: {message:'This is my custom error'} as Error,
      isLoading: false,
    },
  };