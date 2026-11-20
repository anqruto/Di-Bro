import {
  CHALLENGES,
  FORMATIONS,
  THEMES,
  type ChallengeId,
  type FormationItem,
  type ThemeId,
} from '../data/catalog';

export type PageRoute =
  | '/'
  | '/formations'
  | '/conseil'
  | '/le-cabinet'
  | '/contact';

export const VALID_ROUTES: readonly PageRoute[] = [
  '/',
  '/formations',
  '/conseil',
  '/le-cabinet',
  '/contact',
];

export function resolveRoute(pathnameOrHash: string): PageRoute {
  const raw = pathnameOrHash.startsWith('#') ? pathnameOrHash.slice(1) : pathnameOrHash;
  const cleaned = raw.replace(/\/+$/, '') || '/';
  if (VALID_ROUTES.includes(cleaned as PageRoute)) {
    return cleaned as PageRoute;
  }
  return '/';
}

export function resolveBrowserRoute(pathname: string, hash: string): PageRoute {
  if (hash.startsWith('#/')) {
    return resolveRoute(hash);
  }
  return resolveRoute(pathname);
}

export function shouldUseHashRouting(pathname: string, hostname: string): boolean {
  if (hostname.endsWith('.github.io')) {
    return true;
  }
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  return cleaned !== '/' && !VALID_ROUTES.includes(cleaned as PageRoute);
}

export interface FilterCriteria {
  query?: string;
  themeId?: ThemeId | 'all';
  subCategory?: string | 'all';
  challengeId?: ChallengeId | null;
}

export interface ContactFormValues {
  lastName: string;
  firstName: string;
  company: string;
  email: string;
  phone: string;
  requestType: 'formation' | 'conseil' | 'sur-mesure' | 'accessibilite';
  subject: string;
  message: string;
  consent: boolean;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function filterFormations(
  items: FormationItem[],
  criteria: FilterCriteria
): FormationItem[] {
  const normalizedQuery = normalizeText(criteria.query ?? '');
  const themeId = criteria.themeId ?? 'all';
  const subCategory = criteria.subCategory ?? 'all';
  const challengeId = criteria.challengeId ?? null;

  return items.filter((item) => {
    if (themeId !== 'all' && item.themeId !== themeId) {
      return false;
    }

    if (subCategory !== 'all' && item.subCategory !== subCategory) {
      return false;
    }

    if (challengeId && !item.challengeIds.includes(challengeId)) {
      return false;
    }

    if (normalizedQuery.length > 0) {
      const searchable = normalizeText(
        [
          item.title,
          getThemeLabel(item.themeId),
          item.subCategory,
          item.summary,
          item.audience,
          item.certification,
          ...item.objectives,
        ].join(' ')
      );
      if (!searchable.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}

export function getThemeLabel(themeId: ThemeId): string {
  return THEMES.find((t) => t.id === themeId)?.shortLabel ?? themeId;
}

export function getChallengeById(challengeId: ChallengeId) {
  return CHALLENGES.find((c) => c.id === challengeId) ?? null;
}

export function countFormationsByTheme(items: FormationItem[]): Record<ThemeId | 'all', number> {
  const counts: Record<ThemeId | 'all', number> = {
    all: items.length,
    'prevention-securite': 0,
    'management-organisation': 0,
    qvct: 0,
    'normes-iso': 0,
    rse: 0,
  };

  for (const item of items) {
    counts[item.themeId] += 1;
  }

  return counts;
}

export function getAvailableSubCategories(
  items: FormationItem[],
  themeId: ThemeId | 'all'
): string[] {
  if (themeId === 'all') {
    return Array.from(new Set(items.map((item) => item.subCategory)));
  }
  const theme = THEMES.find((t) => t.id === themeId);
  const existing = new Set(
    items.filter((i) => i.themeId === themeId).map((i) => i.subCategory)
  );
  if (!theme) {
    return Array.from(existing);
  }
  return theme.subCategories.filter((sub) => existing.has(sub));
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.lastName.trim().length < 2) {
    errors.lastName = 'Veuillez renseigner votre nom (2 caractères minimum).';
  }

  if (values.firstName.trim().length < 2) {
    errors.firstName = 'Veuillez renseigner votre prénom (2 caractères minimum).';
  }

  if (values.company.trim().length < 2) {
    errors.company = 'Veuillez indiquer le nom de votre entreprise ou organisme.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(values.email.trim())) {
    errors.email = 'Veuillez saisir une adresse e-mail professionnelle valide.';
  }

  const digits = values.phone.replace(/[\s.\-+()]/g, '');
  if (digits.length < 8 || !/^\d+$/.test(digits)) {
    errors.phone = 'Veuillez saisir un numéro de téléphone valide (ex. 01 42 68 55 00).';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Merci de préciser votre besoin en au moins 10 caractères.';
  }

  if (!values.consent) {
    errors.consent = 'Veuillez accepter d’être recontacté(e) par le cabinet DIDAS & BROTHERS.';
  }

  return errors;
}

export function getDefaultFormations(): FormationItem[] {
  return FORMATIONS;
}
