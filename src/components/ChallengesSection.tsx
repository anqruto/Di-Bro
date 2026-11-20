import {
  ArrowUpRight,
  Award,
  Brain,
  Briefcase,
  ClipboardCheck,
  Clock,
  HeartHandshake,
  Leaf,
  ShieldCheck,
} from 'lucide-react';
import { CHALLENGES, type ChallengeItem } from '../data/catalog';
import { HorizontalCarousel } from './HorizontalCarousel';
import { RevealBlock } from './RevealBlock';

interface ChallengesSectionProps {
  onSelectChallenge: (challenge: ChallengeItem) => void;
}

const ICON_MAP = {
  'conformite-sst': ShieldCheck,
  rps: Brain,
  management: Briefcase,
  qvct: HeartHandshake,
  duerp: ClipboardCheck,
  iso: Award,
  efficacite: Clock,
  rse: Leaf,
} as const;

export function ChallengesSection({ onSelectChallenge }: ChallengesSectionProps) {
  return (
    <section id="defis" className="py-16 lg:py-24 bg-[#F8FAFC] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HorizontalCarousel
          items={CHALLENGES}
          getKey={(challenge) => challenge.id}
          layout="4-up"
          gapPx={20}
          regionLabel="Carrousel des domaines d’intervention"
          prevLabel="Domaine précédent"
          nextLabel="Domaine suivant"
          itemLabel={(challenge) =>
            `Afficher le domaine ${challenge.index} : ${challenge.title}`
          }
          testId="challenges-carousel-track"
          headerLeft={
            <RevealBlock className="max-w-2xl">
              <p className="text-sm font-semibold text-[#F16D22] mb-2">Vos défis prioritaires</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#12408F] text-balance">
                Nos domaines d’intervention
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Faites défiler nos domaines ou sélectionnez un enjeu pour accéder directement aux
                formations et missions de conseil associées.
              </p>
            </RevealBlock>
          }
          renderItem={(challenge, index) => {
            const Icon = ICON_MAP[challenge.id];
            return (
              <RevealBlock delayMs={Math.min(index, 4) * 45} className="w-full h-full">
                <button
                  type="button"
                  onClick={() => onSelectChallenge(challenge)}
                  className="w-full h-full min-h-[256px] group text-left bg-white rounded-xl p-6 border border-slate-200 hover:border-[#12408F] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F16D22]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-lg bg-[#12408F]/8 text-[#12408F] group-hover:bg-[#F16D22] group-hover:text-white transition-colors duration-200 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-400 tabular-nums">
                        {challenge.index}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#12408F] group-hover:text-[#12408F] leading-snug">
                      {challenge.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {challenge.subtitle}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#12408F] group-hover:text-[#F16D22] transition-colors">
                    <span>
                      {challenge.targetMode === 'conseil'
                        ? 'Voir l’offre conseil'
                        : 'Explorer les formations'}
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              </RevealBlock>
            );
          }}
        />
      </div>
    </section>
  );
}
