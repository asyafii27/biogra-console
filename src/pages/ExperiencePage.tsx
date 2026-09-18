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

// Dummy Interface & Data for UI Mockup
interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

const DUMMY_DATA: Experience[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Corp',
    startDate: 'Jan 2022',
    endDate: 'Present',
    description: 'Developing user interfaces using React and Mantine.',
  },
  {
    id: '2',
    title: 'Web Developer Intern',
    company: 'Startup Inc',
    startDate: 'Jun 2021',
    endDate: 'Dec 2021',
    description: 'Assisted in building internal tools using Vue.js.',
  }
];

export default function ExperiencePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Experience[]>(DUMMY_DATA);

  const form = useForm({
    initialValues: {
      id: '',
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    },
    validate: {
      title: (value) => (value ? null : 'Title is required'),
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
    form.setValues(item);
    open();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
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
        <Text fw={500}>{item.title}</Text>
        <Text size="sm" c="dimmed">{item.company}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light">
          {item.startDate} - {item.endDate || 'Present'}
        </Badge>
      </Table.Td>
      <Table.Td>{item.description}</Table.Td>
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

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Role & Company</Table.Th>
            <Table.Th>Duration</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Experience' : 'Add Experience'} size="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Job Title"
              placeholder="e.g. Frontend Developer"
              {...form.getInputProps('title')}
            />
            <TextInput
              withAsterisk
              label="Company"
              placeholder="e.g. Tech Corp"
              {...form.getInputProps('company')}
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
