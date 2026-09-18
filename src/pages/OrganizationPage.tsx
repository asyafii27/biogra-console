import { useState } from 'react';
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
  Badge
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { MonthPickerInput } from '@mantine/dates';
import dayjs from 'dayjs';

// Dummy Interface & Data
interface Organization {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description?: string;
}

const DUMMY_DATA: Organization[] = [
  {
    id: '1',
    role: 'President',
    organization: 'Computer Science Student Union',
    startDate: 'Jan 2022',
    endDate: 'Dec 2022',
    description: 'Led the student union and organized tech events.',
  }
];

export default function OrganizationPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Organization[]>(DUMMY_DATA);

  const form = useForm({
    initialValues: {
      id: '',
      role: '',
      organization: '',
      startDate: '',
      endDate: '',
      description: '',
    },
    validate: {
      role: (value) => (value ? null : 'Role is required'),
      organization: (value) => (value ? null : 'Organization is required'),
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
      ...item,
      description: item.description || ''
    });
    open();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this organization record?')) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (values: typeof form.values) => {
    if (isEditing) {
      setData(data.map((item) => (item.id === values.id ? values : item)));
    } else {
      setData([...data, { ...values, id: Date.now().toString() }]);
    }
    close();
  };

  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Text fw={500}>{item.role}</Text>
        <Text size="sm" c="dimmed">{item.organization}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color="grape">
          {item.startDate} - {item.endDate || 'Present'}
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

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Role & Organization</Table.Th>
            <Table.Th>Duration</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

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
              {...form.getInputProps('organization')}
            />
            <Group grow>
              <MonthPickerInput
                label="Start Date"
                placeholder="Pick start month"
                value={form.values.startDate && form.values.startDate !== 'Present' ? new Date(form.values.startDate) : null}
                onChange={(date) => form.setFieldValue('startDate', date ? dayjs(date).format('MMM YYYY') : '')}
                error={form.errors.startDate}
              />
              <MonthPickerInput
                clearable
                label="End Date"
                placeholder="Leave empty for Present"
                value={form.values.endDate && form.values.endDate !== 'Present' ? new Date(form.values.endDate) : null}
                onChange={(date) => form.setFieldValue('endDate', date ? dayjs(date).format('MMM YYYY') : '')}
                error={form.errors.endDate}
              />
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
