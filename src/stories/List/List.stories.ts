import type { Meta, StoryObj } from "@storybook/react";

import List from "./List";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "List/List",
  component: List,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
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
    onChange: () => alert("onChange called!"),
    deleteCallback: () => alert("deleteCallback called!"),
  },
};
