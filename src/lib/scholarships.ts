import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './firebase';
import { MOCK_SCHOLARSHIPS, MOCK_CATEGORIES, MOCK_GUIDES } from './mock-data';
import { isAllowedAdminEmail } from './admin-auth';
import { Scholarship, ScholarshipFilters, Category, Guide } from '@/types';

const COLLECTION = 'scholarships';

type FirestoreSafeValue =
  | string
  | number
  | boolean
  | null
  | FirestoreSafeValue[]
  | { [key: string]: FirestoreSafeValue };

export function removeUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .filter((item) => item !== undefined)
      .map((item) => removeUndefined(item)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).reduce<Record<string, FirestoreSafeValue>>((acc, [key, item]) => {
      if (item !== undefined) {
        acc[key] = removeUndefined(item) as FirestoreSafeValue;
      }
      return acc;
    }, {}) as T;
  }

  return value;
}

function assertAdminWriteAccess(): void {
  if (!isAllowedAdminEmail(auth?.currentUser?.email)) {
    throw new Error('You are not authorized to write scholarship data.');
  }
}

// ─── Scholarships ────────────────────────────────────────────────────────────

export async function getScholarships(filters?: ScholarshipFilters): Promise<Scholarship[]> {
  if (!isFirebaseConfigured() || !db) {
    return applyFilters(MOCK_SCHOLARSHIPS, filters);
  }

  try {
    const ref = collection(db, COLLECTION);
    const snapshot = await getDocs(query(ref, orderBy('createdAt', 'desc')));
    const scholarships = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Scholarship));
    return applyFilters(scholarships, filters);
  } catch {
    return applyFilters(MOCK_SCHOLARSHIPS, filters);
  }
}

export async function getFeaturedScholarships(): Promise<Scholarship[]> {
  if (!isFirebaseConfigured() || !db) {
    return MOCK_SCHOLARSHIPS.filter(s => s.featured);
  }

  try {
    const ref = collection(db, COLLECTION);
    const q = query(ref, where('featured', '==', true), limit(6));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Scholarship));
  } catch {
    return MOCK_SCHOLARSHIPS.filter(s => s.featured);
  }
}

export async function getScholarshipById(id: string): Promise<Scholarship | null> {
  if (!isFirebaseConfigured() || !db) {
    return MOCK_SCHOLARSHIPS.find(s => s.id === id) ?? null;
  }

  try {
    const ref = doc(db, COLLECTION, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return MOCK_SCHOLARSHIPS.find(s => s.id === id) ?? null;
    return { id: snap.id, ...snap.data() } as Scholarship;
  } catch {
    return MOCK_SCHOLARSHIPS.find(s => s.id === id) ?? null;
  }
}

export async function getLatestScholarships(count = 6): Promise<Scholarship[]> {
  const all = await getScholarships();
  return all.slice(0, count);
}

export async function getRelatedScholarships(current: Scholarship, count = 3): Promise<Scholarship[]> {
  const all = await getScholarships();
  return all
    .filter(s => s.id !== current.id && (s.country === current.country || s.category === current.category))
    .slice(0, count);
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  return MOCK_CATEGORIES;
}

// ─── Guides ──────────────────────────────────────────────────────────────────

export async function getGuides(): Promise<Guide[]> {
  return MOCK_GUIDES;
}

// ─── Admin / Seeding ─────────────────────────────────────────────────────────

export async function seedScholarships(): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured() || !db) {
    return { success: false, message: 'Firebase is not configured. Add .env.local with your Firebase credentials.' };
  }

  try {
    assertAdminWriteAccess();
  } catch (e) {
    return { success: false, message: String(e instanceof Error ? e.message : e) };
  }

  try {
    for (const scholarship of MOCK_SCHOLARSHIPS) {
      await setDoc(doc(db, COLLECTION, scholarship.id), removeUndefined(scholarship));
    }
    return { success: true, message: `Successfully seeded ${MOCK_SCHOLARSHIPS.length} scholarships to Firestore.` };
  } catch (e) {
    return { success: false, message: `Seeding failed: ${e}` };
  }
}

export async function getAdminScholarships(): Promise<Scholarship[]> {
  if (!isFirebaseConfigured() || !db) {
    return MOCK_SCHOLARSHIPS;
  }

  const ref = collection(db, COLLECTION);
  const snapshot = await getDocs(query(ref, orderBy('createdAt', 'desc')));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Scholarship));
}

export async function saveScholarship(scholarship: Scholarship): Promise<void> {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase is not configured.');
  }

  assertAdminWriteAccess();
  await setDoc(doc(db, COLLECTION, scholarship.id), removeUndefined(scholarship));
}

export async function deleteScholarship(id: string): Promise<void> {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase is not configured.');
  }

  assertAdminWriteAccess();
  await deleteDoc(doc(db, COLLECTION, id));
}

// ─── Filter helper ────────────────────────────────────────────────────────────

function applyFilters(scholarships: Scholarship[], filters?: ScholarshipFilters): Scholarship[] {
  if (!filters) return scholarships;

  return scholarships.filter(s => {
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const haystack = `${s.title} ${s.university} ${s.country} ${s.tags.join(' ')}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.country && s.country !== filters.country) return false;
    if (filters.category && s.category !== filters.category) return false;
    if (filters.applicantCountry && !isEligibleForApplicantCountry(s, filters.applicantCountry)) return false;
    if (filters.degreeLevel && !s.degreeLevel.includes(filters.degreeLevel)) return false;
    if (filters.fundingType && s.fundingType !== filters.fundingType) return false;
    if (filters.deadline) {
      if (new Date(s.deadline) > new Date(filters.deadline)) return false;
    }
    return true;
  });
}

function normalizeCountry(value: string): string {
  const normalized = value.trim().toLowerCase();
  const aliases: Record<string, string> = {
    'turkiye': 'turkey',
    'türkiye': 'turkey',
    'viet nam': 'vietnam',
    'lao pdr': 'laos',
    'cote d\'ivoire': 'ivory coast',
    'côte d\'ivoire': 'ivory coast',
    'united states of america': 'united states',
    'usa': 'united states',
    'uk': 'united kingdom',
  };
  return aliases[normalized] ?? normalized;
}

function hasAutomaticEligibilityFallback(notes?: string): boolean {
  if (!notes) return false;
  const normalized = notes.toLowerCase();
  return normalized.includes('eligibility varies')
    || normalized.includes('country-specific')
    || normalized.includes('country must be checked')
    || normalized.includes('must be checked')
    || normalized.includes('cannot be automatically checked');
}

function isEligibleForApplicantCountry(s: Scholarship, applicantCountry: string): boolean {
  const selectedCountry = normalizeCountry(applicantCountry);
  if (!selectedCountry) return true;

  const eligibleCountries = s.eligibleCountries?.map(normalizeCountry).filter(Boolean) ?? [];
  const ineligibleCountries = s.ineligibleCountries?.map(normalizeCountry).filter(Boolean) ?? [];

  if (eligibleCountries.length === 0) {
    return hasAutomaticEligibilityFallback(s.eligibilityCountryNotes);
  }

  if (eligibleCountries.includes(selectedCountry)) return true;
  if (eligibleCountries.includes('all countries')) return true;
  if (eligibleCountries.includes('international students')) return true;

  if (eligibleCountries.includes('all countries except listed exclusions')) {
    return !ineligibleCountries.includes(selectedCountry);
  }

  return false;
}
