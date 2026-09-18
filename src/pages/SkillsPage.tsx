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
  Badge,
  Loader,
  Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { apiClient, API_ROUTES } from '../services/apiRoutes';
import type { Skill } from '../types/models';

export default function SkillsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_ROUTES.SKILLS);
      setData(response.data.data || response.data);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const form = useForm({
    initialValues: {
      id: undefined as number | undefined,
      category: '',
      description: '',
    },
    validate: {
      category: (value) => (value ? null : 'Category is required'),
      description: (value) => (value ? null : 'Description/Details are required'),
    },
  });

  const handleAdd = () => {
    setIsEditing(false);
    form.reset();
    open();
  };

  const handleEdit = (item: Skill) => {
    setIsEditing(true);
    form.setValues(item);
    open();
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this skill category?')) {
      try {
        await apiClient.delete(`${API_ROUTES.SKILLS}/${id}`);
        fetchSkills();
      } catch (error) {
        console.error('Failed to delete skill:', error);
      }
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const payload = {
        category: values.category,
        description: values.description
      };

      if (isEditing && values.id) {
        await apiClient.put(`${API_ROUTES.SKILLS}/${values.id}`, payload);
      } else {
        await apiClient.post(API_ROUTES.SKILLS, payload);
      }
      close();
      fetchSkills();
    } catch (error) {
      console.error('Failed to save skill:', error);
    }
  };

  const rows = data.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>
        <Text fw={500}>{item.category}</Text>
      </Table.Td>
      <Table.Td>
        {item.description.split(',').map((skill, index) => (
          <Badge key={index} variant="outline" color="cyan" mr={4} mb={4}>
            {skill.trim()}
          </Badge>
        ))}
      </Table.Td>
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
        <Title order={2}>Skills</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAdd} color="cyan">
          Add Skill Category
        </Button>
      </Group>

      {loading ? (
        <Center my="xl">
          <Loader color="cyan" />
        </Center>
      ) : (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={50}>No.</Table.Th>
              <Table.Th w="25%">Category</Table.Th>
              <Table.Th>Skills / Details</Table.Th>
              <Table.Th w="100px">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}

      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Skill Category' : 'Add Skill Category'} size="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Category"
              placeholder="e.g. Back End Web Dev"
              {...form.getInputProps('category')}
            />
            <Textarea
              withAsterisk
              label="Skills / Details"
              placeholder="e.g. PHP, Laravel, MySQL (Comma separated)"
              minRows={3}
              {...form.getInputProps('description')}
            />
            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={close}>Cancel</Button>
              <Button type="submit" color="cyan">Save</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
