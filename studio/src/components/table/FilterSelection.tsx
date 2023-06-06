import { Box, Button, FormControl, Grid, InputLabel, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from "react";
import styles from './table.module.scss';
import { Checkbox } from '@nextui-org/react';
import { Table } from "@tanstack/react-table";

interface FilterSelectionProps {
  table: Table<unknown>
  handleFilterChange: (props: { [key: string]: string }) => void
}

const operationOptions = ['contains', 'eq']

export const FilterSelection = ({ table, handleFilterChange }: FilterSelectionProps) => {
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [columnId, setColumnId] = useState<string>('');
  const [operation, setOperation] = useState<string>('');
  const [val, setVal] = useState<string>('');
  return (
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
        onClose={() => {
          setFilterAnchorEl(null);
          handleFilterChange({ value: val, operation, columnId });
        }}
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
            <Grid item xs={5} textAlign='center'>
              <Typography variant="body1">Columns</Typography>
            </Grid>
            <Grid item xs={3} textAlign='center'>
              <Typography variant="body1">Operator</Typography>
            </Grid>
            <Grid item xs={4} textAlign='center'>
              <Typography variant="body1">Value</Typography>
            </Grid>
            <Grid item xs={1} sx={{ paddingLeft: 1.5 }} justifyContent='flex-end'>
              <Checkbox size="sm" css={{ marginTop: 22 }} />
            </Grid>
            <Grid item xs={4} sx={{ padding: 0 }}>
              <FormControl variant="standard" sx={{ marginLeft: 2, minWidth: 120 }}>
                <InputLabel id="column-filter">Column</InputLabel>
                <Select
                  size="small"
                  labelId="dcolumn-filter"
                  value={columnId}
                  autoWidth
                  onChange={(event) => setColumnId(event.target.value)}
                  label="Column"
                >
                  {table.getAllLeafColumns().map(column => (
                    <MenuItem key={column.id} value={column.id}>
                      <Typography variant="body1">
                        {
                          column.id
                        }
                      </Typography>
                    </MenuItem>
                  )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} sx={{ padding: 0 }}>
              <FormControl variant="standard" sx={{ marginLeft: 2, minWidth: 80 }}>
                <InputLabel id="filter-operation">Operator</InputLabel>
                <Select
                  size="small"
                  labelId="filter-operation"
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  label="Column"
                >
                  {operationOptions.map(column => (
                    <MenuItem key={column} value={column}>
                      <Typography variant="body1">
                        {
                          column
                        }
                      </Typography>
                    </MenuItem>
                  )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sx={{ padding: 0 }}>
              <FormControl variant="standard" sx={{ margin: '0 8px', minWidth: 60 }}>
                <TextField size="small" label="Standard" variant="standard" value={val}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setVal(event.target.value);
                  }} />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Menu>
    </>)
}

export default FilterSelection;
