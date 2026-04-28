import { Scholarship } from '@/types';
import type { DegreeLevel, FundingType } from '@/types';

interface CompactScholarship {
  id: string;
  t: string; // title
  u: string; // university
  c: string; // country
  cc: string; // countryCode
  dl: DegreeLevel[]; // degreeLevel
  ft: FundingType; // fundingType
  d: string; // deadline
  desc: string;
  el: string[]; // eligibility
  ben: string[]; // benefits
  req: string[]; // requirements
  url: string; // applyUrl
  feat?: boolean;
  tags: string[];
  hc: string; // hostCountry
  cat: string; // category
  ca: string; // createdAt
}

export function expand(s: CompactScholarship): Scholarship {
  return {
    id: s.id,
    title: s.t,
    university: s.u,
    country: s.c,
    countryCode: s.cc,
    degreeLevel: s.dl,
    fundingType: s.ft,
    deadline: s.d,
    description: s.desc,
    eligibility: s.el,
    benefits: s.ben,
    requirements: s.req,
    applyUrl: s.url,
    featured: s.feat ?? false,
    tags: s.tags,
    hostCountry: s.hc,
    category: s.cat,
    createdAt: s.ca,
  };
}

export type { CompactScholarship };
