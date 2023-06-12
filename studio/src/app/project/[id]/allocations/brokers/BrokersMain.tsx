"use client";

import { FullLayout } from "@/components/fullLayout/FullLayout";
import FullTable from "@/components/table/FullTable";
import { ModelType } from "@/sharedApi/strapi/getInventory";
import { getSuites } from "@/sharedApi/strapi/getSuites";
import { ApiBrokerBroker, ApiSuiteSuite } from "@/utils/schemas";
import { IconButton, Paper } from "@mui/material";
import { createColumnHelper } from '@tanstack/react-table'
import UploadIcon from '@mui/icons-material/Upload';
import SuiteSelectProvider from "@/context/SuiteSelectionContext";

import React, { useEffect, useState } from 'react';
import RightPanel from "./RightPanel";
import { BrokerType, getBrokersAllocation } from "@/sharedApi/strapi/getBrokersAllocation";

type Broker = {
  id: number,

} & ApiBrokerBroker['attributes']

const columnHelper = createColumnHelper<Broker>()

const columns = [
  columnHelper.accessor(row => row, {
    id: 'name',
    cell: info => `${info.getValue().first_name} ${info.getValue().last_name}`,
    header: 'Name',
  }),
  columnHelper.accessor(row => (row?.allocations as any).count, {
    id: 'allocation_count',
    cell: info => info.getValue(),
    header: 'Allocations',
  }),
]

export default function SuitesMain() {
  const fullTableProps = {
    queryKey: ["brokers"],
    queryFn: getBrokersAllocation,
    columns,
    version: 0,
    hasSelection: true,
    maxHeight: 'auto',
    singleSelection: true,
  }

  return (
    <SuiteSelectProvider initialVal={{}}>
      <FullLayout>
        <Paper elevation={4} sx={{ p: 2 }}>
          <FullTable {...fullTableProps} />
        </Paper>
        <RightPanel />

      </FullLayout >
    </SuiteSelectProvider >
  );
}