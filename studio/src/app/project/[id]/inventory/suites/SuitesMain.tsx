"use client";

import PageContainer from "@/components/container/PageContainer";
import { FullLayout } from "@/components/fullLayout/FullLayout";
import FullTable from "@/components/table/FullTable";
import { getInventory } from "@/sharedApi/strapi/getInventory";
import { ApiModelModel } from "@/utils/schemas";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, debounce } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender, getFilteredRowModel } from '@tanstack/react-table'
import { useState } from "react";

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


export default function SuitesMain() {
  const fullTableProps = {
    queryKey: ["suites"],
    queryFn: getInventory,
    columns,
  }

  return (
    <FullLayout>
      <PageContainer title="Projects" description="projects">
        <FullTable {...fullTableProps} />
      </PageContainer>
    </FullLayout>
  );
}