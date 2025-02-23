'use client';

import { ReactNode, useState } from 'react';
//import Image from 'next/image';
import {
  Box,
  Image,
  Button,
  Center,
  Group,
  Text,
  SegmentedControl,
  Stack,
  Title,
} from '@mantine/core';
import styles from './auth.module.scss';
import WindowAnimation from './components/window-animation';
import { usePathname } from 'next/navigation';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [panel, setPanel] = useState('sign-in');
  const pathname = usePathname();
  return (
    <Center p="sm" w="100vw" h="100vh" bg={'#132338'}>
      <Group pos="relative" maw="1200px" w="100%" h="100%">
        <Center
          flex={1}
          className={`${styles['sign-in-container']} ${
            panel === 'sign-up' && styles['sign-out-container']
          }`}
        >
          <Title
            c="var(--primary)"
            order={2}
            pos={'absolute'}
            left={20}
            top={20}
          >
            Student Gardflow
          </Title>
          <Box className={styles['sign-in-square_skew']} />
          <Box className={styles['sign-in-square']} />
          <Box maw={'345px'} pos="relative">
            <Box
              style={{ zIndex: -1 }}
              w={'50%'}
              left={'40%'}
              top="5%"
              pos="absolute"
            >
              <WindowAnimation isDay={pathname === '/sign-up'} />
            </Box>

            <Image src={'/focused-work.svg'} alt="auth image" />
          </Box>

          {/* <Button
            className={styles['sign-up-button']}
            pos={'absolute'}
            top="24px"
            color="var(--primary)"
            variant="outline"
            right={-24}
            size="compact-md"
            onClick={() => setPanel('sign-up')}
          >
            Sign Up
          </Button> */}
        </Center>

        <Box pl="xxl" flex={1} h={'100%'}>
          {children}
        </Box>
      </Group>
    </Center>
  );
}
