import React from 'react';
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NoStyleLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

export const NavItem = ({ item, level }: any) => {
  const Icon = item.icon;
  const theme = useTheme();
  const pathName = usePathname();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItem)(() => ({
    whiteSpace: 'nowrap',
    marginBottom: '2px',
    padding: '8px 10px',
    borderRadius: '8px',
    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
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



  return (
    <NoStyleLink href={item.href} >
      <ListItemStyled
      >
        {/* <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {itemIcon}
        </ListItemIcon> */}
        <ListItemText>
          <>{item.title}</>
        </ListItemText>
      </ListItemStyled>
    </NoStyleLink >
  );
};

