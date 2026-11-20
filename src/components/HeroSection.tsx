import { useState, type FormEvent } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { SITE_IMAGES, THEMES, type ThemeId } from '../data/catalog';

interface HeroSectionProps {
  onSearchSubmit: (params: {
    query: string;
    mode: 'formation' | 'conseil';
    themeId: ThemeId | 'all';
  }) => void;
  onExploreFormations: () => void;
  onExploreConsulting: () => void;
}

export function HeroSection({
  onSearchSubmit,
  onExploreFormations,
  onExploreConsulting,
}: HeroSectionProps) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'formation' | 'conseil'>('formation');
  const [themeId, setThemeId] = useState<ThemeId | 'all'>('all');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit({ query, mode, themeId });
  };

  return (
    <section id="accueil" className="relative bg-[#12408F] text-white overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(241, 109, 34, 0.35), transparent 45%), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left editorial column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 hero-enter-1">
            <p className="text-sm font-medium text-slate-300 tracking-wide">
              Cabinet français de conseil &amp; formation · Certifié Qualiopi
            </p>

            <h1
              className="font-bold tracking-tight text-white leading-[1.12] text-balance"
              style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)' }}
            >
              Anticipons les défis d’aujourd’hui pour bâtir les succès de demain.
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
              DIDAS &amp; BROTHERS accompagne les dirigeants, équipes RH et représentants du
              personnel en prévention des risques, santé au travail, management opérationnel,
              QVCT, normes ISO et RSE sur l’ensemble du territoire.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={onExploreFormations}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#F16D22] hover:bg-[#D95B16] rounded-lg transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Découvrir nos formations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreConsulting}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white border border-white/25 hover:bg-white/10 rounded-lg transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Découvrir l’offre conseil
              </button>
            </div>
          </div>

          {/* Right photographic hero carrier */}
          <div className="lg:col-span-5 flex flex-col hero-enter-2">
            <div className="flex-1 rounded-2xl overflow-hidden bg-[#12408F] border border-white/20 flex flex-col justify-between shadow-lg">
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#12408F]">
                <img
                  src={SITE_IMAGES.hero}
                  alt="Session de conseil stratégique et de formation professionnelle animée par DIDAS & BROTHERS à Paris"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#12408F]/85 via-[#12408F]/20 to-transparent"
                />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-medium text-white">
                  <span>Conseil &amp; Formation en entreprise</span>
                  <span className="text-[#F16D22] font-semibold">INRS · DREETS · CARSAT</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 grid grid-cols-3 gap-4 text-left bg-[#12408F] border-t border-white/15">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">4,9 / 5</div>
                  <div className="text-xs text-slate-300 mt-0.5">Avis vérifiés</div>
                </div>
                <div className="border-l border-white/15 pl-4">
                  <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">18</div>
                  <div className="text-xs text-slate-300 mt-0.5">Programmes phares</div>
                </div>
                <div className="border-l border-white/15 pl-4">
                  <div className="text-xl sm:text-2xl font-bold text-[#F16D22] tabular-nums">100 %</div>
                  <div className="text-xs text-slate-300 mt-0.5">Sur-mesure intra</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Search & Filter Bar */}
        <form
          onSubmit={handleSubmit}
          aria-label="Rechercher une formation ou un accompagnement conseil"
          className="mt-10 lg:mt-12 bg-white rounded-xl p-2.5 shadow-xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-2 items-stretch hero-enter-3"
        >
          <div className="md:col-span-5 flex items-center gap-3 px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200/70 focus-within:border-[#12408F] focus-within:bg-white transition-colors">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <label htmlFor="hero-search-query" className="sr-only">
              Mot-clé de formation ou de conseil
            </label>
            <input
              id="hero-search-query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une formation (SST, CSE, RPS, ISO...)"
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="hero-search-mode" className="sr-only">
              Type d’offre
            </label>
            <select
              id="hero-search-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as 'formation' | 'conseil')}
              className="w-full h-full px-3.5 py-2.5 text-sm font-medium text-slate-800 bg-slate-50 border border-slate-200/70 rounded-lg focus:outline-none focus:border-[#12408F] cursor-pointer"
            >
              <option value="formation">Formation</option>
              <option value="conseil">Conseil</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label htmlFor="hero-search-theme" className="sr-only">
              Thématique
            </label>
            <select
              id="hero-search-theme"
              value={themeId}
              onChange={(e) => setThemeId(e.target.value as ThemeId | 'all')}
              disabled={mode === 'conseil'}
              className="w-full h-full px-3.5 py-2.5 text-sm font-medium text-slate-800 bg-slate-50 border border-slate-200/70 rounded-lg focus:outline-none focus:border-[#12408F] disabled:opacity-50 cursor-pointer"
            >
              <option value="all">Toutes les thématiques</option>
              {THEMES.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.shortLabel}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full h-full px-5 py-3 text-sm font-semibold text-white bg-[#12408F] hover:bg-[#12408F]/90 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F16D22]"
            >
              Rechercher
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
