import { useSuiteSelect } from "@/context/SuiteSelectionContext";
import { Drawer, IconButton, styled, useTheme } from "@mui/material";
import { theme } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RightPanelContent from "./RightPanelContent";

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const RightPanel = () => {
  const { selectSuites } = useSuiteSelect();
  const hasSuites = selectSuites && Object.values(selectSuites).find((val) => !!val);
  console.log(selectSuites);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (hasSuites) {
      setOpen(true);
    }
  }, [setOpen, selectSuites])

  return (<Drawer
    sx={{
      width: 500,
      '& .MuiDrawer-paper': {
        width: 500,
        boxSizing: 'border-box',
      },
    }}
    variant="persistent"
    anchor="right"
    open={hasSuites && open}
  >
    <DrawerHeader>
      <IconButton sx={(theme) => ({ color: theme.palette.primary.dark })} onClick={() => setOpen(false)}>
        <ChevronRightIcon />
      </IconButton>
    </DrawerHeader>
    <RightPanelContent />
  </Drawer>)
};


export default RightPanel;