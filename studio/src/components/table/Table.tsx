import styles from './table.module.scss'


import { Box, CircularProgress, FormControlLabel, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { flexRender } from '@tanstack/react-table'
import { visuallyHidden } from '@mui/utils';

import { Table as TableDef } from "@tanstack/table-core"
import { SortDirection } from './FullTable';
import { useState } from 'react';
import { Checkbox } from '@nextui-org/react';
import { useSuiteSelect } from '@/context/SuiteSelectionContext';


interface BasicTableProps {
  table: TableDef<unknown>
  maxHeight?: number
  handleSorting: (event: React.MouseEvent, header: any) => any,
  order: SortDirection
  orderBy?: string
  isLoading: boolean
  hasSelection?: boolean
}

const BasicTable = ({ table, maxHeight, order, orderBy, handleSorting, isLoading, hasSelection }: BasicTableProps) => {
  const height = maxHeight
  const { selectSuites, setSelectedSuites } = useSuiteSelect()

  if (isLoading) {
    return (
      <Stack alignItems='center' sx={{ height: height }} justifyContent='center'>
        <CircularProgress />
      </Stack>
    )
  }
  const rows = table.getRowModel().rows;

  return (
    <TableContainer sx={{ height }} className={`overflow-y-auto ${styles.tableContainer}`}>
      <Table stickyHeader size="small">
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {hasSelection &&
                <TableCell key='selection' className={styles.tableHead}
                  sx={(theme) => ({ backgroundColor: theme.palette.grey['200'], border: `1px solid ${theme.palette.background.default}`, zIndex: 200 })}>
                </TableCell>}
              {headerGroup.headers.map(header => (
                <TableCell
                  key={header.id}
                  sortDirection={orderBy === header.id ? order : false}
                  className={styles.tableHead}
                  sx={(theme) => ({ backgroundColor: theme.palette.grey['200'], border: `1px solid ${theme.palette.background.default}` })}
                >
                  <TableSortLabel
                    active={orderBy === header.id && !!order}
                    direction={(orderBy === header.id && order) ? order : undefined}
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
        <TableBody className={styles.tableBody}>
          {rows.map((row, i) => (
            <TableRow key={row.id} className={styles.tableRow} hover>
              {hasSelection &&
                <TableCell key={'selection' + row.id}>
                  <Checkbox defaultSelected isSelected={!!selectSuites?.[row.id]}
                    onChange={(checked) => {
                      console.log(checked)
                      setSelectedSuites((prev: any) => {
                        return { ...prev, [row.id]: checked ? row : false }
                      });
                    }} />
                </TableCell>}
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className={styles.tableCell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>);
}

export default BasicTable;