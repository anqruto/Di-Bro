import { Accessibility, ArrowRight, Award, Building2, ShieldCheck } from 'lucide-react';
import {
  ACCREDITATIONS,
  SITE_IMAGES,
  type ChallengeItem,
  type FormationItem,
  type ThemeId,
} from '../data/catalog';
import type { PageRoute } from '../utils/catalogLogic';
import { HeroSection } from '../components/HeroSection';
import { SectionSpyNav, type SpySectionItem } from '../components/SectionSpyNav';
import { ChallengesSection } from '../components/ChallengesSection';
import { FeaturedTrainings } from '../components/FeaturedTrainings';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { RevealBlock } from '../components/RevealBlock';

interface HomePageProps {
  onSearchSubmit: (params: {
    query: string;
    mode: 'formation' | 'conseil';
    themeId: ThemeId | 'all';
  }) => void;
  onSelectChallenge: (challenge: ChallengeItem) => void;
  onSelectFormation: (formation: FormationItem) => void;
  onNavigateRoute: (route: PageRoute) => void;
  onContactAccessibility: () => void;
}

const HOME_SPY_SECTIONS: SpySectionItem[] = [
  { id: 'defis', index: '01', label: 'Domaines' },
  { id: 'offre-conseil', index: '02', label: 'Conseil' },
  { id: 'formations-une', index: '03', label: 'Formations à la une' },
  { id: 'equipe', index: '04', label: 'Équipe' },
  { id: 'references', index: '05', label: 'Avis clients' },
  { id: 'agrements', index: '06', label: 'Agréments & Qualiopi' },
];

export function HomePage({
  onSearchSubmit,
  onSelectChallenge,
  onSelectFormation,
  onNavigateRoute,
  onContactAccessibility,
}: HomePageProps) {
  return (
    <div>
      {/* 1. Hero + Barre de recherche */}
      <HeroSection
        onSearchSubmit={onSearchSubmit}
        onExploreFormations={() => onNavigateRoute('/formations')}
        onExploreConsulting={() => onNavigateRoute('/conseil')}
      />

      {/* Navigation inter-blocs sticky avec suivi de section actif */}
      <SectionSpyNav sections={HOME_SPY_SECTIONS} />

      {/* 2. Nos domaines d'intervention */}
      <ChallengesSection onSelectChallenge={onSelectChallenge} />

      {/* 3. Conseil et accompagnement (avec photo terrain comme propuls.fr) */}
      <section id="offre-conseil" className="py-16 lg:py-24 bg-[#12408F] text-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <RevealBlock direction="left" className="lg:col-span-6">
              <div className="aspect-4/3 rounded-2xl overflow-hidden border border-white/15 bg-[#12408F]">
                <img
                  src={SITE_IMAGES.conseil}
                  alt="Consultant DIDAS & BROTHERS réalisant un audit sécurité et document unique sur site"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </RevealBlock>

            <RevealBlock direction="right" delayMs={100} className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-sm font-semibold text-[#F16D22] mb-2">Nos offres</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                  Conseil et accompagnement
                </h2>
              </div>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                Découvrez l’ensemble des offres de conseil et d’accompagnement personnalisées de
                DIDAS &amp; BROTHERS. Que ce soit pour évaluer vos risques professionnels (DUERP),
                prévenir les risques psychosociaux, déployer une norme ISO ou structurer votre
                stratégie RSE, nos experts vous accompagnent avec une approche pragmatique et sur
                mesure.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateRoute('/conseil')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#F16D22] hover:bg-[#D95B16] rounded-lg transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Nos offres conseil</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* 4. Nos formations à la une */}
      <FeaturedTrainings
        onSelectFormation={onSelectFormation}
        onViewAll={() => onNavigateRoute('/formations')}
      />

      {/* 5. Notre équipe de pilotage — avec portrait collectif */}
      <section id="equipe" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <RevealBlock direction="left" className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <p className="text-sm font-semibold text-[#F16D22]">Notre équipe de pilotage</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#12408F] text-balance">
                Un collectif engagé pour réussir vos projets
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Découvrez celles et ceux qui font au quotidien la réussite de nos interventions :
                consultants IPRP, psychologues du travail, formateurs certifiés INRS, référents
                pédagogiques et direction. Un collectif uni par l’exigence de terrain.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateRoute('/le-cabinet')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#12408F] hover:bg-[#12408F]/90 rounded-lg transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Découvrez l’équipe et nos références</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </RevealBlock>

            <RevealBlock direction="right" delayMs={100} className="lg:col-span-6 order-1 lg:order-2">
              <div className="aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <img
                  src={SITE_IMAGES.equipe}
                  alt="L'équipe de direction et consultants seniors DIDAS & BROTHERS"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-left scale-[1.22] origin-left"
                />
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* 6. Retours d'expérience & Avis vérifiés */}
      <TestimonialsSection />

      {/* 7. Référentiels, Agréments, Qualiopi & Accessibilité PMR */}
      <section id="agrements" className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <RevealBlock className="max-w-2xl">
            <p className="text-sm font-semibold text-[#F16D22] mb-2">Gage de conformité</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#12408F]">
              Référentiels et agréments officiels
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACCREDITATIONS.map((acc, index) => {
              const Icon = index === 0 ? ShieldCheck : index === 1 ? Building2 : Award;
              return (
                <RevealBlock key={acc.id} delayMs={index * 80} className="h-full">
                  <div className="h-full bg-[#F8FAFC] rounded-xl p-6 border border-slate-200 hover:border-[#12408F]/40 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold tracking-wide text-[#12408F]">
                          {acc.code}
                        </span>
                        <Icon className="w-5 h-5 text-[#F16D22]" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold text-[#12408F]">{acc.title}</h3>
                      <p className="text-xs font-medium text-slate-500 mt-0.5 mb-3">
                        {acc.authority}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">{acc.description}</p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-200 text-xs font-medium text-[#12408F]">
                      {acc.scope}
                    </div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevealBlock delayMs={60} className="h-full">
              <div className="h-full rounded-xl bg-[#12408F] text-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#F16D22] mb-2">
                    Certification qualité nationale
                  </p>
                  <h3 className="text-xl font-bold text-white">Certification Qualiopi</h3>
                  <p className="mt-2.5 text-sm text-slate-200 leading-relaxed">
                    La certification qualité a été délivrée au titre de la catégorie : Actions de
                    formation. Elle atteste de la conformité de nos processus pédagogiques et ouvre
                    l’accès aux financements OPCO.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-white/15 text-xs text-slate-300">
                  Référentiel National Qualité · Éligible financements OPCO
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delayMs={140} className="h-full">
              <div className="h-full rounded-xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#12408F] mb-2">
                    <Accessibility className="w-4 h-4 text-[#F16D22]" aria-hidden="true" />
                    <span>Accessibilité &amp; Inclusion</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#12408F]">
                    Accueil des personnes en situation de handicap (PMR)
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    Soucieux des situations rencontrées par les personnes à mobilité réduite, le
                    cabinet DIDAS &amp; BROTHERS étudie et accompagne la faisabilité de l’accès à ses
                    formations.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={onContactAccessibility}
                    className="text-sm font-semibold text-[#12408F] hover:text-[#F16D22] transition-colors cursor-pointer"
                  >
                    Contactez-nous →
                  </button>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>
    </div>
  );
}
