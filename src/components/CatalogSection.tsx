import { ArrowRight, RotateCcw, Search, Star, X } from 'lucide-react';
import {
  FORMATIONS,
  THEMES,
  type ChallengeId,
  type FormationItem,
  type ThemeId,
} from '../data/catalog';
import {
  countFormationsByTheme,
  filterFormations,
  getAvailableSubCategories,
  getChallengeById,
  getThemeLabel,
} from '../utils/catalogLogic';

import { RevealBlock } from './RevealBlock';

interface CatalogSectionProps {
  query: string;
  selectedTheme: ThemeId | 'all';
  selectedSubCategory: string | 'all';
  selectedChallengeId: ChallengeId | null;
  onQueryChange: (q: string) => void;
  onThemeChange: (theme: ThemeId | 'all') => void;
  onSubCategoryChange: (sub: string | 'all') => void;
  onClearChallenge: () => void;
  onResetAll: () => void;
  onSelectFormation: (formation: FormationItem) => void;
  onRequestQuoteForFormation: (formation: FormationItem) => void;
}

export function CatalogSection({
  query,
  selectedTheme,
  selectedSubCategory,
  selectedChallengeId,
  onQueryChange,
  onThemeChange,
  onSubCategoryChange,
  onClearChallenge,
  onResetAll,
  onSelectFormation,
  onRequestQuoteForFormation,
}: CatalogSectionProps) {
  const counts = countFormationsByTheme(FORMATIONS);
  const availableSubCategories = getAvailableSubCategories(FORMATIONS, selectedTheme);
  const filteredFormations = filterFormations(FORMATIONS, {
    query,
    themeId: selectedTheme,
    subCategory: selectedSubCategory,
    challengeId: selectedChallengeId,
  });

  const activeTheme = THEMES.find((t) => t.id === selectedTheme);
  const activeChallenge = selectedChallengeId ? getChallengeById(selectedChallengeId) : null;
  const hasActiveFilters =
    query.trim().length > 0 ||
    selectedTheme !== 'all' ||
    selectedSubCategory !== 'all' ||
    selectedChallengeId !== null;

  return (
    <section id="formations" className="py-16 lg:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search */}
        <RevealBlock className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#F16D22] mb-2">Catalogue de formations</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#12408F] text-balance">
              Toutes nos thématiques de formation
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {activeTheme
                ? activeTheme.description
                : 'Des programmes opérationnels animés en intra-entreprise ou en inter-entreprises, adaptables à votre secteur d’activité.'}
            </p>
          </div>

          {/* Search input */}
          <div className="w-full lg:w-80 shrink-0">
            <label htmlFor="catalog-search" className="sr-only">
              Filtrer le catalogue de formations
            </label>
            <div className="relative flex items-center bg-white border border-slate-200 rounded-lg focus-within:border-[#12408F] transition-colors">
              <Search className="w-4 h-4 text-slate-400 ml-3.5 shrink-0" />
              <input
                id="catalog-search"
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Filtrer par mot-clé..."
                className="w-full py-2.5 px-3 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  aria-label="Effacer la recherche"
                  onClick={() => onQueryChange('')}
                  className="p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </RevealBlock>

        {/* Interactive Theme Segmented Tabs */}
        <div
          role="tablist"
          aria-label="Filtrer par thématique de formation"
          className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-xl mb-6"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedTheme === 'all'}
            onClick={() => onThemeChange('all')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
              selectedTheme === 'all'
                ? 'bg-white text-[#12408F] shadow-sm font-semibold'
                : 'text-slate-600 hover:text-[#12408F]'
            }`}
          >
            Toutes <span className="tabular-nums text-xs opacity-75">({counts.all})</span>
          </button>

          {THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              role="tab"
              aria-selected={selectedTheme === theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                selectedTheme === theme.id
                  ? 'bg-white text-[#12408F] shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-[#12408F]'
              }`}
            >
              {theme.shortLabel}{' '}
              <span className="tabular-nums text-xs opacity-75">({counts[theme.id]})</span>
            </button>
          ))}
        </div>

        {/* Sub-category interactive filter bar when a specific theme is selected */}
        {selectedTheme !== 'all' && availableSubCategories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-medium text-slate-500 mr-1">Spécialités :</span>
            <button
              type="button"
              onClick={() => onSubCategoryChange('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedSubCategory === 'all'
                  ? 'bg-[#12408F] text-white border-[#12408F]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-[#12408F]/50'
              }`}
            >
              Toutes les spécialités
            </button>
            {availableSubCategories.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => onSubCategoryChange(sub)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedSubCategory === sub
                    ? 'bg-[#12408F] text-white border-[#12408F]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#12408F]/50'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Active challenge or result summary bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="font-semibold text-[#12408F] tabular-nums">
              {filteredFormations.length}{' '}
              {filteredFormations.length > 1 ? 'formations disponibles' : 'formation disponible'}
            </span>
            {activeChallenge && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-slate-700">
                  Défi sélectionné : <strong>{activeChallenge.title}</strong>
                </span>
                <button
                  type="button"
                  onClick={onClearChallenge}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#F16D22] hover:underline cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Retirer ce défi
                </button>
              </>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetAll}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#12408F] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Formations Grid or Empty State */}
        {filteredFormations.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-[#12408F]">
              Aucune formation ne correspond à votre recherche
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Modifiez vos critères ou réinitialisez les filtres pour explorer l’ensemble de notre
              catalogue de formations professionnelles.
            </p>
            <button
              type="button"
              onClick={onResetAll}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#12408F] hover:bg-[#12408F]/90 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Afficher toutes les formations
            </button>
          </div>
        ) : (
          <div
            key={`${selectedTheme}-${selectedSubCategory}-${selectedChallengeId ?? 'none'}`}
            data-testid="catalog-grid"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 panel-enter"
          >
            {filteredFormations.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:border-[#12408F]/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs font-medium text-slate-500 mb-2.5">
                    <span className="font-semibold text-[#F16D22]">
                      {getThemeLabel(item.themeId)}
                    </span>
                    <span aria-hidden="true">/</span>
                    <span>{item.subCategory}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{item.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 tabular-nums text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-[#F16D22] text-[#F16D22]" aria-hidden="true" />
                      {item.rating.toFixed(1).replace('.', ',')}/5
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#12408F] leading-snug">{item.title}</h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">{item.certification}</span>

                  <div className="flex items-center gap-4 shrink-0">
                    <button
                      type="button"
                      onClick={() => onRequestQuoteForFormation(item)}
                      className="text-xs font-semibold text-slate-600 hover:text-[#F16D22] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Demander un devis
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectFormation(item)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#12408F] hover:text-[#F16D22] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span>Voir le programme</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
