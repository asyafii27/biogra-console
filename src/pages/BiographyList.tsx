import { useEffect, useState } from 'react';
import type { Biography } from '../types/biography';
import { BiographyService } from '../services/api';
import { 
  Title, Group, Button, TextInput, ActionIcon, 
  Loader, Text, Badge, Card, SimpleGrid 
} from '@mantine/core';
import { IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function BiographyList() {
  const [biographies, setBiographies] = useState<Biography[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchBiographies = async (searchQuery?: string) => {
    setLoading(true);
    try {
      const data = await BiographyService.getAll(searchQuery);
      setBiographies(data || []);
    } catch (error) {
      console.error('Failed to fetch biographies', error);
      // fallback to empty if error
      setBiographies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBiographies();
  }, []);

  const handleSearch = () => {
    fetchBiographies(search);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this biography?')) {
      try {
        await BiographyService.delete(id);
        fetchBiographies(search); // refresh list
      } catch (error) {
        console.error('Failed to delete biography', error);
      }
    }
  };

  return (
    <div>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Biographies</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => navigate('/biography/create')}>
          Add Biography
        </Button>
      </Group>

      <Group mb="md">
        <TextInput
          placeholder="Search by name or occupation..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1 }}
        />
        <Button onClick={handleSearch} variant="light">Search</Button>
      </Group>

      {loading ? (
        <Group justify="center" mt="xl">
          <Loader />
        </Group>
      ) : biographies.length === 0 ? (
        <Text c="dimmed" ta="center" mt="xl">No biographies found.</Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {biographies.map((bio) => (
            <Card key={bio.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{bio.name}</Text>
                <Badge color="blue" variant="light">
                  {bio.occupation}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed" lineClamp={2} mb="md">
                {bio.biography}
              </Text>

              <Group justify="flex-end" mt="auto">
                <ActionIcon variant="light" color="blue" onClick={() => navigate(`/biography/${bio.id}`)} title="View">
                  <IconEye size={18} />
                </ActionIcon>
                <ActionIcon variant="light" color="yellow" onClick={() => navigate(`/biography/edit/${bio.id}`)} title="Edit">
                  <IconEdit size={18} />
                </ActionIcon>
                <ActionIcon variant="light" color="red" onClick={() => handleDelete(bio.id)} title="Delete">
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
}
