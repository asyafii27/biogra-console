export interface Experience {
  id?: number;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  location?: string;
  description?: string;
}

export interface Awardee {
  id?: number;
  title: string;
  date: string;
  description?: string;
}

export interface Organization {
  id?: number;
  role: string;
  organization_name: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
}

export interface Skill {
  id?: number;
  category: string;
  description: string;
}

export interface TechnicalExperience {
  id?: number;
  title: string;
  description: string;
}

// Interfaces untuk API Responses yang memiliki pagination
export interface ApiResponse<T> {
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}
