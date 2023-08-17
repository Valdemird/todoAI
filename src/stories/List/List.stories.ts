import type { Meta, StoryObj } from "@storybook/react";

import List from "./List";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/List",
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
        label: "choose a song",
        checked: true,
      },
      {
        id: 2,
        label: "download the guitar tab",
        checked: false,
      },
      {
        id: 3,
        label: "devide the song by short pieces",
        checked: false,
      },
    ],
    showCheck: true,
    showDelete: true,
    onChange: () => alert("onChange called!"),
    deleteCallback: () => alert("deleteCallback called!"),
  },
};
