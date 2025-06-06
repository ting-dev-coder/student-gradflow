'use client';

import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Code,
  Divider,
  Group,
  NavLink,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { ProfileButton } from '../profile-button';
import { BsPlusLg } from 'react-icons/bs';
import classes from './navbar.module.css';
import { usePathname } from 'next/navigation';
import { UserButton } from '@/app/(auth)/components/user-button';
import { MdDashboard } from 'react-icons/md';
import { PiClockCountdownFill } from 'react-icons/pi';
import { GiTomato } from 'react-icons/gi';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { RiFileList3Fill } from 'react-icons/ri';

const links = [
  { icon: MdDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: PiClockCountdownFill, label: 'Countdown', path: '/countdown' },
  { icon: RiFileList3Fill, label: 'To-do List', path: '/to-do-list' },
  { icon: GiTomato, label: 'Pomodoro Timer', path: '/pomodoro-timer' },
];

export function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname == path;

  const navItems = links.map((item, idx) => (
    <NavLink
      key={`sidebar-${idx}`}
      classNames={{
        root: classes['root'],
      }}
      href={item.path}
      label={item.label}
      active={isActive(item.path)}
      leftSection={<item.icon size={20} />}
    />
  ));

  return (
    <Stack h="100%" gap="sm" component={'nav'} className={classes.navbar}>
      <Title order={2} ta="center" c="var(--primary)">
        GradeFlow
      </Title>
      <ProfileButton />
      <Box>
        <div className={classes.collections}>{navItems}</div>
      </Box>
      <UserButton
        mt="auto"
        mx="auto"
        w="fit-content"
        variant="outline"
        color="var(--primary)"
      />
    </Stack>
  );
}
