import React, { useEffect, useState } from 'react';
import Menuitems from './MenuItems';
import { Box, Collapse, ListItem, ListItemText, styled } from '@mui/material';
import { NavItem } from './NavItem';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { usePathname } from 'next/navigation';


export const ListItemStyled = styled(ListItem)(({ theme }) => ({
  whiteSpace: 'nowrap',
  marginBottom: '2px',
  padding: '8px 10px',
  borderRadius: '8px',
  backgroundColor: 'inherit',
  color:
    theme.palette.text.secondary,
  paddingLeft: '10px',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
  '&.Mui-selected': {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
}));

const isMenuOpen = (item: any, currPath: string) => {
  for (const subitem of item?.children) {
    if (currPath.includes(subitem.href)) {
      return true;
    }
  }
  return false;
}

const SubMenu = ({ item, currPath }: any) => {
  const [isOpen, setOpen] = useState<boolean>(isMenuOpen(item, currPath));
  const Icon = item.icon;


  return (<>
    <ListItemStyled sx={{ padding: '8px 10px', borderRadius: '8px' }} key={item.id} onClick={() => setOpen((prev) => !prev)}>
      {Icon && <Icon stroke={1.5} size="1.3rem"></Icon>}
      <ListItemText primary={item.title} />
      {isOpen ? <ExpandLess /> : <ExpandMore />}
    </ListItemStyled >
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
