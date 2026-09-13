import axios from 'axios'

export interface Biography { id: number; name: string; birth_date: string; birth_place: string; occupation: string; biography: string; photo?: string; created_at: string; updated_at: string }
export type BiographyInput = Omit<Biography, 'id' | 'created_at' | 'updated_at'>

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api', headers: { 'Content-Type': 'application/json' } })
const now = '2024-06-15T09:00:00Z'
export const demoBiographies: Biography[] = [
  { id: 1, name: 'B. J. Habibie', birth_date: '1936-06-25', birth_place: 'Parepare', occupation: 'Engineer & President', biography: 'Bacharuddin Jusuf Habibie was an Indonesian engineer and the third president of Indonesia. He is remembered for his work in aviation and technology.', photo: '', created_at: now, updated_at: now },
  { id: 2, name: 'R. A. Kartini', birth_date: '1879-04-21', birth_place: 'Jepara', occupation: 'National Hero', biography: 'Raden Ayu Kartini was a Javanese aristocrat and pioneer of women’s rights in Indonesia. Her letters became the foundation of an important national movement.', photo: '', created_at: '2024-05-22T09:00:00Z', updated_at: now },
  { id: 3, name: 'Susi Pudjiastuti', birth_date: '1965-01-15', birth_place: 'Pangandaran', occupation: 'Entrepreneur', biography: 'Susi Pudjiastuti is an Indonesian entrepreneur and former Minister of Maritime Affairs and Fisheries, known for her direct leadership and bold reforms.', photo: '', created_at: '2024-05-10T09:00:00Z', updated_at: now },
  { id: 4, name: 'Andrea Hirata', birth_date: '1967-10-24', birth_place: 'Belitung', occupation: 'Writer', biography: 'Andrea Hirata is an Indonesian author whose celebrated novels draw on the landscape, friendship, and education of Belitung.', photo: '', created_at: '2024-04-18T09:00:00Z', updated_at: now },
]

export const api = {
  async list() { try { const response = await client.get<{ data: Biography[] }>('/biographies'); return response.data.data ?? response.data as unknown as Biography[] } catch { return demoBiographies } },
  async create(input: BiographyInput) { try { const response = await client.post<Biography>('/biographies', input); return response.data } catch { return { ...input, id: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } } },
  async update(id: number, input: BiographyInput) { try { const response = await client.put<Biography>(`/biographies/${id}`, input); return response.data } catch { return { ...input, id, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } } },
  async remove(id: number) { try { await client.delete(`/biographies/${id}`) } catch { return id } },
}
