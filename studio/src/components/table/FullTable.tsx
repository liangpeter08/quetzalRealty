import { getInventory } from "@/sharedApi/strapi/getInventory";
import { Box, Button, IconButton, Menu, MenuItem, Paper, Stack, TableContainer, TextField, Typography } from "@mui/material";
import { SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "./Table";
import PaginationFooter from "./PaginationFooter";
import styles from './table.module.scss';
import Toolbar from "./Toolbar";
import SQLBuilder from "strapi-query-builder";

interface FullTableProps {
  columns: any
  queryKey: any
  queryFn: (props: any) => Promise<any>
  hasSelection?: boolean
  version: number
  maxHeight?: string
  singleSelection?: boolean
  selectionEvalfn?: (row: any) => boolean
}

export type SortDirection = 'asc' | 'desc' | false;

const FullTable = ({ columns, queryKey, queryFn, hasSelection, version, maxHeight = '200', singleSelection, selectionEvalfn }: FullTableProps) => {
  const [order, setOrder] = useState<SortDirection>(false);
  const [orderBy, setOrderBy] = useState<string>();
  const [filters, setFilters] = useState<any>();
  const [page, setPage] = useState<number>(1)

  const [pageSize, setPageSize] = useState<number>(10)
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryFn: () => queryFn({
      pagination: { page: page, pageSize },
      filters,
      sort: !order ? undefined : [{ id: orderBy, desc: order === 'desc' }]
    }),
    queryKey: [queryKey, page, pageSize, order, orderBy, filters, version]
  });
  const [currColumns, setCurrColumns] = useState<typeof columns>(() => [...columns])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])

  const realData = useMemo(() => data?.data || [], [data, page, pageSize, order, orderBy, filters])

  const handleSorting = (event: React.MouseEvent, header: any) => {
    const sortFn = header.column.getToggleSortingHandler();
    if (header.id === orderBy) {
      setOrder((prev: SortDirection) => {
        switch (prev) {
          case 'asc':
            return 'desc'
          case 'desc':
            return false
          default:
            return 'asc'
        }
      })
    } else {
      setOrder('asc')
      setOrderBy(header.id)
    }
    sortFn?.(event)
  }

  const handleFilterChange = ({ operation, columnId, value }: { [key: string]: string }) => {
    if (operation && columnId && value) {
      let query = new SQLBuilder()
        .filters(columnId)

      switch (operation) {
        case 'contains':
          query = query.contains(value)
        default:
          query = query.eq(value)
      }
      setFilters(query.build().filters)
    }
  }
  console.log(data, realData);
  const config = {
    data: realData,
    columns: currColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
      // sorting,
    }
  }
  const table = useReactTable(config)
  const pageCount = data?.meta?.pagination?.pageCount ?? 0
  const total = data?.meta?.pagination?.total ?? 0

  return (
    <Box sx={{ m: 5 }}>
      <Paper elevation={3} sx={{ marginTop: 2 }} className={styles.paperContainer}>
        <Toolbar table={table} setGlobalFilter={setGlobalFilter} handleFilterChange={handleFilterChange} />
        <Table table={table} maxHeight={maxHeight} order={order} orderBy={orderBy} handleSorting={handleSorting} isLoading={isLoading} hasSelection={hasSelection} singleSelection={singleSelection} selectionEvalfn={selectionEvalfn} />
        <PaginationFooter {...{ page: page, pageSize, setPageSize, setPage, pageCount, total }} />
      </Paper>
    </Box >
  )
}

export default FullTable;