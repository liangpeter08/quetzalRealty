import type { Meta, StoryObj } from '@storybook/react';
import Table from '../../components/table/Table';
import { ApiModelModel } from '../../utils/schemas';
import InfiniteScroll from '@/components/InfiniteScroll/InfiniteScroll';

import React from 'react';



type Model = {
  id: number,
  attributes: ApiModelModel['attributes']
}


const InfiniteScrollComponent = () => {
  return <InfiniteScroll />;
}


const meta: Meta<typeof Table> = {
  title: 'Core/InfiniteScroll',
  component: InfiniteScrollComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};





export default meta;
type Story = StoryObj<typeof Table>;

export const InfiniteScrollWrapper: Story = {
  args: {},
};

