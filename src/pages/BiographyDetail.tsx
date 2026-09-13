import { useEffect, useState } from 'react';
import type { Biography } from '../types/biography';
import { BiographyService } from '../services/api';
import { 
  Title, Text, Group, Button, Loader, Paper, Divider, Stack 
} from '@mantine/core';
import { IconArrowLeft, IconEdit } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function BiographyDetail() {
  const { id } = useParams();
  const [biography, setBiography] = useState<Biography | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchBiography = async () => {
        try {
          const data = await BiographyService.getById(Number(id));
          setBiography(data);
        } catch (error) {
          console.error('Failed to fetch biography', error);
        } finally {
          setLoading(false);
        }
      };
      fetchBiography();
    }
  }, [id]);

  if (loading) {
    return (
      <Group justify="center" mt="xl">
        <Loader />
      </Group>
    );
  }

  if (!biography) {
    return (
      <Stack align="center" mt="xl">
        <Text>Biography not found.</Text>
        <Button onClick={() => navigate('/admin')} variant="light">Back to List</Button>
      </Stack>
    );
  }

  return (
    <div>
      <Group justify="space-between" mb="md">
        <Button leftSection={<IconArrowLeft size={16} />} variant="subtle" onClick={() => navigate('/admin')}>
          Back
        </Button>
        <Button 
          leftSection={<IconEdit size={16} />} 
          color="yellow" 
          onClick={() => navigate(`/admin/edit/${biography.id}`)}
        >
          Edit
        </Button>
      </Group>

      <Paper shadow="sm" p="xl" radius="md" withBorder>
        <Title order={2} mb="xs">{biography.name}</Title>
        <Text c="dimmed" size="lg" mb="lg">{biography.occupation}</Text>
        
        <Divider mb="md" />

        <Group mb="md">
          <Text fw={500} w={100}>Born:</Text>
          <Text>{new Date(biography.birth_date).toLocaleDateString()} in {biography.birth_place}</Text>
        </Group>

        <Divider mb="md" />
        
        <Text fw={500} mb="xs">Biography:</Text>
        <Text style={{ whiteSpace: 'pre-line' }} lh={1.6}>
          {biography.biography}
        </Text>

        <Group justify="flex-end" mt="xl">
          <Text size="xs" c="dimmed">
            Added: {new Date(biography.created_at).toLocaleString()}
          </Text>
        </Group>
      </Paper>
    </div>
  );
}
