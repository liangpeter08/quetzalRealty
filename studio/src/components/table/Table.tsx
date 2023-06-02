import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, debounce } from "@mui/material";
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender, getFilteredRowModel } from '@tanstack/react-table'
import { visuallyHidden } from '@mui/utils';
import { useState } from "react";

interface BasicTableProps {
  config: any
}

type Order = 'asc' | 'desc';

const BasicTable = ({ config }: BasicTableProps) => {
  const table = useReactTable(config)
  const [order, setOrder] = useState<Order>();
  const [orderBy, setOrderBy] = useState<string>();

  const handleSorting = (event: React.MouseEvent, header: any) => {
    const sortFn = header.column.getToggleSortingHandler();
    console.log(order, orderBy, header)
    if (header.id === orderBy) {
      setOrder((prev) => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setOrder('desc')
      setOrderBy(header.id)
    }
    sortFn?.(event)
  }

  return <Table>
    <TableHead>
      {table.getHeaderGroups().map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <TableCell
              key={header.id}
              sortDirection={orderBy === header.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === header.id}
                direction={orderBy === header.id ? order : 'asc'}
                onClick={(event) => handleSorting(event, header)}
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
    <TableBody>
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
}

export default BasicTable;