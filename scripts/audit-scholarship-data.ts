import { MOCK_SCHOLARSHIPS } from '../src/lib/mock-data';

type AuditStatus = 'complete' | 'needs review';

type AuditCheck = {
  label: string;
  ok: boolean;
};

type AuditResult = {
  id: string;
  title: string;
  status: AuditStatus;
  missing: string[];
  checks: AuditCheck[];
};

function hasText(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

function hasItems(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0;
}

function hasAtLeast(value: unknown, count: number): boolean {
  return Array.isArray(value) && value.length >= count;
}

function auditScholarship(s: typeof MOCK_SCHOLARSHIPS[number]): AuditResult {
  const checks: AuditCheck[] = [
    { label: 'officialSourceUrl', ok: hasText(s.officialSourceUrl) },
    { label: 'applyUrl', ok: hasText(s.applyUrl) },
    { label: 'eligibilitySourceUrl', ok: hasText(s.eligibilitySourceUrl) },
    { label: 'eligibleCountries', ok: hasItems(s.eligibleCountries) },
    { label: 'eligibilityCountryNotes', ok: hasText(s.eligibilityCountryNotes) },
    { label: 'lastVerified', ok: hasText(s.lastVerified) },
    { label: 'sourceNotes', ok: hasText(s.sourceNotes) },
    { label: 'applicationProcess >= 3', ok: hasAtLeast(s.applicationProcess, 3) },
    { label: 'applicationTips >= 2', ok: hasAtLeast(s.applicationTips, 2) },
    { label: 'coverageDetails >= 2', ok: hasAtLeast(s.coverageDetails, 2) },
    { label: 'requiredDocuments >= 2', ok: hasAtLeast(s.requiredDocuments, 2) },
  ];

  if (s.isDeadlineEstimated !== true) {
    checks.push({
      label: 'isDeadlineEstimated review',
      ok: !/var(y|ies|iable|ious)|rolling|annual|check|current|cycle|estimated|pending|not fixed/i.test(
        `${s.deadline} ${s.sourceNotes ?? ''}`
      ),
    });
  }

  const missing = checks.filter((check) => !check.ok).map((check) => check.label);

  return {
    id: s.id,
    title: s.title,
    status: missing.length === 0 ? 'complete' : 'needs review',
    missing,
    checks,
  };
}

const results = MOCK_SCHOLARSHIPS.map(auditScholarship);
const complete = results.filter((result) => result.status === 'complete');
const needsReview = results.filter((result) => result.status === 'needs review');
const missingEligibleCountries = results.filter((result) => result.missing.includes('eligibleCountries'));
const missingEligibilitySource = results.filter((result) => result.missing.includes('eligibilitySourceUrl'));
const missingOfficialSource = results.filter((result) => result.missing.includes('officialSourceUrl'));

console.log('\nEasyScholars Scholarship Data Audit\n');
console.log('='.repeat(72));
console.log(`Total scholarships: ${results.length}`);
console.log(`Complete: ${complete.length}`);
console.log(`Needs review: ${needsReview.length}`);
console.log(`Missing eligible countries: ${missingEligibleCountries.length}`);
console.log(`Missing eligibility source: ${missingEligibilitySource.length}`);
console.log(`Missing official source: ${missingOfficialSource.length}`);
console.log('='.repeat(72));

for (const result of results) {
  const status = result.status === 'complete' ? 'complete' : 'needs review';
  console.log(`\n[${status}] ${result.id} - ${result.title}`);

  if (result.missing.length > 0) {
    console.log(`  Missing/review: ${result.missing.join(', ')}`);
  }
}

if (needsReview.length > 0) {
  console.log('\nReview categories');
  console.log('- complete: all required audit checks passed');
  console.log('- needs review: one or more required fields or content-depth checks failed');
  console.log('- missing eligible countries: eligibleCountries is absent or empty');
  console.log('- missing eligibility source: eligibilitySourceUrl is absent');
  console.log('- missing official source: officialSourceUrl is absent');
}

process.exit(needsReview.length > 0 ? 1 : 0);
