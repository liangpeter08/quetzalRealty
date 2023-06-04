import type { Meta, StoryObj } from '@storybook/react';
import Table from '../../components/table/Table';
import { SortingState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { getInventory } from '../../sharedApi/strapi/getInventory';
import { QueryClient, QueryClientProvider, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ApiModelModel } from '../../utils/schemas';

const queryClient = new QueryClient()
const AdvanceTableComponent = () => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [fetchSize, setFetchSize] = useState(25)
  const [sorting, setSorting] = useState<SortingState>([])
  const { data, isLoading, isFetching, error, refetch } = useInfiniteQuery(
    ["inventory", sorting],
    async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize
      getInventory({ start, fetchSize, sorting })
    },
    {
      getNextPageParam: (_lastGroup, groups) => groups.length,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const config = {
    data: data?.pages || [],
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
    <Box sx={{ m: 5, height: 200 }}>
      <TextField label="Search Table" onChange={(e) => setGlobalFilter(e.target.value)}></TextField>
      <Table config={config} />
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
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    )
  ]
};


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



export default meta;
type Story = StoryObj<typeof Table>;

export const InfiniteScrollModelsTable: Story = {
  args: {},
};

