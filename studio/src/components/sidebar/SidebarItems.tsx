import React, { Component, useEffect, useState } from 'react';
import Menuitems from './MenuItems';
import { Box, Collapse, ListItem, ListItemText } from '@mui/material';
import { NavItem } from './NavItem';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useSidebar } from '@/context/SidebarContext';
import { usePathname } from 'next/navigation';

const SubMenu = ({ item, currPath }: any) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const Icon = item.icon;
  return (<>
    <ListItem sx={{ padding: '8px 10px', borderRadius: '8px' }} key={item.id} onClick={() => setOpen((prev) => !prev)}>
      {Icon && <Icon sx={{ marginRight: 1, marginLeft: -1 }} stroke={1.5} size="1.3rem"></Icon>}
      <ListItemText primary={item.title} />
      {isOpen ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Box sx={{ marginLeft: 2 }}>
      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        {(item?.children ?? []).map((subitem: any) => {
          return <NavItem item={subitem} currPath={currPath} key={subitem.id} />
        })}
      </Collapse>
    </Box>
  </>);
}


const SidebarItems = () => {
  const pathName = usePathname();

  return (
    <Box sx={{ px: 3 }}>
      <Box sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.type === 'subMenu') {
            return <SubMenu currPath={pathName} key={item.id} item={item} />

          }

          return <NavItem currPath={pathName} item={item} key={item.id} />
        }
        )}
      </Box>
    </Box>
  );
};
export default SidebarItems;
