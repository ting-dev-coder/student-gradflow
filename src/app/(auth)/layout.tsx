'use client';

import { ReactNode, useState } from 'react';
import { Box, Image, Center, Group, Title, Button, Stack } from '@mantine/core';
import styles from './auth.module.scss';
import WindowAnimation from './components/window-animation';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const [panel, setPanel] = useState('sign-in');
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRouteChange = (route: string) => {
    router.push(route);
  };
  return (
    <Center p="sm" w="100vw" h="100vh" bg={'var(--secondary)'}>
      <Group pos="relative" maw="1200px" w="100%" h="100%" mah="800px">
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
            <Image w={108} src="/logo.svg" />
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
              <WindowAnimation
                isDay={pathname === '/sign-in'}
                onAnimationStateChange={setIsAnimating}
              />
            </Box>

            <Image src={'/focused-work.svg'} alt="auth image" />
          </Box>
        </Center>

        <Stack pl="xxl" flex={1} h={'100%'}>
          <Group
            w="80%"
            mt="lg"
            mb={{
              base: 0,
              xl: 'xl',
            }}
            mih={40}
            mx="auto"
            justify="space-between"
          >
            {pathname === '/sign-up' && !isAnimating && (
              <Button
                size="compact-md"
                color="var(--primary)"
                w="fit-content"
                variant="subtle"
                leftSection={<IconArrowLeft size={14} />}
                onClick={() => handleRouteChange('/sign-in')}
              >
                Sign in
              </Button>
            )}
            {pathname === '/sign-in' && !isAnimating && (
              <Button
                ml="auto"
                rightSection={<IconArrowRight size={14} />}
                variant="subtle"
                color="var(--primary)"
                onClick={() => handleRouteChange('/sign-up')}
              >
                Sign up
              </Button>
            )}
          </Group>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname} // 讓 Framer Motion 重新執行動畫
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Stack>
      </Group>
    </Center>
  );
}
