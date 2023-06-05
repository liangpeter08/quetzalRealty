import { getInventory } from "@/sharedApi/strapi/getInventory";
import { Box, Button, IconButton, Menu, MenuItem, Paper, Stack, TableContainer, TextField, Typography } from "@mui/material";
import { SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "./Table";
import { ExportToCsv } from 'export-to-csv';
import DownloadIcon from '@mui/icons-material/Download';
import GridOnIcon from '@mui/icons-material/GridOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Checkbox } from '@nextui-org/react';
import PaginationFooter from "./PaginationFooter";
import styles from './table.module.scss';

interface FullTableProps {
  columns: any
  queryKey: any
  queryFn: (props: any) => Promise<any>
}
// {
//     queryKey: ["inventory", page, pageSize],
//         queryFn: () => getInventory({ pagination: { page: page, pageSize } }),
// }
// TODO: https://www.reddit.com/r/sveltejs/comments/11q6vni/export_tanstack_table_to_xlsx_and_csv_with/
const options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: true,
  title: 'My Awesome CSV',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};
export type SortDirection = 'asc' | 'desc' | false;

const csvExporter = new ExportToCsv(options);

const FullTable = ({ columns, queryKey, queryFn }: FullTableProps) => {
  const [order, setOrder] = useState<SortDirection>(false);
  const [orderBy, setOrderBy] = useState<string>();

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

  const [page, setPage] = useState<number>(1)
  const [columnAnchorEl, setColumnAnchorEl] = useState<null | HTMLElement>(null);
  const [pageSize, setPageSize] = useState<number>(10)
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryFn: () => queryFn({ pagination: { page: page, pageSize }, sort: !order ? undefined : [{ id: orderBy, desc: order === 'desc' }] }),
    queryKey: [queryKey, page, pageSize, order, orderBy]
  });
  const [currColumns, setCurrColumns] = useState<typeof columns>(() => [...columns])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])

  const realData = useMemo(() => data?.data || [], [data, page, pageSize, order, orderBy])
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
  const pageCount = data?.meta.pagination.pageCount ?? 0
  const total = data?.meta.pagination.total ?? 0

  const exportCsvHandler = () => {
    if (!data?.data) {
      return;
    }

    const allRows = table.getRowModel().rows.map((row, i) => {
      const hashMap: any = {}
      row.getVisibleCells().forEach((cell) => {
        const key = cell.column.id
        hashMap[key] = cell.getValue()
      });
      return hashMap;
    })
    console.log(allRows);
    csvExporter.generateCsv(allRows);
  }

  return (
    <Box sx={{ m: 5 }}>
      <Paper elevation={3} sx={{ marginTop: 2 }} className={styles.paperContainer}>
        <Box sx={{ p: 1 }} className={styles.toolbar}>
          <Button variant="text"
            sx={{ marginRight: 1 }} startIcon={<ViewColumnIcon />}
            aria-label="more"
            id="long-button"
            aria-controls={!!columnAnchorEl ? 'long-menu' : undefined}
            aria-expanded={columnAnchorEl ? 'true' : undefined}
            aria-haspopup="true"
            onClick={(event) => setColumnAnchorEl(event.currentTarget)} className={styles.lowVisActions}>
            Columns
          </Button>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={columnAnchorEl}
            open={!!columnAnchorEl}
            onClose={() => setColumnAnchorEl(null)}
            elevation={5}
            PaperProps={{
              style: {
                paddingTop: 10,
                maxHeight: 48 * 4.5,
              },
            }}
          >
            <MenuItem sx={{ paddingLeft: 1, paddingBottom: 1 }} onClick={() => table.toggleAllColumnsVisible(!table.getIsAllColumnsVisible())}>
              <Checkbox
                id='selectAll'
                isIndeterminate={table.getIsSomeColumnsVisible() && !table.getIsAllColumnsVisible()}
                size="sm"
                isSelected={table.getIsAllColumnsVisible()}
                onChange={table.toggleAllColumnsVisible}>
                <Typography variant="body1">
                  Toggle All
                </Typography>
              </Checkbox>
            </MenuItem>
            {table.getAllLeafColumns().map(column => (
              <MenuItem key={column.id} onClick={() => column.toggleVisibility(!column.getIsVisible())}>
                <Checkbox size="sm" isSelected={column.getIsVisible()} onChange={column.toggleVisibility} >
                  <Typography variant="body1">
                    {
                      column.id
                    }
                  </Typography>
                </Checkbox>
              </MenuItem>
            )
            )}
          </Menu>
          <Button variant="text" sx={{ marginRight: 1 }} startIcon={<GridOnIcon />} className={styles.lowVisActions}>View</Button>
          <Button variant="text" sx={{ marginRight: 1 }} startIcon={<FilterListIcon />} className={styles.lowVisActions}>Filters</Button>
          <TextField label="Search Table" onChange={(e) => setGlobalFilter(e.target.value)} size="small"></TextField>
          <IconButton className={styles.lowVisActions} sx={{ marginLeft: 'auto' }} onClick={exportCsvHandler}>
            <DownloadIcon />
          </IconButton>
        </Box>
        <Table table={table} maxHeight={200} order={order} orderBy={orderBy} handleSorting={handleSorting} isLoading={isLoading} />
        <PaginationFooter {...{ page: page, pageSize, setPageSize, setPage, pageCount, total }} />
      </Paper>
    </Box >
  )
}

export default FullTable;