import React from 'react';
import Menuitems from './MenuItems';
import { Box } from '@mui/material';
import {NavItem} from './NavItem';

const SidebarItems = () => {
  return (
    <Box sx={{ px: 3 }}>
      <Box sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          return <NavItem item={item} key={item.id} />
        }
        )}
      </Box>
    </Box>
  );
};
export default SidebarItems;
