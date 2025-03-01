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

const links = [
  { icon: <></>, label: 'Dashboard', path: '/dashboard' },
  { icon: <></>, label: 'Countdown', path: '/countdown' },
  { icon: <></>, label: 'To-do List', path: '/to-do-list' },
  { icon: <></>, label: 'Pomodoro Timer', path: '/pomodoro-timer' },
];

export function Navbar() {
  const isActive = (path: string) => usePathname() == path;
  console.log(usePathname());
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
