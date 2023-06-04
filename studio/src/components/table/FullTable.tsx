import { getInventory } from "@/sharedApi/strapi/getInventory";
import { Box, Paper, TableContainer, TextField } from "@mui/material";
import { SortingState, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "./Table";

interface FullTableProps {
    columns: any
    queryKey: any
    queryFn: (props: any) => Promise<any>
}
// {
//     queryKey: ["inventory", page, pageSize],
//         queryFn: () => getInventory({ pagination: { page: page, pageSize } }),
// }

const FullTable = ({ columns, queryKey, queryFn }: FullTableProps) => {
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(5)
    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryFn: () => queryFn({ pagination: { page: page, pageSize } }),
        queryKey: [...queryKey, page, pageSize]
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

    return (
        <Box sx={{ m: 5 }}>
            <TextField label="Search Table" onChange={(e) => setGlobalFilter(e.target.value)}></TextField>
            <Table config={config} pagination={{ page: page, pageSize, setPageSize, setPage, pageCount, total }} maxHeight={200} />
        </Box>
    )
}

export default FullTable;