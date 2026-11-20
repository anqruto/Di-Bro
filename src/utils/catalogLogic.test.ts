import test from 'node:test';
import assert from 'node:assert/strict';
import { FORMATIONS } from '../data/catalog';
import {
  countFormationsByTheme,
  filterFormations,
  getAvailableSubCategories,
  normalizeText,
  validateContactForm,
  type ContactFormValues,
} from './catalogLogic';

test('normalizeText removes French accents and case', () => {
  assert.equal(normalizeText('Sécurité & Prévention Électrique'), 'securite & prevention electrique');
});

test('filterFormations searches accent-insensitively across titles and summaries', () => {
  const results = filterFormations(FORMATIONS, { query: 'securite' });
  assert.ok(results.length >= 4);
  assert.ok(results.some((f) => f.id === 'sst-initial'));
});

test('filterFormations filters accurately by themeId and subCategory', () => {
  const cseResults = filterFormations(FORMATIONS, {
    themeId: 'prevention-securite',
    subCategory: 'CSE (comité social et économique)',
  });
  assert.equal(cseResults.length, 1);
  assert.equal(cseResults[0].id, 'cse-cssct-initial');
});

test('filterFormations filters by challengeId', () => {
  const rpsResults = filterFormations(FORMATIONS, { challengeId: 'rps' });
  assert.ok(rpsResults.some((f) => f.id === 'stsm-pssm'));
  assert.ok(rpsResults.some((f) => f.id === 'rps-managers'));
});

test('countFormationsByTheme totals match full catalog length', () => {
  const counts = countFormationsByTheme(FORMATIONS);
  const sum =
    counts['prevention-securite'] +
    counts['management-organisation'] +
    counts.qvct +
    counts['normes-iso'] +
    counts.rse;
  assert.equal(sum, counts.all);
  assert.equal(counts.all, FORMATIONS.length);
});

test('getAvailableSubCategories only returns populated subcategories for selected theme', () => {
  const subs = getAvailableSubCategories(FORMATIONS, 'normes-iso');
  assert.deepEqual(subs, ['ISO']);
});

test('validateContactForm rejects empty/invalid inputs and accepts valid French inquiry', () => {
  const empty: ContactFormValues = {
    lastName: '',
    firstName: 'A',
    company: '',
    email: 'invalid-email',
    phone: '123',
    requestType: 'formation',
    subject: '',
    message: 'court',
    consent: false,
  };
  const errors = validateContactForm(empty);
  assert.ok(errors.lastName);
  assert.ok(errors.firstName);
  assert.ok(errors.company);
  assert.ok(errors.email);
  assert.ok(errors.phone);
  assert.ok(errors.message);
  assert.ok(errors.consent);

  const valid: ContactFormValues = {
    lastName: 'Dupont',
    firstName: 'Camille',
    company: 'Atelier Loire Industries',
    email: 'camille.dupont@atelier-loire.fr',
    phone: '06 12 34 56 78',
    requestType: 'formation',
    subject: 'Formation Initiale CSE',
    message: 'Nous souhaitons organiser une session intra-entreprise pour 8 élus CSE en janvier.',
    consent: true,
  };
  const validErrors = validateContactForm(valid);
  assert.deepEqual(validErrors, {});
});

import {
  resolveBrowserRoute,
  resolveRoute,
  shouldUseHashRouting,
} from './catalogLogic';

test('resolveRoute maps known page paths and falls back to home', () => {
  assert.equal(resolveRoute('/'), '/');
  assert.equal(resolveRoute('/formations/'), '/formations');
  assert.equal(resolveRoute('#/formations'), '/formations');
  assert.equal(resolveRoute('/conseil'), '/conseil');
  assert.equal(resolveRoute('/actualites'), '/');
  assert.equal(resolveRoute('/le-cabinet'), '/le-cabinet');
  assert.equal(resolveRoute('/contact'), '/contact');
  assert.equal(resolveRoute('/unknown-page'), '/');
});

test('resolveBrowserRoute and shouldUseHashRouting handle GitHub Pages subpaths safely', () => {
  assert.equal(resolveBrowserRoute('/mon-repo/', ''), '/');
  assert.equal(resolveBrowserRoute('/mon-repo/', '#/formations'), '/formations');
  assert.equal(resolveBrowserRoute('/formations', ''), '/formations');

  assert.equal(shouldUseHashRouting('/mon-repo/', 'user.github.io'), true);
  assert.equal(shouldUseHashRouting('/', 'user.github.io'), true);
  assert.equal(shouldUseHashRouting('/mon-repo/', 'localhost'), true);
  assert.equal(shouldUseHashRouting('/formations', 'localhost'), false);
  assert.equal(shouldUseHashRouting('/', 'localhost'), false);
});
