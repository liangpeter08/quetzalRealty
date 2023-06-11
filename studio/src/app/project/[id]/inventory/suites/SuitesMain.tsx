"use client";

import { FullLayout } from "@/components/fullLayout/FullLayout";
import FullTable from "@/components/table/FullTable";
import { ModelType } from "@/sharedApi/strapi/getInventory";
import { getSuites } from "@/sharedApi/strapi/getSuites";
import { ApiSuiteSuite } from "@/utils/schemas";
import { IconButton, Paper } from "@mui/material";
import { createColumnHelper } from '@tanstack/react-table'
import UploadIcon from '@mui/icons-material/Upload';
import SuiteUploadModal from "./UploadModal";
import SuiteSelectProvider from "@/context/SuiteSelectionContext";

import React, { useEffect, useState } from 'react';
import RightPanel from "./RightPanel";

type Suite = {
  id: number,
  attributes: ApiSuiteSuite['attributes'] & { model: { data: ModelType } }
}

const columnHelper = createColumnHelper<Suite>()

const columns = [
  columnHelper.accessor(row => row.attributes?.marketing_suite_number, {
    id: 'marketing_suite_number',
    cell: info => info.getValue(),
    header: 'Suite Number',
  }),
  columnHelper.accessor(row => row.attributes?.legal_suite_number, {
    id: 'legal_suite_number',
    cell: info => info.getValue(),
    header: () => <span>Legal Suite Number</span>,
  }),
  columnHelper.accessor(row => row.attributes?.marketing_floor, {
    id: 'marketing_floor',
    cell: info => info.getValue(),
    header: () => <span>Floor</span>,
  }),
  columnHelper.accessor(row => row.attributes?.legal_floor, {
    id: 'legal_floor',
    cell: info => info.getValue(),
    header: () => <span>Legal Floor</span>,
  }),
  columnHelper.accessor(row => row.attributes?.model?.data?.attributes?.floorplan_name, {
    id: 'floorplan_name',
    cell: info => info.getValue(),
    header: () => <span>Floorplan Name</span>,
  }),
  columnHelper.accessor(row => row.attributes?.model?.data?.attributes?.beds, {
    id: 'beds',
    cell: info => info.getValue(),
    header: () => <span>Beds</span>,
  }),
  columnHelper.accessor(row => row.attributes?.model?.data?.attributes?.baths, {
    id: 'baths',
    cell: info => info.getValue(),
    header: () => <span>Baths</span>,
  }),
  columnHelper.accessor(row => row.attributes?.model?.data?.attributes?.additional_space, {
    id: 'additional_space',
    cell: info => info.getValue(),
    header: () => <span>Additional Space</span>,
  }),
  columnHelper.accessor(row => row.attributes?.model?.data?.attributes?.type, {
    id: 'unit_type',
    cell: info => info.getValue(),
    header: () => <span>Unit Type</span>,
  }),
  columnHelper.accessor(row => row.attributes?.model?.data?.attributes?.interior_sf, {
    id: 'interior_sf',
    cell: info => info.getValue(),
    header: () => <span>Interior Area</span>,
  }),
  columnHelper.accessor(row => row.attributes?.model?.data?.attributes?.exterior_sf, {
    id: 'exterior_sf',
    cell: info => info.getValue(),
    header: () => <span>Exterior Area</span>,
  }),
]

export default function SuitesMain() {

  const [newSuite, setNewSuite] = useState<boolean>(false);
  const [refreshTable, setRefreshTable] = useState<number>(0);



  const fullTableProps = {
    queryKey: ["suites"],
    queryFn: getSuites,
    columns,
    version: refreshTable,
  }


  return (
    <SuiteSelectProvider initialVal={{}}>
      {newSuite && <SuiteUploadModal open={newSuite} onClose={() => setNewSuite(false)} refetch={() => {
        setRefreshTable((previous: number) => previous++)
      }} />}

      <FullLayout>
        <Paper elevation={4} sx={{ p: 2 }}>
          <IconButton onClick={() => setNewSuite(true)}>
            <UploadIcon></UploadIcon>
          </IconButton>
          <FullTable {...fullTableProps} />
        </Paper>
        <RightPanel />

      </FullLayout>
    </SuiteSelectProvider>
  );
}