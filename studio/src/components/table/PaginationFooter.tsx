import page from "@/app/page"
import { Box, Stack, Typography, Button, Menu, MenuItem, IconButton } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react";
import styles from './table.module.scss'
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


const PaginationFooter = ({ page = 1, pageSize = 0, pageCount = 0, total = 0, setPageSize = () => { }, setPage = () => { } }: PaginationOptions) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = page * pageSize > total ? total : page * pageSize

  const handleClose = (pageSize: number) => {
    setAnchorEl(null);
    if (isNaN(pageSize)) {
      return;
    }
    setPageSize?.(pageSize)
    setPage?.(1)
  };

  return (
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
        <IconButton disabled={page === 1} onClick={() => setPage(page - 1)} className={styles.lowVisActions}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton disabled={page === pageCount} onClick={() => setPage(page + 1)} className={styles.lowVisActions}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default PaginationFooter;