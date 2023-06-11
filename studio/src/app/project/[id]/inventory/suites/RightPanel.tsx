import { useSuiteSelect } from "@/context/SuiteSelectionContext";
import { Drawer, IconButton, styled, useTheme } from "@mui/material";
import { theme } from "@nextui-org/react";
import { useState } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const RightPanel = () => {
  const { selectSuites } = useSuiteSelect();
  const hasSuites = selectSuites && Object.values(selectSuites).find((val) => !!val);
  console.log(selectSuites);
  const [open, setOpen] = useState(true);
  const theme = useTheme();



  return (<Drawer
    sx={{
      width: 600,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 800,
        boxSizing: 'border-box',
      },
    }}
    variant="persistent"
    anchor="right"
    open={hasSuites}
  >
    <DrawerHeader>
      <IconButton onClick={() => setOpen(false)}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </DrawerHeader>
    asdfasdfs
  </Drawer>)
};


export default RightPanel;