import { ArrowRight, Star } from 'lucide-react';
import { FORMATIONS, type FormationItem } from '../data/catalog';
import { HorizontalCarousel } from './HorizontalCarousel';
import { RevealBlock } from './RevealBlock';

interface FeaturedTrainingsProps {
  onSelectFormation: (formation: FormationItem) => void;
  onViewAll: () => void;
}

export function FeaturedTrainings({ onSelectFormation, onViewAll }: FeaturedTrainingsProps) {
  const featured = FORMATIONS.filter((f) => f.featured);

  return (
    <section
      id="formations-une"
      className="py-16 lg:py-24 bg-white border-y border-slate-200/80 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HorizontalCarousel
          items={featured}
          getKey={(item) => item.id}
          layout="3-up"
          gapPx={24}
          regionLabel="Carrousel des formations à la une"
          prevLabel="Formation précédente"
          nextLabel="Formation suivante"
          itemLabel={(item, idx) => `Afficher la formation ${idx + 1} : ${item.title}`}
          testId="featured-carousel-track"
          headerLeft={
            <RevealBlock className="max-w-2xl">
              <p className="text-sm font-semibold text-[#F16D22] mb-2">Sélection du cabinet</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#12408F] text-balance">
                Nos formations à la une
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Parcourez nos programmes phares ou ouvrez une fiche pour consulter les objectifs et
                le programme détaillé.
              </p>
            </RevealBlock>
          }
          headerExtra={
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#12408F] hover:text-[#F16D22] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Voir tout le catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          }
          renderItem={(item, index) => (
            <RevealBlock delayMs={Math.min(index, 3) * 55} className="w-full h-full">
              <article className="h-full bg-[#F8FAFC] rounded-xl p-6 border border-slate-200 hover:border-[#12408F]/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata line */}
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs font-medium text-slate-500 mb-3">
                    <span className="text-[#12408F] font-semibold">{item.subCategory}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{item.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 tabular-nums text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-[#F16D22] text-[#F16D22]" aria-hidden="true" />
                      {item.rating.toFixed(1).replace('.', ',')}/5
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#12408F] leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 truncate">{item.format}</span>
                  <button
                    type="button"
                    onClick={() => onSelectFormation(item)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#12408F] hover:text-[#F16D22] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F16D22]"
                  >
                    <span>Voir la formation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            </RevealBlock>
          )}
        />
      </div>
    </section>
  );
}
