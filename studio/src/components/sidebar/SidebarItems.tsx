import React from 'react';
import Menuitems from './MenuItems';
import { Box, List } from '@mui/material';
import {NavItem} from './NavItem';

const SidebarItems = () => {
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => 
              <NavItem item={item} key={item.id} />
        )}
      </List>
    </Box>
  );
};
export default SidebarItems;
