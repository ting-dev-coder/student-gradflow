import { MdOutlineChevronRight } from 'react-icons/md';

import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import classes from './profile-button.module.css';
import { useRouter } from 'next/router';
import { useCurrent } from '@/app/(auth)/api/user-current';

export function ProfileButton() {
  const { data: user, isLoading } = useCurrent();

  if (!user) return null;

  return (
    <UnstyledButton w="100%" className={classes.profile}>
      <Group gap={'xs'}>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user.name}
          </Text>

          <Text c="dimmed" size="xs">
            {user.email}
          </Text>
        </div>

        <MdOutlineChevronRight size={14} />
      </Group>
    </UnstyledButton>
  );
}
