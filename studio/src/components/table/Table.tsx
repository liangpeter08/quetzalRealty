import styles from './table.module.scss'


import { Box, Button, IconButton, Menu, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TableSortLabel, TextField, Typography, debounce } from "@mui/material";
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender, getFilteredRowModel } from '@tanstack/react-table'
import { visuallyHidden } from '@mui/utils';
import React, { Dispatch, SetStateAction, useState } from "react";

import { Table as TableDef } from "@tanstack/table-core"
import { SortDirection } from './FullTable';


interface BasicTableProps {
  table: TableDef<unknown>
  maxHeight?: number
  handleSorting: (event: React.MouseEvent, header: any) => any,
  order: SortDirection
  orderBy?: string
}

const BasicTable = ({ table, maxHeight = 300, order, orderBy, handleSorting }: BasicTableProps) => {
  return (
    <TableContainer sx={{ maxHeight, minHeight: maxHeight }} className={`overflow-y-auto ${styles.tableContainer}`}>
      <Table stickyHeader size="small">
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
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
          {table.getRowModel().rows.map((row, i) => (
            <TableRow key={row.id} className={styles.tableRow}>
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