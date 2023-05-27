import { useMediaQuery, Box, Drawer, Stack } from '@mui/material';
import Image from 'next/image';
import SidebarItems from './SidebarItems';

const Sidebar = (props : any) => {

  const lgUp = useMediaQuery('(min-width: 768px)')

  const sidebarWidth = '270px';

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Stack direction="row" spacing={2}>
                <Image width={100} height={100} src='/quetzal.svg' alt='logo' />
                <Box sx={{display: 'flex', alignItems: 'center'}}><h3>Quetzal Realty</h3></Box>
            </Stack>
            <Box>
            <SidebarItems />
            </Box>
            
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
    </Drawer>
  );
};

export default Sidebar;
