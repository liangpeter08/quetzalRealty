import React, { useState } from 'react';
import Menuitems from './MenuItems';
import { Box, Collapse, ListItem, ListItemText } from '@mui/material';
import { NavItem } from './NavItem';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const SubMenu = ({ item }: any) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (<>
    <ListItem sx={{ padding: '8px 10px' }} button key={item.id} onClick={() => setOpen((prev) => !prev)}>
      <ListItemText primary={item.title} />
      {isOpen ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Box sx={{ marginLeft: 2 }}>
      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        {(item?.children ?? []).map((subitem: any) => {
          return <NavItem item={subitem} key={subitem.id} />
        })}
      </Collapse>
    </Box>
  </>);
}


const SidebarItems = () => {
  return (
    <Box sx={{ px: 3 }}>
      <Box sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.type === 'subMenu') {
            return <SubMenu key={item.id} item={item} />

          }

          return <NavItem item={item} key={item.id} />
        }
        )}
      </Box>
    </Box>
  );
};
export default SidebarItems;
