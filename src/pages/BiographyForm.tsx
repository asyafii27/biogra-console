import { useEffect, useState } from 'react';
import type { BiographyCreateInput } from '../types/biography';
import { BiographyService } from '../services/api';
import { 
  Title, TextInput, Button, Group, Paper, Stack, Textarea 
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, useParams } from 'react-router-dom';

export default function BiographyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);

  const form = useForm<BiographyCreateInput>({
    initialValues: {
      name: '',
      birth_date: '',
      birth_place: '',
      occupation: '',
      biography: '',
      photo: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      birth_date: (value) => (!value ? 'Birth date is required' : null), // Ideally validate format
      birth_place: (value) => (!value ? 'Birth place is required' : null),
      occupation: (value) => (!value ? 'Occupation is required' : null),
      biography: (value) => (value.length < 10 ? 'Biography must be at least 10 characters' : null),
    },
  });

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      BiographyService.getById(Number(id))
        .then((data) => {
          form.setValues({
            name: data.name,
            birth_date: data.birth_date.split('T')[0], // simple date extract
            birth_place: data.birth_place,
            occupation: data.occupation,
            biography: data.biography,
            photo: data.photo || '',
          });
        })
        .catch((error) => console.error('Failed to load biography', error))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditing]);

  const handleSubmit = async (values: BiographyCreateInput) => {
    setLoading(true);
    try {
      if (isEditing) {
        await BiographyService.update(Number(id), values);
      } else {
        await BiographyService.create(values);
      }
      navigate('/admin');
    } catch (error) {
      console.error('Failed to save biography', error);
      alert('Failed to save biography');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder maw={600} mx="auto">
      <Title order={2} mb="lg">{isEditing ? 'Edit Biography' : 'Add New Biography'}</Title>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            required
            label="Name"
            placeholder="John Doe"
            {...form.getInputProps('name')}
          />
          <Group grow>
            <TextInput
              required
              type="date"
              label="Birth Date"
              {...form.getInputProps('birth_date')}
            />
            <TextInput
              required
              label="Birth Place"
              placeholder="City, Country"
              {...form.getInputProps('birth_place')}
            />
          </Group>
          <TextInput
            required
            label="Occupation"
            placeholder="e.g. Software Engineer"
            {...form.getInputProps('occupation')}
          />
          <Textarea
            required
            label="Biography"
            placeholder="Write the biography details here..."
            minRows={5}
            {...form.getInputProps('biography')}
          />
          <TextInput
            label="Photo URL"
            placeholder="https://example.com/photo.jpg"
            {...form.getInputProps('photo')}
          />
          
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => navigate('/admin')} disabled={loading}>Cancel</Button>
            <Button type="submit" loading={loading}>Save</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
