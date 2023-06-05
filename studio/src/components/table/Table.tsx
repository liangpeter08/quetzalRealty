import styles from './table.module.scss'


import { Box, Button, IconButton, Menu, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TableSortLabel, TextField, Typography, debounce } from "@mui/material";
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender, getFilteredRowModel } from '@tanstack/react-table'
import { visuallyHidden } from '@mui/utils';
import { Dispatch, SetStateAction, useState } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


interface PaginationOptions {
  page: number,
  pageSize: number,
  pageCount: number,
  total: number,
  setPageSize: Dispatch<SetStateAction<number>>,
  setPage: Dispatch<SetStateAction<number>>
}

interface BasicTableProps {
  config: any
  maxHeight?: number
  pagination?: PaginationOptions
}

export type SortDirection = 'asc' | 'desc' | false;

const BasicTable = ({ config, maxHeight = 300, pagination }: BasicTableProps) => {
  const { page = 1, pageSize = 0, pageCount = 0, total = 0, setPageSize = () => { }, setPage = () => { } } = pagination ?? {}
  const table = useReactTable(config)
  const [order, setOrder] = useState<SortDirection>(false);
  const [orderBy, setOrderBy] = useState<string>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = (pageSize: number) => {
    setAnchorEl(null);
    if (isNaN(pageSize)) {
      return;
    }
    setPageSize?.(pageSize)
    setPage?.(1)

  };

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

  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = page * pageSize > total ? total : page * pageSize

  return (
    <Paper elevation={3} sx={{ marginTop: 2 }} className={styles.paperContainer}>
      <TableContainer sx={{ maxHeight, minHeight: maxHeight }} className={`overflow-y-auto ${styles.tableContainer}`}>
        <Table>
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
        </Table >
      </TableContainer>
      <Box className={styles.pagination}>
        <Stack direction='row' alignItems='center' sx={{ m: 1 }} justifyContent='flex-end'>
          <Typography variant="body1">Rows Per Page:</Typography>
          <Box>
            <Button
              className={styles.lowVisActions}
              id="basic-button"
              size="small"
              sx={{ margin: '0 6px', minWidth: 40, "& .MuiButton-endIcon": { marginLeft: 0 } }}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(event) => setAnchorEl(event.currentTarget)}
              endIcon={<ArrowDropDownIcon />}
            >
              {pageSize}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleClose(5)}>5</MenuItem>
              <MenuItem onClick={() => handleClose(10)}>10</MenuItem>
              <MenuItem onClick={() => handleClose(25)}>25</MenuItem>
            </Menu>
          </Box>
          <Typography variant="body1">{`${startIndex} - ${endIndex} of ${total}`}</Typography>
          <IconButton sx={(theme) => ({ color: theme.palette.primary.main })} disabled={page === 1} onClick={() => setPage(page - 1)} className={styles.lowVisActions}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton disabled={page === pageCount} sx={(theme) => ({ color: theme.palette.primary.main })} onClick={() => setPage(page + 1)} className={styles.lowVisActions}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Stack>
      </Box>
    </Paper >);
}

export default BasicTable;