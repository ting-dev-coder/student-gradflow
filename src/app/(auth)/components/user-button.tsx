'use client';

import { useRouter } from 'next/navigation';
import { useCurrent } from '../api/user-current';
import { useLogout } from '../api/user-logout';
import { memo } from 'react';
import { Button, ButtonProps, Loader } from '@mantine/core';

export const UserButton = memo(({ ...props }: ButtonProps) => {
  const { mutate: logout } = useLogout();
  const { data: user, isLoading } = useCurrent();
  const router = useRouter();

  if (!user) return null;
  function onLogoutClick() {
    logout();
    router.replace('/sign-in');
  }
  return (
    <Button {...props} onClick={onLogoutClick} disabled={isLoading}>
      Logout
    </Button>
  );
});
