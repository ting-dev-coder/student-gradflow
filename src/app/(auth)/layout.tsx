import { ReactNode } from 'react';
import Image from 'next/image';
import { Box, Button, Center, Stack, Title } from '@mantine/core';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box pt="xl">
      <Stack mx="auto" gap={0} maw="60%">
        <nav className="flex justify-between items-center">
          <Title c="var(--primary)">Gradflow</Title>
          {/* <Image src="/logo.svg" width={152} height={56} alt="logo" /> */}
        </nav>
        {children}
      </Stack>
    </Box>
  );
}
