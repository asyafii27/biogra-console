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
  Anchor
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash, IconPlus, IconExternalLink } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

// Dummy Interface & Data
interface TechnicalExperience {
  id: string;
  title: string;
  company: string;
  link: string;
  description?: string;
}

const DUMMY_DATA: TechnicalExperience[] = [
  {
    id: '1',
    title: 'Back End Developer',
    company: 'PT. Elgibor Solusi Digital',
    link: 'https://warped-crescent-850539.docs.buildwithfern.com',
    description: 'Postman Documentation for promotion delivery APIs',
  },
  {
    id: '2',
    title: 'Bootcamp MERN (Build with Angga)',
    company: 'Independent Study',
    link: 'https://warped-crescent-850539-544217.docs.buildwithfern.com',
    description: 'Postman Documentation for event organizers',
  }
];

export default function TechnicalExperiencePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<TechnicalExperience[]>(DUMMY_DATA);

  const form = useForm({
    initialValues: {
      id: '',
      title: '',
      company: '',
      link: '',
      description: '',
    },
    validate: {
      title: (value) => (value ? null : 'Project Title is required'),
      company: (value) => (value ? null : 'Company / Context is required'),
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
      ...item,
      description: item.description || ''
    });
    open();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
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
      <Table.Td>{item.description || '-'}</Table.Td>
      <Table.Td>
        {item.link ? (
          <Anchor href={item.link} target="_blank" size="sm" display="flex" style={{ alignItems: 'center', gap: '4px' }}>
            View Link <IconExternalLink size={14} />
          </Anchor>
        ) : (
          '-'
        )}
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
        <Title order={2}>Technical Experience</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAdd} color="teal">
          Add Project
        </Button>
      </Group>

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title & Company</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Link</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Project' : 'Add Project'} size="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Project Title"
              placeholder="e.g. Back End Developer"
              {...form.getInputProps('title')}
            />
            <TextInput
              withAsterisk
              label="Company / Context"
              placeholder="e.g. PT. Elgibor Solusi Digital"
              {...form.getInputProps('company')}
            />
            <TextInput
              label="Project URL / Link"
              placeholder="https://..."
              {...form.getInputProps('link')}
            />
            <Textarea
              label="Description (Optional)"
              placeholder="Additional details, tech stack, etc."
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
