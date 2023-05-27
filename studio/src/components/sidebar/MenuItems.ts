import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uuidv4(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uuidv4(),
    title: 'Typography',
    icon: IconTypography,
    href: '/ui/typography',
  },
  {
    id: uuidv4(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/ui/shadow',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uuidv4(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uuidv4(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uuidv4(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uuidv4(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
];

export default Menuitems;
