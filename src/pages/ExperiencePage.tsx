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
  Center,
  Checkbox
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { MonthPickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { apiClient, API_ROUTES } from '../services/apiRoutes';
import type { Experience } from '../types/models';

export default function ExperiencePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_ROUTES.EXPERIENCES);
      // Depending on API response, it might be { data: [...] } or just an array
      setData(response.data.data || response.data);
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const form = useForm({
    initialValues: {
      id: undefined as number | undefined,
      position: '',
      company: '',
      start_date: '',
      end_date: '',
      is_current: false,
      location: '',
      description: '',
    },
    validate: {
      position: (value) => (value ? null : 'Position is required'),
      company: (value) => (value ? null : 'Company is required'),
    },
  });

  const handleAdd = () => {
    setIsEditing(false);
    form.reset();
    open();
  };

  const handleEdit = (item: Experience) => {
    setIsEditing(true);
    form.setValues({
      id: item.id,
      position: item.position,
      company: item.company,
      start_date: item.start_date,
      end_date: item.end_date || '',
      is_current: item.is_current,
      location: item.location || '',
      description: item.description || '',
    });
    open();
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await apiClient.delete(`${API_ROUTES.EXPERIENCES}/${id}`);
        fetchExperiences();
      } catch (error) {
        console.error('Failed to delete experience:', error);
      }
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      // Ensure date strings are in correct format or convert them if necessary
      // For this API payload, we will send what form has (which should be ISO or standard string)
      const payload = {
        company: values.company,
        position: values.position,
        start_date: values.start_date,
        end_date: values.is_current ? undefined : values.end_date,
        is_current: values.is_current,
        location: values.location,
        description: values.description
      };

      if (isEditing && values.id) {
        await apiClient.put(`${API_ROUTES.EXPERIENCES}/${values.id}`, payload);
      } else {
        await apiClient.post(API_ROUTES.EXPERIENCES, payload);
      }
      close();
      fetchExperiences();
    } catch (error) {
      console.error('Failed to save experience:', error);
    }
  };

  const rows = data.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>
        <Text fw={500}>{item.position}</Text>
        <Text size="sm" c="dimmed">{item.company} {item.location ? `- ${item.location}` : ''}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light">
          {item.start_date ? dayjs(item.start_date).format('MMM YYYY') : '-'} - {item.is_current ? 'Present' : (item.end_date ? dayjs(item.end_date).format('MMM YYYY') : '')}
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
        <Title order={2}>Experience</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAdd}>
          Add Experience
        </Button>
      </Group>

      {loading ? (
        <Center my="xl">
          <Loader />
        </Center>
      ) : (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={50}>No.</Table.Th>
              <Table.Th>Role & Company</Table.Th>
              <Table.Th>Duration</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}

      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Experience' : 'Add Experience'} size="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Position / Job Title"
              placeholder="e.g. Frontend Developer"
              {...form.getInputProps('position')}
            />
            <TextInput
              withAsterisk
              label="Company"
              placeholder="e.g. Tech Corp"
              {...form.getInputProps('company')}
            />
            <TextInput
              label="Location"
              placeholder="e.g. Slawi, Indonesia"
              {...form.getInputProps('location')}
            />
            
            <Checkbox
              label="I currently work here"
              checked={form.values.is_current}
              onChange={(event) => form.setFieldValue('is_current', event.currentTarget.checked)}
            />

            <Group grow>
              <MonthPickerInput
                label="Start Date"
                placeholder="Pick start month"
                value={form.values.start_date ? new Date(form.values.start_date) : null}
                onChange={(date) => form.setFieldValue('start_date', date ? dayjs(date).toISOString() : '')}
                error={form.errors.start_date}
              />
              {!form.values.is_current && (
                <MonthPickerInput
                  clearable
                  label="End Date"
                  placeholder="Pick end month"
                  value={form.values.end_date ? new Date(form.values.end_date) : null}
                  onChange={(date) => form.setFieldValue('end_date', date ? dayjs(date).toISOString() : '')}
                  error={form.errors.end_date}
                />
              )}
            </Group>
            <Textarea
              label="Description"
              placeholder="Describe your role and achievements"
              minRows={4}
              {...form.getInputProps('description')}
            />
            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={close}>Cancel</Button>
              <Button type="submit">Save</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
