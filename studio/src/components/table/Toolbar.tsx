import { Box, Button, Menu, MenuItem, Typography, TextField, IconButton, Stack, Grid, Select, InputLabel, FormControl } from "@mui/material"
import styles from './table.module.scss';
import DownloadIcon from '@mui/icons-material/Download';
import GridOnIcon from '@mui/icons-material/GridOn';

import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Checkbox } from '@nextui-org/react';
import { Table } from "@tanstack/react-table";
import { ExportToCsv } from 'export-to-csv';
import { Dispatch, SetStateAction, useState } from "react";
import FilterSelection from './FilterSelection';
import ColumnSelection from "./ColumnSelection";

interface ToolbarProps {
  table: Table<unknown>
  setGlobalFilter: Dispatch<SetStateAction<string>>
  handleFilterChange: (props: any) => void
}

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
};

const csvExporter = new ExportToCsv(options);


const Toolbar = ({ table, setGlobalFilter, handleFilterChange }: ToolbarProps) => {
  const exportCsvHandler = () => {
    const allRows = table.getRowModel().rows.map((row, i) => {
      const hashMap: any = {}
      row.getVisibleCells().forEach((cell) => {
        const key = cell.column.id
        hashMap[key] = cell.getValue()
      });
      return hashMap;
    })
    csvExporter.generateCsv(allRows);
  }

  return (
    <Box sx={{ p: 1 }} className={styles.toolbar}>
      <ColumnSelection table={table} />
      <Button variant="text" sx={{ marginRight: 1 }} startIcon={<GridOnIcon />} className={styles.lowVisActions}>View</Button>
      <FilterSelection table={table} handleFilterChange={handleFilterChange} />
      <TextField label="Search Table" onChange={(e) => setGlobalFilter(e.target.value)} size="small"></TextField>
      <IconButton className={styles.lowVisActions} sx={{ marginLeft: 'auto' }} onClick={exportCsvHandler}>
        <DownloadIcon />
      </IconButton>
    </Box>
  );
}

export default Toolbar;