'use client';
import { AppShell, Burger, Button, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '../navbar';

const AdminLayout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 0 }}
      navbar={{
        width: 270,
        breakpoint: '0',
        collapsed: { mobile: !opened },
      }}
      padding="0"
    >
      {/* <AppShell.Header>
  			<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
  			<div>Logo</div>
  		</AppShell.Header> */}

      <AppShell.Navbar
        style={{
          boxShadow: '0 4px 4px rgba(0,0,0,.25)',
        }}
        bg="var(--gray5)"
        withBorder={false}
        py="md"
      >
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AdminLayout;
