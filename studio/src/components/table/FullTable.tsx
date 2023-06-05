import { getInventory } from "@/sharedApi/strapi/getInventory";
import { Box, Paper, TableContainer, TextField } from "@mui/material";
import { SortingState, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "./Table";
import { ExportToCsv } from 'export-to-csv';

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
  const [pageSize, setPageSize] = useState<number>(10)
  const keys = useMemo(() => [...queryKey, page, pageSize], [queryKey, page, pageSize])
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryFn: () => queryFn({ pagination: { page: page, pageSize } }),
    queryKey: keys
  });
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const config = {
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      globalFilter,
      sorting,
    }
  }
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
      <Table config={config} pagination={{ page: page, pageSize, setPageSize, setPage, pageCount, total }} maxHeight={200} exportCsvHandler={exportCsvHandler} />
    </Box>
  )
}

export default FullTable;