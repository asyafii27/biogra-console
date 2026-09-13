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
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, redirect to login page (to be integrated with API later)
    navigate('/login');
  };

  return (
    <Container size={420} my={80}>
      <Title ta="center" fw={900}>
        Create an Account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button" onClick={() => navigate('/login')}>
          Login here
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleRegister}>
          <Stack gap="md">
            <TextInput label="Name" placeholder="John Doe" required />
            <TextInput label="Email" placeholder="you@mantine.dev" required />
            <PasswordInput label="Password" placeholder="Your password" required />
            <PasswordInput label="Confirm Password" placeholder="Confirm your password" required />
          </Stack>
          
          <Button fullWidth mt="xl" type="submit" color="blue">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
