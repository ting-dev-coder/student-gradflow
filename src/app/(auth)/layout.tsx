import { ReactNode } from 'react';
import Image from 'next/image';
import { Box, Button, Center, Stack } from '@mantine/core';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box>
      <Stack mx="auto" maw="60%">
        <nav className="flex justify-between items-center">
          {/* <Image src="/logo.svg" width={152} height={56} alt="logo" /> */}
          <Button variant="secondary">Sign up</Button>
        </nav>
        {children}
      </Stack>
    </Box>
  );
}
