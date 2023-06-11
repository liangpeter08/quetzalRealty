import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons-react';
import { Url } from 'next/dist/shared/lib/router/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ApartmentIcon from '@mui/icons-material/Apartment';
import StoreIcon from '@mui/icons-material/Store';

type MenuType = 'item' | 'subMenu';

interface MenuItem {
  type: MenuType
  id: string
  title: string
  icon?: any
  href?: Url
  children?: MenuItem[]
}

const Menuitems: MenuItem[] = [
  {
    type: 'item',
    id: uuidv4(),
    title: 'Allocations',
    icon: StoreIcon,
    href: '/project/test-proj/allocations',
  },
  {
    type: 'subMenu',
    id: uuidv4(),
    title: 'Inventory',
    icon: ApartmentIcon,
    children: [
      {
        type: 'item',
        id: uuidv4(),
        title: 'Suites',
        icon: IconLayoutDashboard,
        href: '/project/test-proj/inventory/suites'
      },
      {
        type: 'item',
        id: uuidv4(),
        title: 'Manage',
        icon: IconLayoutDashboard,
        href: '/project/test-proj/inventory/setup'
      }
    ]
  },
  {
    type: 'item',
    id: uuidv4(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    type: 'item',
    id: uuidv4(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  {
    type: 'item',
    id: uuidv4(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    type: 'item',
    id: uuidv4(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
];

export default Menuitems;
