import { AppShell, Burger, Group, Title, NavLink, Box, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUsers, IconUserPlus } from '@tabler/icons-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const links = [
    { icon: IconUsers, label: 'Biographies', path: '/admin' },
    { icon: IconUserPlus, label: 'Add Biography', path: '/admin/create' },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3} c={theme.primaryColor}>Biography Console</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Box component="nav">
          {links.map((link) => (
            <NavLink
              key={link.path}
              active={location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))}
              label={link.label}
              leftSection={<link.icon size="1rem" stroke={1.5} />}
              onClick={() => {
                navigate(link.path);
                if (opened) toggle();
              }}
              variant="filled"
              mb={5}
              style={{ borderRadius: theme.radius.sm }}
            />
          ))}
        </Box>
      </AppShell.Navbar>

      <AppShell.Main bg={theme.colors.gray[0]}>
        <Box p="md" style={{ maxWidth: 1200, margin: '0 auto', backgroundColor: 'white', borderRadius: theme.radius.md, minHeight: 'calc(100vh - 100px)' }}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
