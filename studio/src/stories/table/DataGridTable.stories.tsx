import type { Meta, StoryObj } from '@storybook/react';
import AdvanceTable from '../../components/table/DataGridTable';
import { createColumnHelper, getCoreRowModel } from '@tanstack/react-table';

const meta: Meta<typeof AdvanceTable> = {
  title: 'Core/ExampleTable',
  component: AdvanceTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};


export default meta;
type Story = StoryObj<typeof AdvanceTable>;

export const BasicTable: Story = {};

