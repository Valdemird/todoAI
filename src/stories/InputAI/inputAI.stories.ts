import type { Meta, StoryObj } from '@storybook/react';

import { InputAI } from '.';

const meta = {
  title: 'Input/InputAI',
  component: InputAI,
  parameters: {
    layout: 'centered',
  },
  
  tags: ['autodocs'],
} satisfies Meta<typeof InputAI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: '',
    placeHolder: 'placeHolder',
    onChange: ()=>{console.log('onChangeTrigger')}
  },
};
