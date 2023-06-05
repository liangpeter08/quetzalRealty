import { getInventory } from "@/sharedApi/strapi/getInventory";
import { Box, Button, IconButton, Menu, MenuItem, Paper, Stack, TableContainer, TextField, Typography } from "@mui/material";
import { SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "./Table";
import { ExportToCsv } from 'export-to-csv';
import styles from './table.module.scss';
import DownloadIcon from '@mui/icons-material/Download';
import GridOnIcon from '@mui/icons-material/GridOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Checkbox } from '@nextui-org/react';

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


const csvExporter = new ExportToCsv(options);

const FullTable = ({ columns, queryKey, queryFn }: FullTableProps) => {

  const [page, setPage] = useState<number>(1)
  const [columnAnchorEl, setColumnAnchorEl] = useState<null | HTMLElement>(null);
  const [pageSize, setPageSize] = useState<number>(10)
  const keys = useMemo(() => [...queryKey, page, pageSize], [queryKey, page, pageSize])
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryFn: () => queryFn({ pagination: { page: page, pageSize } }),
    queryKey: keys
  });
  const [currColumns, setCurrColumns] = useState<typeof columns>(() => [...columns])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const config = {
    data: data?.data || [],
    columns: currColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      globalFilter,
      sorting,
      columnVisibility,
    }
  }
  const table = useReactTable(config)
  const pageCount = data?.meta.pagination.pageCount ?? 0
  const total = data?.meta.pagination.total ?? 0

  const exportCsvHandler = () => {
    if (!data?.data) {
      return;
    }
    csvExporter.generateCsv(data?.data);
  }

  return (
    <Box sx={{ m: 5 }}>
      <TextField label="Search Table" onChange={(e) => setGlobalFilter(e.target.value)}></TextField>
      <Table table={table} pagination={{ page: page, pageSize, setPageSize, setPage, pageCount, total }} maxHeight={200}>
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

            {table.getAllLeafColumns().map(column => (
              <MenuItem key={column.id} onClick={() => { }}>
                <Checkbox size="sm" isSelected={column.getIsVisible()} onChange={column.toggleVisibility}>
                  <Typography variant="body1">
                    {
                      column.id
                    }
                  </Typography>
                </Checkbox>
              </MenuItem>
            )
            )}
            <Stack direction='row'>
              <Button onClick={() => table.toggleAllColumnsVisible(false)}>
                HIDE ALL
              </Button>
              <Button onClick={() => table.toggleAllColumnsVisible(true)}>
                SELECT ALL
              </Button>
            </Stack>
          </Menu>
          <Button variant="text" sx={{ marginRight: 1 }} startIcon={<GridOnIcon />} className={styles.lowVisActions}>View</Button>
          <Button variant="text" sx={{ marginRight: 1 }} startIcon={<FilterListIcon />} className={styles.lowVisActions}>Filters</Button>
          <IconButton className={styles.lowVisActions} sx={{ marginLeft: 'auto' }} onClick={exportCsvHandler}>
            <DownloadIcon />
          </IconButton>
        </Box>
      </Table >
    </Box >
  )
}

export default FullTable;