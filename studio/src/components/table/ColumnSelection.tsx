import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { table } from "console";
import styles from './table.module.scss';

import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Checkbox } from '@nextui-org/react';
import { useState } from "react";
import { Table } from "@tanstack/react-table";

const ColumnSelection = ({ table }: { table: Table<unknown> }) => {
  const [columnAnchorEl, setColumnAnchorEl] = useState<null | HTMLElement>(null);
  return (
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
}

export default ColumnSelection;