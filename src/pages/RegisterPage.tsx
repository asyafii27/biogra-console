import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stack,
  Alert,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await AuthService.register({ name, email, password });
      // Redirect to login page on success
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={80}>
      <Paper withBorder shadow="md" p={40} radius="md">
        <Title ta="center" fw={900} mb="xs">
          Join DreamDev
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb={30}>
          Already have an account?{' '}
          <Anchor size="sm" component="button" onClick={() => navigate('/login')}>
            Login here
          </Anchor>
        </Text>

        {error && (
          <Alert color="red" mb="md" variant="light">
            {error}
          </Alert>
        )}
        <form onSubmit={handleRegister}>
          <Stack gap="md">
            <TextInput 
              label="Name" 
              placeholder="John Doe" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput 
              label="Confirm Password" 
              placeholder="Confirm your password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Stack>
          
          <Button fullWidth mt="xl" type="submit" color="blue" loading={loading}>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
