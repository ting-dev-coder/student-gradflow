import { MdOutlineChevronRight } from 'react-icons/md';

import {
  Avatar,
  Box,
  Group,
  Skeleton,
  Text,
  UnstyledButton,
} from '@mantine/core';
import classes from './profile-button.module.css';
import { useRouter } from 'next/router';
import { useCurrent } from '@/app/(auth)/api/user-current';

export function ProfileButton() {
  const { data: user, isLoading } = useCurrent();
  if (isLoading) return <Skeleton h="40px" />;
  if (!user) return null;

  return (
    <Group px="xs" gap={'xs'} w="100%" className={classes.profile}>
      <Avatar
        src="https://i.ibb.co/RT7dW1fF/xnbadnpuvlw.jpg"
        alt="xnbadnpuvlw"
        radius="xl"
      />

      <Group flex="1" w="0" gap={'xxs'} pr="xs">
        <Text size="sm" fw={600} c="#fff">
          {user.name}
        </Text>

        <Text c="dimmed" size="xs" truncate="end">
          {user.email}
        </Text>
      </Group>
    </Group>
  );
}
