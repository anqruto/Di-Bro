import { useEffect, useState } from 'react';
import {
  type ChallengeId,
  type ChallengeItem,
  type ConsultingOffer,
  type FormationItem,
  type ThemeId,
} from './data/catalog';
import {
  resolveBrowserRoute,
  shouldUseHashRouting,
  type ContactFormValues,
  type PageRoute,
} from './utils/catalogLogic';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TrainingModal } from './components/TrainingModal';
import { LegalModal, type LegalDocType } from './components/LegalModal';
import { HomePage } from './pages/HomePage';
import { FormationsPage } from './pages/FormationsPage';
import { ConseilPage } from './pages/ConseilPage';
import { CabinetPage } from './pages/CabinetPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [route, setRoute] = useState<PageRoute>(() =>
    typeof window !== 'undefined'
      ? resolveBrowserRoute(window.location.pathname, window.location.hash)
      : '/'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<ThemeId | 'all'>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | 'all'>('all');
  const [selectedChallengeId, setSelectedChallengeId] = useState<ChallengeId | null>(null);

  const [activeFormation, setActiveFormation] = useState<FormationItem | null>(null);
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  const [quotePrefill, setQuotePrefill] = useState<{
    type?: ContactFormValues['requestType'];
    subject?: string;
  }>({});

  useEffect(() => {
    const syncRoute = () => {
      setRoute(resolveBrowserRoute(window.location.pathname, window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  const navigateRoute = (target: PageRoute, scrollToId?: string) => {
    const useHash = shouldUseHashRouting(window.location.pathname, window.location.hostname);
    if (useHash) {
      const nextHash = target === '/' ? '#/' : `#${target}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, '', nextHash);
      }
    } else if (window.location.pathname !== target || window.location.hash) {
      window.history.pushState(null, '', target);
    }
    setRoute(target);

    if (scrollToId) {
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          const el = document.getElementById(scrollToId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          }
        }, 60);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  const handleThemeChange = (themeId: ThemeId | 'all') => {
    setSelectedTheme(themeId);
    setSelectedSubCategory('all');
    setSelectedChallengeId(null);
  };

  const handleHeroSearch = (params: {
    query: string;
    mode: 'formation' | 'conseil';
    themeId: ThemeId | 'all';
  }) => {
    if (params.mode === 'conseil') {
      navigateRoute('/conseil');
      return;
    }

    setSearchQuery(params.query);
    setSelectedTheme(params.themeId);
    setSelectedSubCategory('all');
    setSelectedChallengeId(null);
    navigateRoute('/formations', 'formations');
  };

  const handleSelectChallenge = (challenge: ChallengeItem) => {
    if (challenge.targetMode === 'conseil') {
      navigateRoute('/conseil');
      return;
    }
    setSearchQuery('');
    setSelectedTheme(challenge.targetTheme);
    setSelectedSubCategory('all');
    setSelectedChallengeId(challenge.id);
    navigateRoute('/formations', 'formations');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTheme('all');
    setSelectedSubCategory('all');
    setSelectedChallengeId(null);
  };

  const handleRequestQuoteForFormation = (formation: FormationItem) => {
    setActiveFormation(null);
    setQuotePrefill({
      type: 'formation',
      subject: formation.title,
    });
    navigateRoute('/contact');
  };

  const handleRequestConsultingQuote = (offer: ConsultingOffer) => {
    setQuotePrefill({
      type: 'conseil',
      subject: offer.title,
    });
    navigateRoute('/contact');
  };

  const handleContactAccessibility = () => {
    setQuotePrefill({
      type: 'accessibilite',
      subject: 'Adaptation parcours & Accessibilité PMR',
    });
    navigateRoute('/contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Navbar
        currentRoute={route}
        onNavigateRoute={(target) => {
          if (target === '/formations') {
            handleResetFilters();
          } else if (target === '/contact') {
            setQuotePrefill({ type: 'formation', subject: '' });
          }
          navigateRoute(target);
        }}
        onSelectChallenge={handleSelectChallenge}
      />

      <main className="flex-1">
        <div key={route} className="page-transition">
          {route === '/' && (
            <HomePage
              onSearchSubmit={handleHeroSearch}
              onSelectChallenge={handleSelectChallenge}
              onSelectFormation={setActiveFormation}
              onNavigateRoute={(target) => {
                if (target === '/formations') {
                  handleResetFilters();
                }
                navigateRoute(target);
              }}
              onContactAccessibility={handleContactAccessibility}
            />
          )}

          {route === '/formations' && (
            <FormationsPage
              query={searchQuery}
              selectedTheme={selectedTheme}
              selectedSubCategory={selectedSubCategory}
              selectedChallengeId={selectedChallengeId}
              onQueryChange={(q) => {
                setSearchQuery(q);
                if (selectedChallengeId) setSelectedChallengeId(null);
              }}
              onThemeChange={handleThemeChange}
              onSubCategoryChange={setSelectedSubCategory}
              onClearChallenge={() => setSelectedChallengeId(null)}
              onResetAll={handleResetFilters}
              onSelectFormation={setActiveFormation}
              onRequestQuoteForFormation={handleRequestQuoteForFormation}
              onNavigateRoute={(target) => navigateRoute(target)}
            />
          )}

          {route === '/conseil' && (
            <ConseilPage
              onRequestConsultingQuote={handleRequestConsultingQuote}
              onNavigateRoute={(target) => navigateRoute(target)}
            />
          )}

          {route === '/le-cabinet' && (
            <CabinetPage
              onNavigateRoute={(target) => navigateRoute(target)}
              onContactAccessibility={handleContactAccessibility}
            />
          )}

          {route === '/contact' && (
            <ContactPage
              prefillType={quotePrefill.type}
              prefillSubject={quotePrefill.subject}
              onNavigateRoute={(target) => navigateRoute(target)}
            />
          )}
        </div>
      </main>

      <Footer
        onSelectTheme={(themeId) => {
          handleThemeChange(themeId);
          navigateRoute('/formations', 'formations');
        }}
        onNavigateRoute={(target) => {
          if (target === '/formations') {
            handleResetFilters();
          }
          navigateRoute(target);
        }}
        onOpenLegal={setLegalDoc}
      />

      <TrainingModal
        formation={activeFormation}
        onClose={() => setActiveFormation(null)}
        onRequestQuote={handleRequestQuoteForFormation}
      />

      <LegalModal docType={legalDoc} onClose={() => setLegalDoc(null)} />
    </div>
  );
}
