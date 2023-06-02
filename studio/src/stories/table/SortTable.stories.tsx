import type { Meta, StoryObj } from '@storybook/react';
import Table from '../../components/table/Table';
import { SortingState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import { Box, TextField } from '@mui/material';


const AdvanceTableComponent = () => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const config = {
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      globalFilter,
      sorting,
    }
  }

  return (
    <Box sx={{ m: 5 }}>
      <TextField label="Search Table" onChange={(e) => setGlobalFilter(e.target.value)}></TextField>
      <Table config={config} />
    </Box>);
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
};

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('firstName', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
    sortingFn: 'text'
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'lastName',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: info => info.column.id,
    sortingFn: 'text'
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
    sortingFn: 'basic'
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: info => info.column.id,
    sortingFn: 'alphanumeric'
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
    sortingFn: 'text'
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: info => info.column.id,
    sortingFn: 'text'
  }),
]



export default meta;
type Story = StoryObj<typeof Table>;

export const SortTable: Story = {
  args: {},
};

