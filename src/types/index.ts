export type DegreeLevel = 'Bachelor' | 'Master' | 'PhD' | 'Postdoc' | 'Any';
export type FundingType = 'Fully Funded' | 'Partial' | 'Stipend' | 'Tuition Only';

export interface Scholarship {
  id: string;
  title: string;
  university: string;
  country: string;
  countryCode: string; // emoji flag or ISO code
  degreeLevel: DegreeLevel[];
  fundingType: FundingType;
  deadline: string; // ISO date string
  description: string;
  eligibility: string[];
  benefits: string[];
  requirements: string[];
  imageUrl?: string;
  applyUrl: string;
  featured: boolean;
  tags: string[];
  hostCountry: string;
  category: string;
  createdAt: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  count: number;
  description: string;
}

export interface GuideLesson {
  id: string;
  title: string;
  content: string;
  duration: string; // e.g. "5 min read"
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: GuideLesson[];
}

export interface ScholarshipFilters {
  country?: string;
  degreeLevel?: DegreeLevel;
  fundingType?: FundingType;
  deadline?: string;
  query?: string;
}
