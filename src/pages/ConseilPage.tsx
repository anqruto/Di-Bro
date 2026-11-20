import { SITE_IMAGES, type ConsultingOffer } from '../data/catalog';
import { type PageRoute } from '../utils/catalogLogic';
import { PageBanner } from '../components/PageBanner';
import { ConsultingSection } from '../components/ConsultingSection';

interface ConseilPageProps {
  onRequestConsultingQuote: (offer: ConsultingOffer) => void;
  onNavigateRoute: (route: PageRoute) => void;
}

const METHODOLOGY_STEPS = [
  {
    index: '01',
    title: 'Immersion & Diagnostic terrain',
    description:
      'Entretiens avec la direction, les managers et les représentants du personnel, suivis d’une observation concrète de vos unités de travail.',
  },
  {
    index: '02',
    title: 'Co-construction opérationnelle',
    description:
      'Élaboration de plans d’action pragmatiques (DUERP, PAPRIPACT, QVCT, processus ISO) adaptés à la taille et aux ressources réelles de votre structure.',
  },
  {
    index: '03',
    title: 'Déploiement & Transfert de compétences',
    description:
      'Accompagnement dans la mise en œuvre, formation des relais internes et suivi des indicateurs de conformité et de performance durable.',
  },
];

import { RevealBlock } from '../components/RevealBlock';

export function ConseilPage({ onRequestConsultingQuote, onNavigateRoute }: ConseilPageProps) {
  return (
    <div>
      <PageBanner
        breadcrumbLabel="Conseil"
        kicker="Accompagnement IPRP · CARSAT · ISO · RSE"
        title="Conseil et accompagnement sur mesure"
        description="Nos consultants habilités interviennent directement au sein de votre organisation pour évaluer vos risques professionnels, prévenir les RPS, structurer vos démarches ISO et piloter votre stratégie RSE."
        image={SITE_IMAGES.conseil}
        imageAlt="Consultant DIDAS & BROTHERS réalisant un diagnostic sur site"
        onNavigateHome={onNavigateRoute}
      />

      {/* 3-step consulting methodology */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealBlock className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-[#F16D22] mb-1.5">Notre démarche</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#12408F]">
              Une méthode d’intervention ancrée sur le terrain
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {METHODOLOGY_STEPS.map((step, index) => (
              <RevealBlock key={step.index} delayMs={index * 75} className="h-full">
                <div className="h-full bg-[#F8FAFC] rounded-xl p-6 border border-slate-200 hover:border-[#12408F]/40 transition-all duration-200 hover:-translate-y-0.5 space-y-3">
                  <span className="text-xs font-mono font-semibold text-[#F16D22] tabular-nums">
                    {step.index}
                  </span>
                  <h3 className="text-lg font-bold text-[#12408F]">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <ConsultingSection onRequestConsultingQuote={onRequestConsultingQuote} />
    </div>
  );
}
