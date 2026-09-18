import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Group, 
  Title, 
  Table, 
  ActionIcon, 
  Modal, 
  TextInput,
  Textarea,
  Stack,
  Text,
  Loader,
  Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { apiClient, API_ROUTES } from '../services/apiRoutes';
import type { TechnicalExperience } from '../types/models';

export default function TechnicalExperiencePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<TechnicalExperience[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTechExp = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_ROUTES.TECHNICAL_EXPERIENCES);
      setData(response.data.data || response.data);
    } catch (error) {
      console.error('Failed to fetch technical experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechExp();
  }, []);

  const form = useForm({
    initialValues: {
      id: undefined as number | undefined,
      title: '',
      description: '',
    },
    validate: {
      title: (value) => (value ? null : 'Project Title is required'),
    },
  });

  const handleAdd = () => {
    setIsEditing(false);
    form.reset();
    open();
  };

  const handleEdit = (item: TechnicalExperience) => {
    setIsEditing(true);
    form.setValues({
      id: item.id,
      title: item.title,
      description: item.description || ''
    });
    open();
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await apiClient.delete(`${API_ROUTES.TECHNICAL_EXPERIENCES}/${id}`);
        fetchTechExp();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const payload = {
        title: values.title,
        description: values.description
      };

      if (isEditing && values.id) {
        await apiClient.put(`${API_ROUTES.TECHNICAL_EXPERIENCES}/${values.id}`, payload);
      } else {
        await apiClient.post(API_ROUTES.TECHNICAL_EXPERIENCES, payload);
      }
      close();
      fetchTechExp();
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const rows = data.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>
        <Text fw={500}>{item.title}</Text>
      </Table.Td>
      <Table.Td>{item.description || '-'}</Table.Td>
      <Table.Td>
        <Group gap="sm">
          <ActionIcon variant="light" color="blue" onClick={() => handleEdit(item)}>
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon variant="light" color="red" onClick={() => handleDelete(item.id)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Title order={2}>Technical Experience</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAdd} color="teal">
          Add Project
        </Button>
      </Group>

      {loading ? (
        <Center my="xl">
          <Loader color="teal" />
        </Center>
      ) : (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={50}>No.</Table.Th>
              <Table.Th w="30%">Title</Table.Th>
              <Table.Th>Description / Link</Table.Th>
              <Table.Th w="100px">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}

      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Project' : 'Add Project'} size="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Project Title"
              placeholder="e.g. Back End Developer, Repositories"
              {...form.getInputProps('title')}
            />
            <Textarea
              label="Description / URL"
              placeholder="e.g. https://github.com/asyafii27"
              minRows={3}
              {...form.getInputProps('description')}
            />
            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={close}>Cancel</Button>
              <Button type="submit" color="teal">Save</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
