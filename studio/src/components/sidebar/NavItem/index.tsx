import React from 'react';
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  Theme
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ListItemStyled } from '../SidebarItems';

const NoStyleLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const selectedCss = (theme: Theme) => {
  return {
    backgroundColor: theme.palette.action.active
  }
}

export const NavItem = ({ item, currPath }: any) => {
  const Icon = item.icon;



  return (
    <NoStyleLink href={item.href} sx={(theme) => currPath.includes(item.href) ? selectedCss(theme) : {}}>
      <ListItemStyled
      >
        {Icon && <Icon stroke={1.5} size="1.3rem"></Icon>}
        <ListItemText>
          <>{item.title}</>
        </ListItemText>
      </ListItemStyled>
    </NoStyleLink >
  );
};

