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

// Dummy Interface & Data
interface Skill {
  id: string;
  category: string;
  details: string;
}

const DUMMY_DATA: Skill[] = [
  {
    id: '1',
    category: 'Back End Web Dev',
    details: 'PHP, Laravel, CodeIgniter, RESTful API, beginner: NodeJS, ExpressJS',
  },
  {
    id: '2',
    category: 'Front End Web Dev',
    details: 'HTML, CSS, JavaScript, Bootstrap, ReactJS',
  }
];

export default function SkillsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Skill[]>(DUMMY_DATA);

  const form = useForm({
    initialValues: {
      id: '',
      category: '',
      details: '',
    },
    validate: {
      category: (value) => (value ? null : 'Category is required'),
      details: (value) => (value ? null : 'Details are required'),
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

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill category?')) {
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
        <Text fw={500}>{item.category}</Text>
      </Table.Td>
      <Table.Td>
        {item.details.split(',').map((skill, index) => (
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

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w="25%">Category</Table.Th>
            <Table.Th>Skills / Details</Table.Th>
            <Table.Th w="100px">Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

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
              {...form.getInputProps('details')}
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
