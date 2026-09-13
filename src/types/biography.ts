export interface Biography {
  id: number;
  name: string;
  birth_date: string;
  birth_place: string;
  occupation: string;
  biography: string;
  photo?: string;
  created_at: string;
  updated_at: string;
}

export type BiographyCreateInput = Omit<Biography, 'id' | 'created_at' | 'updated_at'>;
export type BiographyUpdateInput = Partial<BiographyCreateInput>;
