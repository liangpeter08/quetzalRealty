import type { Meta, StoryObj } from '@storybook/react';
import Table from '../../components/table/Table';
import { SortingState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import { Box, CssBaseline, TextField, ThemeProvider } from '@mui/material';
import { getInventory } from '../../sharedApi/strapi/getInventory';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ApiModelModel } from '../../utils/schemas';
import { baselightTheme } from '../../theme/DefaultColors';

import '../../app/globals.css'
import FullTable from '../../components/table/FullTable';



type Model = {
  id: number,
  attributes: ApiModelModel['attributes']
}

const columnHelper = createColumnHelper<Model>()

const columns = [
  columnHelper.accessor(row => row.attributes.floorplan_name, {
    cell: info => info.getValue(),
    header: 'Floorplan Name',
    sortingFn: 'text'
  }),
  columnHelper.accessor(row => row.attributes.beds, {
    id: 'beds',
    cell: info => <i>{info.getValue().toString()}</i>,
    header: () => <span>Beds</span>,
    sortingFn: 'text'
  })
]

const queryClient = new QueryClient()
const AdvanceTableComponent = () => {
  const fullTableProps = {
    queryKey: ["suites"],
    queryFn: getInventory,
    columns,
  }

  return (
    <Box sx={{ m: 5, height: 200 }}>
      <FullTable {...fullTableProps} />
    </Box>
  )
}


const meta: Meta<typeof Table> = {
  title: 'Core/Table',
  component: AdvanceTableComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={baselightTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
      </ThemeProvider>
    )
  ]
};





export default meta;
type Story = StoryObj<typeof Table>;

export const ModelsTable: Story = {
  args: {},
};

