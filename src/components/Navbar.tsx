import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { CHALLENGES, type ChallengeItem } from '../data/catalog';
import type { PageRoute } from '../utils/catalogLogic';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigateRoute: (route: PageRoute) => void;
  onSelectChallenge: (challenge: ChallengeItem) => void;
}

const PAGE_LINKS: { route: PageRoute; label: string }[] = [
  { route: '/formations', label: 'Formations' },
  { route: '/conseil', label: 'Conseil' },
  { route: '/le-cabinet', label: 'Le cabinet' },
];

export function Navbar({
  currentRoute,
  onNavigateRoute,
  onSelectChallenge,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [challengesOpen, setChallengesOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setScrollProgress(0);
        return;
      }
      const ratio = Math.min(1, Math.max(0, window.scrollY / scrollable));
      setScrollProgress(ratio);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [currentRoute]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setChallengesOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setChallengesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const navigate = (route: PageRoute) => {
    setMobileOpen(false);
    setChallengesOpen(false);
    onNavigateRoute(route);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div
        aria-hidden="true"
        style={{ transform: `scaleX(${scrollProgress})` }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F16D22] origin-left transition-transform duration-150 ease-out pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand mark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          aria-label="DIDAS & BROTHERS — Accueil"
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12408F] rounded"
        >
          <div className="w-[124px] h-[52px] overflow-hidden flex items-center justify-center">
            <img
              src="./assets/aistudio/logo_e5b80c07.png"
              alt="DIDAS & BROTHERS — Conseils & Formation"
              referrerPolicy="no-referrer"
              className="w-[158px] h-[158px] max-w-none object-contain"
            />
          </div>
        </a>

        {/* Zone 2: 5 concise single-line navigation links matching propuls.fr */}
        <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-7">
          {/* Vos défis dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={challengesOpen}
              aria-haspopup="true"
              onClick={() => setChallengesOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#12408F] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#F16D22] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12408F]"
            >
              <span>Vos défis</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  challengesOpen ? 'rotate-180 text-[#F16D22]' : ''
                }`}
              />
            </button>

            {challengesOpen && (
              <div className="absolute left-0 top-full mt-3 w-[540px] bg-white rounded-xl border border-slate-200 shadow-xl p-4 grid grid-cols-2 gap-2 z-50">
                {CHALLENGES.map((challenge) => (
                  <button
                    key={challenge.id}
                    type="button"
                    onClick={() => {
                      setChallengesOpen(false);
                      onSelectChallenge(challenge);
                    }}
                    className="text-left p-3 rounded-lg hover:bg-[#F8FAFC] border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                  >
                    <div className="text-xs font-mono text-[#F16D22] mb-0.5">
                      {challenge.index}
                    </div>
                    <div className="text-sm font-semibold text-[#12408F] leading-snug">
                      {challenge.title}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {PAGE_LINKS.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <a
                key={link.route}
                href={link.route}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.route);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12408F] ${
                  isActive
                    ? 'text-[#12408F] font-semibold border-[#F16D22]'
                    : 'text-slate-600 hover:text-[#12408F] border-transparent hover:border-[#F16D22]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#F16D22] hover:bg-[#D95B16] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12408F]"
          >
            Contactez-nous
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg max-h-[82vh] overflow-y-auto">
          <nav aria-label="Navigation mobile" className="flex flex-col space-y-1">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className={`px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                currentRoute === '/'
                  ? 'bg-[#F8FAFC] text-[#12408F] font-semibold'
                  : 'text-slate-700 hover:text-[#12408F] hover:bg-slate-50'
              }`}
            >
              Accueil
            </a>
            {PAGE_LINKS.map((link) => (
              <a
                key={link.route}
                href={link.route}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.route);
                }}
                className={`px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                  currentRoute === link.route
                    ? 'bg-[#F8FAFC] text-[#12408F] font-semibold'
                    : 'text-slate-700 hover:text-[#12408F] hover:bg-slate-50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#F16D22] hover:bg-[#D95B16] rounded-lg transition-colors cursor-pointer"
            >
              Contactez-nous
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
