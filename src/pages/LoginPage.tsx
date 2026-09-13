import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Alert,
  Grid,
  Image,
  Box,
  Center,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      await AuthService.login({ email, password });
      // Redirect directly to admin panel on success
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid gutter={0} style={{ minHeight: '100vh', margin: 0 }}>
      {/* Left side: Image */}
      <Grid.Col span={{ base: 12, md: 6 }} visibleFrom="md">
        <Box
          style={{
            height: '100vh',
            backgroundImage: "url('/dream.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid.Col>

      {/* Right side: Login Form */}
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Center style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
          <Container size={420} w="100%">
            <Paper withBorder shadow="md" p={40} radius="md" bg="white">
              <Title ta="center" fw={900} mb="xs">
                Welcome to DreamDev!
              </Title>
              <Text c="dimmed" size="sm" ta="center" mb={30}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button" onClick={() => navigate('/register')}>
                  Create account
                </Anchor>
              </Text>

              {error && (
                <Alert color="red" mb="md" variant="light">
                  {error}
                </Alert>
              )}
              <form onSubmit={handleLogin}>
                <TextInput 
                  label="Email" 
                  placeholder="you@mantine.dev" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordInput 
                  label="Password" 
                  placeholder="Your password" 
                  required 
                  mt="md" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Group justify="space-between" mt="lg">
                  <Checkbox label="Remember me" />
                  <Anchor component="button" size="sm" onClick={(e) => e.preventDefault()}>
                    Forgot password?
                  </Anchor>
                </Group>
                <Button fullWidth mt="xl" type="submit" color="blue" loading={loading}>
                  Sign in
                </Button>
              </form>
            </Paper>
          </Container>
        </Center>
      </Grid.Col>
    </Grid>
  );
}
