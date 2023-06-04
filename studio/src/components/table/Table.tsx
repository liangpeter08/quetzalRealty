import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, debounce } from "@mui/material";
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender, getFilteredRowModel } from '@tanstack/react-table'
import { visuallyHidden } from '@mui/utils';
import { useState } from "react";

interface BasicTableProps {
  config: any
  maxHeight?: number
}

export type SortDirection = 'asc' | 'desc' | false;

const BasicTable = ({ config, maxHeight = 300 }: BasicTableProps) => {
  const table = useReactTable(config)
  const [order, setOrder] = useState<SortDirection>(false);
  const [orderBy, setOrderBy] = useState<string>();

  const handleSorting = (event: React.MouseEvent, header: any) => {
    const sortFn = header.column.getToggleSortingHandler();
    if (header.id === orderBy) {
      setOrder((prev) => {
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

  return <TableContainer sx={{ maxHeight }} className="overflow-y-auto">
    <Table stickyHeader>
      <TableHead>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableCell
                key={header.id}
                sortDirection={orderBy === header.id ? order : false}
                sx={(theme) => ({ backgroundColor: theme.palette.grey['200'], border: `1px solid ${theme.palette.background.default}` })}
              >
                <TableSortLabel
                  active={orderBy === header.id && !!order}
                  direction={(orderBy === header.id && order) ? order : undefined}
                  onClick={(event) => handleSorting(event, header)}
                  hideSortIcon={true}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  {orderBy === header.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody >
        {table.getRowModel().rows.map((row, i) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id} sx={(theme) => (i % 2 ? {} : { backgroundColor: theme.palette.grey[100] })}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table >
  </TableContainer>
}

export default BasicTable;