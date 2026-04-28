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
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { MOCK_SCHOLARSHIPS, MOCK_CATEGORIES, MOCK_GUIDES } from './mock-data';
import { Scholarship, ScholarshipFilters, Category, Guide } from '@/types';

const COLLECTION = 'scholarships';

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
    for (const scholarship of MOCK_SCHOLARSHIPS) {
      await setDoc(doc(db, COLLECTION, scholarship.id), scholarship);
    }
    return { success: true, message: `Successfully seeded ${MOCK_SCHOLARSHIPS.length} scholarships to Firestore.` };
  } catch (e) {
    return { success: false, message: `Seeding failed: ${e}` };
  }
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
    if (filters.degreeLevel && !s.degreeLevel.includes(filters.degreeLevel)) return false;
    if (filters.fundingType && s.fundingType !== filters.fundingType) return false;
    if (filters.deadline) {
      if (new Date(s.deadline) > new Date(filters.deadline)) return false;
    }
    return true;
  });
}
