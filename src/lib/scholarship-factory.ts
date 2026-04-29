import { Scholarship } from '@/types';
import type { DegreeLevel, FundingType } from '@/types';

interface CompactScholarship {
  id: string;
  t: string; // title
  on?: string; // officialName
  u: string; // university
  c: string; // country
  cc: string; // countryCode
  dl: DegreeLevel[]; // degreeLevel
  ft: FundingType; // fundingType
  d: string; // deadline
  ide?: boolean; // isDeadlineEstimated
  desc: string;
  el: string[]; // eligibility
  ben: string[]; // benefits
  cd: string[]; // coverageDetails
  req: string[]; // requirements (legacy)
  rdoc: string[]; // requiredDocuments
  ap: string[]; // applicationProcess
  sc: string[]; // selectionCriteria
  tips: string[]; // applicationTips
  lr?: string[]; // languageRequirements
  ec?: string[]; // eligibleCountries
  ic?: string[]; // ineligibleCountries
  url: string; // applyUrl
  osu: string; // officialSourceUrl
  lv: string; // lastVerified
  sn?: string; // sourceNotes
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
    officialName: s.on,
    university: s.u,
    country: s.c,
    countryCode: s.cc,
    degreeLevel: s.dl,
    fundingType: s.ft,
    deadline: s.d,
    isDeadlineEstimated: s.ide,
    description: s.desc,
    eligibility: s.el,
    benefits: s.ben,
    coverageDetails: s.cd,
    requirements: s.req,
    requiredDocuments: s.rdoc,
    applicationProcess: s.ap,
    selectionCriteria: s.sc,
    applicationTips: s.tips,
    languageRequirements: s.lr,
    eligibleCountries: s.ec,
    ineligibleCountries: s.ic,
    applyUrl: s.url,
    officialSourceUrl: s.osu,
    lastVerified: s.lv,
    sourceNotes: s.sn,
    featured: s.feat ?? false,
    tags: s.tags,
    hostCountry: s.hc,
    category: s.cat,
    createdAt: s.ca,
  };
}

export type { CompactScholarship };
