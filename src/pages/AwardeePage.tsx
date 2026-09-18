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
interface Awardee {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

const DUMMY_DATA: Awardee[] = [
  {
    id: '1',
    title: '1st Place Hackathon',
    issuer: 'Tech University',
    date: 'Oct 2022',
    description: 'Won first place in the annual national hackathon.',
  },
  {
    id: '2',
    title: 'Best Student Award',
    issuer: 'University Faculty',
    date: '2023',
  }
];

export default function AwardeePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Awardee[]>(DUMMY_DATA);

  const form = useForm({
    initialValues: {
      id: '',
      title: '',
      issuer: '',
      date: '',
      description: '',
    },
    validate: {
      title: (value) => (value ? null : 'Award Title is required'),
      issuer: (value) => (value ? null : 'Issuer is required'),
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
      issuer: item.issuer,
      date: item.date,
      description: item.description || '',
    });
    open();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this award?')) {
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
        <Text size="sm" c="dimmed">{item.issuer}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color="green">{item.date}</Badge>
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

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Award & Issuer</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Award' : 'Add Award'} size="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Award Title"
              placeholder="e.g. Best Developer"
              {...form.getInputProps('title')}
            />
            <TextInput
              withAsterisk
              label="Issuer / Institution"
              placeholder="e.g. University Name"
              {...form.getInputProps('issuer')}
            />
            <MonthPickerInput
              label="Date / Year"
              placeholder="Pick month and year"
              value={form.values.date ? new Date(form.values.date) : null}
              onChange={(date) => form.setFieldValue('date', date ? dayjs(date).format('MMM YYYY') : '')}
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
