'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import {
  AlertCircle,
  CheckCircle,
  Database,
  Edit,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import {
  deleteScholarship,
  getAdminScholarships,
  saveScholarship,
  seedScholarships,
} from '@/lib/scholarships';
import { isAllowedAdminEmail } from '@/lib/admin-auth';
import { DegreeLevel, FundingType, Scholarship } from '@/types';

const DEGREE_LEVELS: DegreeLevel[] = ['Bachelor', 'Master', 'PhD', 'Postdoc', 'Any'];
const FUNDING_TYPES: FundingType[] = ['Fully Funded', 'Partial', 'Stipend', 'Tuition Only'];

const ARRAY_FIELDS = [
  'degreeLevel',
  'eligibility',
  'benefits',
  'coverageDetails',
  'requiredDocuments',
  'languageRequirements',
  'eligibleCountries',
  'ineligibleCountries',
  'applicationProcess',
  'selectionCriteria',
  'applicationTips',
  'tags',
] as const;

type ArrayField = typeof ARRAY_FIELDS[number];

type ScholarshipFormState = Omit<
  Scholarship,
  | 'degreeLevel'
  | 'eligibility'
  | 'benefits'
  | 'coverageDetails'
  | 'requirements'
  | 'requiredDocuments'
  | 'languageRequirements'
  | 'eligibleCountries'
  | 'ineligibleCountries'
  | 'applicationProcess'
  | 'selectionCriteria'
  | 'applicationTips'
  | 'tags'
> & Record<ArrayField, string>;

function parseList(value: string): string[] {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatList(value?: string[]): string {
  return (value ?? []).join('\n');
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

function createEmptyForm(): ScholarshipFormState {
  const today = new Date().toISOString().slice(0, 10);

  return {
    id: '',
    title: '',
    officialName: '',
    university: '',
    country: '',
    countryCode: '',
    degreeLevel: 'Master',
    fundingType: 'Fully Funded',
    deadline: today,
    isDeadlineEstimated: false,
    description: '',
    eligibility: '',
    benefits: '',
    coverageDetails: '',
    requiredDocuments: '',
    languageRequirements: '',
    eligibleCountries: '',
    ineligibleCountries: '',
    eligibilityCountryNotes: '',
    eligibilitySourceUrl: '',
    applyUrl: '',
    officialSourceUrl: '',
    lastVerified: today,
    sourceNotes: '',
    applicationProcess: '',
    selectionCriteria: '',
    applicationTips: '',
    featured: false,
    tags: '',
    hostCountry: '',
    category: 'Government',
    createdAt: today,
  };
}

function scholarshipToForm(scholarship: Scholarship): ScholarshipFormState {
  return {
    ...scholarship,
    officialName: scholarship.officialName ?? '',
    isDeadlineEstimated: scholarship.isDeadlineEstimated ?? false,
    languageRequirements: formatList(scholarship.languageRequirements),
    eligibleCountries: formatList(scholarship.eligibleCountries),
    ineligibleCountries: formatList(scholarship.ineligibleCountries),
    eligibilityCountryNotes: scholarship.eligibilityCountryNotes ?? '',
    eligibilitySourceUrl: scholarship.eligibilitySourceUrl ?? '',
    sourceNotes: scholarship.sourceNotes ?? '',
    degreeLevel: formatList(scholarship.degreeLevel),
    eligibility: formatList(scholarship.eligibility),
    benefits: formatList(scholarship.benefits),
    coverageDetails: formatList(scholarship.coverageDetails),
    requiredDocuments: formatList(scholarship.requiredDocuments),
    applicationProcess: formatList(scholarship.applicationProcess),
    selectionCriteria: formatList(scholarship.selectionCriteria),
    applicationTips: formatList(scholarship.applicationTips),
    tags: formatList(scholarship.tags),
  };
}

function formToScholarship(form: ScholarshipFormState): Scholarship {
  const degreeLevel = parseList(form.degreeLevel).filter((value): value is DegreeLevel =>
    DEGREE_LEVELS.includes(value as DegreeLevel)
  );
  const requiredDocuments = parseList(form.requiredDocuments);

  return {
    id: form.id.trim() || `${slugify(form.title) || 'scholarship'}-${Date.now()}`,
    title: form.title.trim(),
    officialName: (form.officialName ?? '').trim(),
    university: form.university.trim(),
    country: form.country.trim(),
    countryCode: form.countryCode.trim(),
    degreeLevel: degreeLevel.length > 0 ? degreeLevel : ['Master'],
    fundingType: form.fundingType,
    deadline: form.deadline,
    isDeadlineEstimated: form.isDeadlineEstimated ?? false,
    description: form.description.trim(),
    eligibility: parseList(form.eligibility),
    benefits: parseList(form.benefits),
    coverageDetails: parseList(form.coverageDetails),
    requirements: requiredDocuments,
    requiredDocuments,
    languageRequirements: parseList(form.languageRequirements),
    eligibleCountries: parseList(form.eligibleCountries),
    ineligibleCountries: parseList(form.ineligibleCountries),
    eligibilityCountryNotes: (form.eligibilityCountryNotes ?? '').trim(),
    eligibilitySourceUrl: (form.eligibilitySourceUrl ?? '').trim(),
    applicationProcess: parseList(form.applicationProcess),
    selectionCriteria: parseList(form.selectionCriteria),
    applicationTips: parseList(form.applicationTips),
    applyUrl: form.applyUrl.trim(),
    officialSourceUrl: form.officialSourceUrl.trim(),
    lastVerified: form.lastVerified,
    sourceNotes: (form.sourceNotes ?? '').trim(),
    featured: form.featured ?? false,
    tags: parseList(form.tags),
    hostCountry: form.country.trim(),
    category: form.category.trim() || 'Government',
    createdAt: form.createdAt || new Date().toISOString().slice(0, 10),
  };
}

function TextInput({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-800/60"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-800/60"
      />
      {hint && <span className="mt-1 block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [form, setForm] = useState<ScholarshipFormState>(createEmptyForm());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const currentAuth = auth;

    if (!isFirebaseConfigured() || !currentAuth) {
      router.replace('/admin/login');
      return;
    }

    return onAuthStateChanged(currentAuth, async (currentUser) => {
      if (!currentUser) {
        router.replace('/admin/login');
        return;
      }

      if (!isAllowedAdminEmail(currentUser.email)) {
        await signOut(currentAuth);
        router.replace('/admin/login');
        return;
      }

      setUser(currentUser);
      setAuthLoading(false);
    });
  }, [router]);

  const loadScholarships = async () => {
    setLoadingData(true);
    setStatus(null);

    try {
      const data = await getAdminScholarships();
      setScholarships(data);
    } catch (error) {
      setStatus({ success: false, message: `Failed to load scholarships: ${error}` });
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadScholarships();
    }
  }, [user]);

  const counts = useMemo(() => {
    return {
      total: scholarships.length,
      featured: scholarships.filter((item) => item.featured).length,
      needsCountryReview: scholarships.filter((item) => (item.eligibleCountries?.length ?? 0) === 0).length,
    };
  }, [scholarships]);

  const updateForm = <K extends keyof ScholarshipFormState>(key: K, value: ScholarshipFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const startAdd = () => {
    setForm(createEmptyForm());
    setIsEditing(true);
    setStatus(null);
  };

  const startEdit = (scholarship: Scholarship) => {
    setForm(scholarshipToForm(scholarship));
    setIsEditing(true);
    setStatus(null);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const scholarship = formToScholarship(form);
      await saveScholarship(scholarship);
      setStatus({ success: true, message: `Saved ${scholarship.title}.` });
      setForm(scholarshipToForm(scholarship));
      setIsEditing(false);
      await loadScholarships();
    } catch (error) {
      setStatus({ success: false, message: `Save failed: ${error}` });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (scholarship: Scholarship) => {
    if (!window.confirm(`Delete "${scholarship.title}"? This cannot be undone.`)) return;

    setStatus(null);

    try {
      await deleteScholarship(scholarship.id);
      setStatus({ success: true, message: `Deleted ${scholarship.title}.` });
      await loadScholarships();
    } catch (error) {
      setStatus({ success: false, message: `Delete failed: ${error}` });
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    setStatus(null);

    const result = await seedScholarships();
    setStatus(result);
    setSeeding(false);

    if (result.success) {
      await loadScholarships();
    }
  };

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.replace('/admin/login');
  };

  if (authLoading) {
    return (
      <div className="page-container py-20 text-center">
        <RefreshCw className="mx-auto mb-4 h-6 w-6 animate-spin text-slate-400" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Checking admin access...</p>
      </div>
    );
  }

  return (
    <div className="page-container py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Scholarship Admin</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Signed in as {user?.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={loadScholarships} className="btn-secondary">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button onClick={handleSeed} disabled={seeding} className="btn-secondary disabled:opacity-60">
              {seeding ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Seed
            </button>
            <button onClick={startAdd} className="btn-primary">
              <Plus className="h-4 w-4" /> Add Scholarship
            </button>
            <button onClick={handleLogout} className="btn-secondary">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        {status && (
          <div className={`mb-6 flex items-start gap-2 rounded-2xl p-4 text-sm ${
            status.success
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300'
              : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
          }`}>
            {status.success ? <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
            {status.message}
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="card p-4">
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{counts.total}</p>
            <p className="text-xs text-slate-500">Firestore scholarships</p>
          </div>
          <div className="card p-4">
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{counts.featured}</p>
            <p className="text-xs text-slate-500">Featured</p>
          </div>
          <div className="card p-4">
            <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">{counts.needsCountryReview}</p>
            <p className="text-xs text-slate-500">Missing eligible countries</p>
          </div>
        </div>

        {isEditing && (
          <form onSubmit={handleSave} className="card mb-8 p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-slate-100">{form.id ? 'Edit Scholarship' : 'Add Scholarship'}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Array fields accept comma-separated or line-by-line values.</p>
              </div>
              <button type="button" onClick={() => setIsEditing(false)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <TextInput label="title" value={form.title} onChange={(value) => updateForm('title', value)} required />
              <TextInput label="officialName" value={form.officialName ?? ''} onChange={(value) => updateForm('officialName', value)} />
              <TextInput label="university" value={form.university} onChange={(value) => updateForm('university', value)} required />
              <TextInput label="country" value={form.country} onChange={(value) => updateForm('country', value)} required />
              <TextInput label="countryCode" value={form.countryCode} onChange={(value) => updateForm('countryCode', value)} />
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">fundingType</span>
                <select
                  value={form.fundingType}
                  onChange={(event) => updateForm('fundingType', event.target.value as FundingType)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  {FUNDING_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <TextInput label="deadline" type="date" value={form.deadline} onChange={(value) => updateForm('deadline', value)} />
              <TextInput label="lastVerified" type="date" value={form.lastVerified} onChange={(value) => updateForm('lastVerified', value)} />
              <TextInput label="category" value={form.category} onChange={(value) => updateForm('category', value)} />
              <TextInput label="applyUrl" value={form.applyUrl} onChange={(value) => updateForm('applyUrl', value)} required />
              <TextInput label="officialSourceUrl" value={form.officialSourceUrl} onChange={(value) => updateForm('officialSourceUrl', value)} required />
              <TextInput label="eligibilitySourceUrl" value={form.eligibilitySourceUrl ?? ''} onChange={(value) => updateForm('eligibilitySourceUrl', value)} />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextArea label="description" value={form.description} onChange={(value) => updateForm('description', value)} rows={4} />
              <TextArea label="sourceNotes" value={form.sourceNotes ?? ''} onChange={(value) => updateForm('sourceNotes', value)} rows={4} />
              <TextArea label="eligibilityCountryNotes" value={form.eligibilityCountryNotes ?? ''} onChange={(value) => updateForm('eligibilityCountryNotes', value)} rows={3} />
              <TextArea label="degreeLevel" value={form.degreeLevel} onChange={(value) => updateForm('degreeLevel', value)} hint="Allowed: Bachelor, Master, PhD, Postdoc, Any" />
              <TextArea label="eligibility" value={form.eligibility} onChange={(value) => updateForm('eligibility', value)} />
              <TextArea label="benefits" value={form.benefits} onChange={(value) => updateForm('benefits', value)} />
              <TextArea label="coverageDetails" value={form.coverageDetails} onChange={(value) => updateForm('coverageDetails', value)} />
              <TextArea label="requiredDocuments" value={form.requiredDocuments} onChange={(value) => updateForm('requiredDocuments', value)} />
              <TextArea label="languageRequirements" value={form.languageRequirements} onChange={(value) => updateForm('languageRequirements', value)} />
              <TextArea label="eligibleCountries" value={form.eligibleCountries} onChange={(value) => updateForm('eligibleCountries', value)} />
              <TextArea label="ineligibleCountries" value={form.ineligibleCountries} onChange={(value) => updateForm('ineligibleCountries', value)} />
              <TextArea label="applicationProcess" value={form.applicationProcess} onChange={(value) => updateForm('applicationProcess', value)} />
              <TextArea label="selectionCriteria" value={form.selectionCriteria} onChange={(value) => updateForm('selectionCriteria', value)} />
              <TextArea label="applicationTips" value={form.applicationTips} onChange={(value) => updateForm('applicationTips', value)} />
              <TextArea label="tags" value={form.tags} onChange={(value) => updateForm('tags', value)} />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={form.isDeadlineEstimated ?? false}
                  onChange={(event) => updateForm('isDeadlineEstimated', event.target.checked)}
                  className="rounded border-slate-300"
                />
                isDeadlineEstimated
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={form.featured ?? false}
                  onChange={(event) => updateForm('featured', event.target.checked)}
                  className="rounded border-slate-300"
                />
                featured
              </label>
            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Scholarship
              </button>
            </div>
          </form>
        )}

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">Scholarships</h2>
            {loadingData && <RefreshCw className="h-4 w-4 animate-spin text-slate-400" />}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Country</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Funding</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Deadline</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {scholarships.map((scholarship) => (
                  <tr key={scholarship.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                    <td className="max-w-xs px-4 py-3">
                      <p className="truncate font-medium text-slate-900 dark:text-slate-100">{scholarship.title}</p>
                      <p className="truncate text-xs text-slate-500">{scholarship.id}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{scholarship.countryCode} {scholarship.country}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{scholarship.fundingType}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{scholarship.deadline}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => startEdit(scholarship)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100" aria-label={`Edit ${scholarship.title}`}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(scholarship)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" aria-label={`Delete ${scholarship.title}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
