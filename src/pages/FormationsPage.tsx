import { ArrowRight } from 'lucide-react';
import {
  FORMATIONS,
  SITE_IMAGES,
  THEMES,
  type ChallengeId,
  type FormationItem,
  type ThemeId,
} from '../data/catalog';
import { type PageRoute } from '../utils/catalogLogic';
import { PageBanner } from '../components/PageBanner';
import { CatalogSection } from '../components/CatalogSection';
import { HorizontalCarousel } from '../components/HorizontalCarousel';
import { RevealBlock } from '../components/RevealBlock';

interface FormationsPageProps {
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
  onNavigateRoute: (route: PageRoute) => void;
}

export function FormationsPage({
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
  onNavigateRoute,
}: FormationsPageProps) {
  const handleSelectDirectorySub = (themeId: ThemeId, subCategory: string) => {
    onThemeChange(themeId);
    onSubCategoryChange(subCategory);
    const catalogEl = document.getElementById('formations');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <PageBanner
        breadcrumbLabel="Formations"
        kicker="Catalogue professionnel certifié Qualiopi"
        title="Nos formations"
        description="DIDAS & BROTHERS propose des formations sur mesure, adaptées à vos besoins en prévention, sécurité au travail, management, QVCT, normes ISO et RSE. Une approche pratique et opérationnelle animée en intra ou inter-entreprises."
        image={SITE_IMAGES.formations}
        imageAlt="Atelier de formation professionnelle animé par un formateur DIDAS & BROTHERS"
        onNavigateHome={onNavigateRoute}
      />

      {/* Directory of all thematic poles & sub-categories mirroring propuls.fr/nos-formations/ */}
      <section className="py-14 bg-white border-b border-slate-200 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HorizontalCarousel
            items={THEMES}
            getKey={(theme) => theme.id}
            layout="3-up"
            gapPx={24}
            regionLabel="Carrousel des thématiques de formation"
            prevLabel="Thématique précédente"
            nextLabel="Thématique suivante"
            itemLabel={(theme, idx) =>
              `Afficher la thématique ${idx + 1} : ${theme.label}`
            }
            testId="themes-carousel-track"
            headerLeft={
              <RevealBlock className="max-w-2xl">
                <p className="text-sm font-semibold text-[#F16D22] mb-1.5">Accès rapide par pôle</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#12408F]">
                  Toutes nos thématiques
                </h2>
              </RevealBlock>
            }
            renderItem={(theme, index) => {
              const populatedSubs = theme.subCategories.filter((sub) =>
                FORMATIONS.some((f) => f.themeId === theme.id && f.subCategory === sub)
              );
              return (
                <RevealBlock delayMs={Math.min(index, 3) * 55} className="w-full h-full">
                  <div className="h-full bg-[#F8FAFC] rounded-xl p-6 border border-slate-200 hover:border-[#12408F]/40 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg font-bold text-[#12408F]">{theme.label}</h3>
                        <button
                          type="button"
                          onClick={() => {
                            onThemeChange(theme.id);
                            document
                              .getElementById('formations')
                              ?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-xs font-semibold text-[#F16D22] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Voir tout →
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {theme.description}
                      </p>

                      <ul className="space-y-1.5 max-h-[196px] overflow-y-auto pr-1">
                        {populatedSubs.map((sub) => {
                          const count = FORMATIONS.filter(
                            (f) => f.themeId === theme.id && f.subCategory === sub
                          ).length;
                          return (
                            <li key={sub}>
                              <button
                                type="button"
                                onClick={() => handleSelectDirectorySub(theme.id, sub)}
                                className="w-full flex items-center justify-between gap-2 py-1.5 px-2.5 rounded-lg text-left text-sm text-slate-700 hover:bg-white hover:text-[#12408F] transition-colors cursor-pointer"
                              >
                                <span className="truncate">{sub}</span>
                                <span className="text-xs font-medium text-slate-400 tabular-nums shrink-0">
                                  {count} {count > 1 ? 'formations' : 'formation'}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => {
                          onThemeChange(theme.id);
                          document
                            .getElementById('formations')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12408F] hover:text-[#F16D22] transition-colors cursor-pointer"
                      >
                        <span>Explorer la thématique</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </RevealBlock>
              );
            }}
          />
        </div>
      </section>

      {/* Interactive Catalog Section */}
      <CatalogSection
        query={query}
        selectedTheme={selectedTheme}
        selectedSubCategory={selectedSubCategory}
        selectedChallengeId={selectedChallengeId}
        onQueryChange={onQueryChange}
        onThemeChange={onThemeChange}
        onSubCategoryChange={onSubCategoryChange}
        onClearChallenge={onClearChallenge}
        onResetAll={onResetAll}
        onSelectFormation={onSelectFormation}
        onRequestQuoteForFormation={onRequestQuoteForFormation}
      />
    </div>
  );
}
