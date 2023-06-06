import type { Meta, StoryObj } from '@storybook/react';
import Table from '../../components/table/Table';
import { SortingState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import { Box, CssBaseline, TextField, ThemeProvider } from '@mui/material';
import { ModelType, getInventory } from '../../sharedApi/strapi/getInventory';
import { ApiModelModel, ApiSuiteSuite } from '../../utils/schemas';



import FullTable from '../../components/table/FullTable';
import { getSuites } from "@/sharedApi/strapi/getSuites";
import PageContainer from '@/components/container/PageContainer';
import { FullLayout } from '@/components/fullLayout/FullLayout';




type Suite = {
  id: number,
  attributes: ApiSuiteSuite['attributes'] & { model: { data: ModelType } }
}

const columnHelper = createColumnHelper<Suite>()

const columns = [
  columnHelper.accessor(row => row.attributes.marketing_suite_number, {
    id: 'marketing_suite_number',
    cell: info => info.getValue(),
    header: 'Suite Number',
  }),
  columnHelper.accessor(row => row.attributes.legal_suite_number, {
    id: 'legal_suite_number',
    cell: info => info.getValue(),
    header: () => <span>Legal Suite Number</span>,
  }),
  columnHelper.accessor(row => row.attributes.marketing_floor, {
    id: 'marketing_floor',
    cell: info => info.getValue(),
    header: () => <span>Floor</span>,
  }),
  columnHelper.accessor(row => row.attributes.legal_floor, {
    id: 'legal_floor',
    cell: info => info.getValue(),
    header: () => <span>Legal Floor</span>,
  }),
  columnHelper.accessor(row => row.attributes.model.data.attributes.floorplan_name, {
    id: 'floorplan_name',
    cell: info => info.getValue(),
    header: () => <span>Floorplan Name</span>,
  }),
  columnHelper.accessor(row => row.attributes.model.data.attributes.beds, {
    id: 'beds',
    cell: info => info.getValue(),
    header: () => <span>Beds</span>,
  }),
  columnHelper.accessor(row => row.attributes.model.data.attributes.baths, {
    id: 'baths',
    cell: info => info.getValue(),
    header: () => <span>Baths</span>,
  }),
  columnHelper.accessor(row => row.attributes.model.data.attributes.additional_space, {
    id: 'additional_space',
    cell: info => info.getValue(),
    header: () => <span>Additional Space</span>,
  }),
  columnHelper.accessor(row => row.attributes.model.data.attributes.type, {
    id: 'unit_type',
    cell: info => info.getValue(),
    header: () => <span>Unit Type</span>,
  }),
  columnHelper.accessor(row => row.attributes.model.data.attributes.interior_sf, {
    id: 'interior_sf',
    cell: info => info.getValue(),
    header: () => <span>Interior Area</span>,
  }),
  columnHelper.accessor(row => row.attributes.model.data.attributes.exterior_sf, {
    id: 'exterior_sf',
    cell: info => info.getValue(),
    header: () => <span>Exterior Area</span>,
  }),
]


const AdvanceTableComponent = () => {
  const fullTableProps = {
    queryKey: ["suites"],
    queryFn: getSuites,
    columns,
  }

  return (
    <PageContainer title="Projects" description="projects">
      <FullTable {...fullTableProps} />
    </PageContainer>
  );
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





export default meta;
type Story = StoryObj<typeof Table>;

export const SuitesTable: Story = {
  args: {},
};

