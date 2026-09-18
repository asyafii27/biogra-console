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
import { MonthPickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { apiClient, API_ROUTES } from '../services/apiRoutes';
import type { Awardee } from '../types/models';

export default function AwardeePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Awardee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAwardees = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_ROUTES.AWARDEES);
      setData(response.data.data || response.data);
    } catch (error) {
      console.error('Failed to fetch awardees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAwardees();
  }, []);

  const form = useForm({
    initialValues: {
      id: undefined as number | undefined,
      title: '',
      date: '',
      description: '',
    },
    validate: {
      title: (value) => (value ? null : 'Award Title is required'),
    },
  });

  const handleAdd = () => {
    setIsEditing(false);
    form.reset();
    open();
  };

  const handleEdit = (item: Awardee) => {
    setIsEditing(true);
    form.setValues({
      id: item.id,
      title: item.title,
      date: item.date,
      description: item.description || '',
    });
    open();
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this award?')) {
      try {
        await apiClient.delete(`${API_ROUTES.AWARDEES}/${id}`);
        fetchAwardees();
      } catch (error) {
        console.error('Failed to delete awardee:', error);
      }
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const payload = {
        title: values.title,
        date: values.date,
        description: values.description
      };

      if (isEditing && values.id) {
        await apiClient.put(`${API_ROUTES.AWARDEES}/${values.id}`, payload);
      } else {
        await apiClient.post(API_ROUTES.AWARDEES, payload);
      }
      close();
      fetchAwardees();
    } catch (error) {
      console.error('Failed to save awardee:', error);
    }
  };

  const rows = data.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>
        <Text fw={500}>{item.title}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color="green">
          {item.date ? dayjs(item.date).format('MMM YYYY') : '-'}
        </Badge>
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
        <Title order={2}>Awards</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAdd} color="green">
          Add Award
        </Button>
      </Group>

      {loading ? (
        <Center my="xl">
          <Loader color="green" />
        </Center>
      ) : (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={50}>No.</Table.Th>
              <Table.Th>Award Title</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}

      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Award' : 'Add Award'} size="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Award Title"
              placeholder="e.g. Best Developer"
              {...form.getInputProps('title')}
            />
            <MonthPickerInput
              label="Date / Year"
              placeholder="Pick month and year"
              value={form.values.date ? new Date(form.values.date) : null}
              onChange={(date) => form.setFieldValue('date', date ? dayjs(date).toISOString() : '')}
              error={form.errors.date}
            />
            <Textarea
              label="Description (Optional)"
              placeholder="Additional details about this award"
              minRows={3}
              {...form.getInputProps('description')}
            />
            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={close}>Cancel</Button>
              <Button type="submit" color="green">Save</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
