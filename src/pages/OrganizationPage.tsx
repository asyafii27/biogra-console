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
import type { Organization } from '../types/models';

export default function OrganizationPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_ROUTES.ORGANIZATIONS);
      setData(response.data.data || response.data);
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const form = useForm({
    initialValues: {
      id: undefined as number | undefined,
      role: '',
      organization_name: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
    },
    validate: {
      role: (value) => (value ? null : 'Role is required'),
      organization_name: (value) => (value ? null : 'Organization is required'),
    },
  });

  const handleAdd = () => {
    setIsEditing(false);
    form.reset();
    open();
  };

  const handleEdit = (item: Organization) => {
    setIsEditing(true);
    form.setValues({
      id: item.id,
      role: item.role,
      organization_name: item.organization_name,
      start_date: item.start_date,
      end_date: item.end_date || '',
      is_current: item.is_current,
      description: item.description || ''
    });
    open();
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this organization record?')) {
      try {
        await apiClient.delete(`${API_ROUTES.ORGANIZATIONS}/${id}`);
        fetchOrganizations();
      } catch (error) {
        console.error('Failed to delete organization:', error);
      }
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const payload = {
        role: values.role,
        organization_name: values.organization_name,
        start_date: values.start_date,
        end_date: values.is_current ? undefined : values.end_date,
        is_current: values.is_current,
        description: values.description
      };

      if (isEditing && values.id) {
        await apiClient.put(`${API_ROUTES.ORGANIZATIONS}/${values.id}`, payload);
      } else {
        await apiClient.post(API_ROUTES.ORGANIZATIONS, payload);
      }
      close();
      fetchOrganizations();
    } catch (error) {
      console.error('Failed to save organization:', error);
    }
  };

  const rows = data.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>
        <Text fw={500}>{item.role}</Text>
        <Text size="sm" c="dimmed">{item.organization_name}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color="grape">
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
        <Title order={2}>Organization</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAdd} color="grape">
          Add Organization
        </Button>
      </Group>

      {loading ? (
        <Center my="xl">
          <Loader color="grape" />
        </Center>
      ) : (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={50}>No.</Table.Th>
              <Table.Th>Role & Organization</Table.Th>
              <Table.Th>Duration</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}

      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Organization' : 'Add Organization'} size="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Role / Title"
              placeholder="e.g. President, Member"
              {...form.getInputProps('role')}
            />
            <TextInput
              withAsterisk
              label="Organization Name"
              placeholder="e.g. Student Union"
              {...form.getInputProps('organization_name')}
            />

            <Checkbox
              label="I currently participate here"
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
              label="Description (Optional)"
              placeholder="Describe your activities and contributions"
              minRows={3}
              {...form.getInputProps('description')}
            />
            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={close}>Cancel</Button>
              <Button type="submit" color="grape">Save</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
