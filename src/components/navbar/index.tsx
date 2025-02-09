'use client';

import {
  ActionIcon,
  Badge,
  Box,
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

const links = [
  { icon: <></>, label: 'Dashboard', path: '/' },
  { icon: <></>, label: 'Countdown', path: '/countdown' },
  { icon: <></>, label: 'To-do List', path: '/to-do-list' },
  { icon: <></>, label: 'Pomodoro Timer', path: '/pomodoro-timer' },
];

export function Navbar() {
  const isActive = (path: string) => usePathname() == path;

  const navItems = links.map((item, idx) => (
    <NavLink
      key={`sidebar-${idx}}`}
      classNames={{
        root: classes['root'],
      }}
      href={item.path}
      label={item.label}
      active={isActive(item.path)}
      leftSection={<BsPlusLg size={16} />}
    />
  ));

  return (
    <Stack gap="sm" component={'nav'} className={classes.navbar}>
      <Title c="var(--yellow1)">Gradflow</Title>
      <Divider />
      <Box px="md">
        <ProfileButton />
      </Box>
      <Divider />
      <Box>
        <div className={classes.collections}>{navItems}</div>
      </Box>
    </Stack>
  );
}
