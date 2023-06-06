import { Box, Button, Menu, MenuItem, Typography, TextField, IconButton, Stack, Grid, Select, InputLabel, FormControl } from "@mui/material"
import styles from './table.module.scss';
import DownloadIcon from '@mui/icons-material/Download';
import GridOnIcon from '@mui/icons-material/GridOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Checkbox } from '@nextui-org/react';
import { Table } from "@tanstack/react-table";
import { ExportToCsv } from 'export-to-csv';
import { Dispatch, SetStateAction, useState } from "react";

interface ToolbarProps {
  table: Table<unknown>
  setGlobalFilter: Dispatch<SetStateAction<string>>
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


const Toolbar = ({ table, setGlobalFilter }: ToolbarProps) => {
  const [columnAnchorEl, setColumnAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

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

  const columnSelection = (
    <>
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
    </>
  )

  const filterSelection = (
    <>
      <Button variant="text"
        sx={{ marginRight: 1 }} startIcon={<FilterListIcon />}
        aria-label="more"
        id="filters"
        aria-controls={!!filterAnchorEl ? 'filter-menu' : undefined}
        aria-expanded={filterAnchorEl ? 'true' : undefined}
        aria-haspopup="true"
        onClick={(event) => setFilterAnchorEl(event.currentTarget)} className={styles.lowVisActions}>
        Filters
      </Button>
      <Menu
        id="filter-menu"
        MenuListProps={{
          'aria-labelledby': 'filters',
        }}
        anchorEl={filterAnchorEl}
        open={!!filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        elevation={5}
        PaperProps={{
          style: {
            width: 400,
            paddingTop: 10,
            maxHeight: 48 * 4.5,
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container rowSpacing={1}>
            <Grid item md={5} textAlign='center'>
              <Typography variant="body1">Columns</Typography>
            </Grid>
            <Grid item md={3} textAlign='center'>
              <Typography variant="body1">Operator</Typography>
            </Grid>
            <Grid item md={4} textAlign='center'>
              <Typography variant="body1">Value</Typography>
            </Grid>
            <Grid item md={1} sx={{ paddingLeft: 1.5 }} justifyContent='flex-end'>
              <Checkbox size="sm" css={{ marginTop: 22 }} />
            </Grid>
            <Grid item md={4} sx={{ padding: 0 }}>
              <FormControl variant="standard" sx={{ marginLeft: 2, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={''}
                  autoWidth
                  onChange={() => { }}
                  label="Age"
                >
                  <MenuItem value="" sx={{ minWidth: 120 }}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10} sx={{ minWidth: 120 }}>Ten</MenuItem>
                  <MenuItem value={20} sx={{ minWidth: 120 }}>Twenty</MenuItem>
                  <MenuItem value={30} sx={{ minWidth: 120 }}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={9} md={3} sx={{ padding: 0 }}>
              <FormControl variant="standard" sx={{ marginLeft: 2, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={''}
                  onChange={() => { }}
                  label="Age"
                >
                  <MenuItem value="" sx={{ minWidth: 80 }}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10} sx={{ minWidth: 120 }}>Ten</MenuItem>
                  <MenuItem value={20} sx={{ minWidth: 120 }}>Twenty</MenuItem>
                  <MenuItem value={30} sx={{ minWidth: 120 }}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} sx={{ padding: 0 }}>
              <FormControl variant="standard" sx={{ marginLeft: 2, minWidth: 100 }}>
                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={''}
                  autoWidth
                  onChange={() => { }}
                  label="Age"
                >
                  <MenuItem value="" sx={{ minWidth: 120 }}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10} sx={{ minWidth: 120 }}>Ten</MenuItem>
                  <MenuItem value={20} sx={{ minWidth: 120 }}>Twenty</MenuItem>
                  <MenuItem value={30} sx={{ minWidth: 120 }}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Menu>
    </>
  )
  return (
    <Box sx={{ p: 1 }} className={styles.toolbar}>
      {columnSelection}
      <Button variant="text" sx={{ marginRight: 1 }} startIcon={<GridOnIcon />} className={styles.lowVisActions}>View</Button>
      {filterSelection}
      <TextField label="Search Table" onChange={(e) => setGlobalFilter(e.target.value)} size="small"></TextField>
      <IconButton className={styles.lowVisActions} sx={{ marginLeft: 'auto' }} onClick={exportCsvHandler}>
        <DownloadIcon />
      </IconButton>
    </Box>
  );
}

export default Toolbar;