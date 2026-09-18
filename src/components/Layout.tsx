import { AppShell, Burger, Group, Title, NavLink, Box, useMantineTheme, Text, Menu, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUsers, IconUserPlus, IconLogout, IconSettings } from '@tabler/icons-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { AuthService } from '../services/api';
import ThemeToggle from './ThemeToggle';

interface UserJwtPayload {
  user_id: string;
  name: string;
  email: string;
  exp: number;
}

export default function Layout() {
  const [opened, { toggle }] = useDisclosure(true);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  
  const [user, setUser] = useState<UserJwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<UserJwtPayload>(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
      }
    } else {
      // If no token, maybe redirect to login?
      // navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

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
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} size="sm" />
            <Title order={3} c={theme.primaryColor}>DreamDev</Title>
          </Group>
          <Group>
            <ThemeToggle />
            <Menu shadow="md" width={200}>
              <Menu.Target>
              <Group gap="xs" style={{ cursor: 'pointer' }}>
                <Avatar color="blue" radius="xl" size="sm">
                  {user ? user.name.charAt(0).toUpperCase() : 'A'}
                </Avatar>
                <Text fw={500} size="sm" visibleFrom="sm">
                  {user ? user.name : 'Admin User'}
                </Text>
              </Group>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
              <Menu.Divider />
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item 
                color="red" 
                leftSection={<IconLogout size={14} />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ display: 'flex', flexDirection: 'column' }}>
        <Box component="nav" style={{ flex: 1 }}>
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
        
        <Box mt="auto">
          <NavLink
            label="Logout"
            leftSection={<IconLogout size="1rem" stroke={1.5} />}
            onClick={handleLogout}
            color="red"
            variant="light"
            active
            style={{ borderRadius: theme.radius.sm }}
          />
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
