import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
const Menuitems = [
  {
    id: uuidv4(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
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
