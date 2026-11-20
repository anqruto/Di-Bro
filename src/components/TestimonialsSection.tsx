import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/catalog';
import { HorizontalCarousel } from './HorizontalCarousel';
import { RevealBlock } from './RevealBlock';

export function TestimonialsSection() {
  return (
    <section id="references" className="py-16 lg:py-24 bg-[#F8FAFC] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#F16D22] mb-2">Retours d’expérience</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#12408F] text-balance">
              Ils font confiance à DIDAS &amp; BROTHERS
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Évaluations recueillies à chaud et à froid auprès des dirigeants, DRH, élus CSE et
              stagiaires accompagnés par nos consultants-formateurs.
            </p>
          </div>

          {/* Quantitative proof metrics directly adjacent */}
          <div className="grid grid-cols-3 gap-6 bg-white rounded-xl border border-slate-200 px-6 py-4 shrink-0">
            <div>
              <div className="text-2xl font-bold text-[#12408F] tabular-nums">4,9 / 5</div>
              <div className="text-xs text-slate-500 mt-0.5">Note moyenne</div>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <div className="text-2xl font-bold text-[#12408F] tabular-nums">580+</div>
              <div className="text-xs text-slate-500 mt-0.5">Avis contrôlés</div>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <div className="text-2xl font-bold text-[#F16D22] tabular-nums">98 %</div>
              <div className="text-xs text-slate-500 mt-0.5">Recommandation</div>
            </div>
          </div>
        </RevealBlock>

        <HorizontalCarousel
          items={TESTIMONIALS}
          getKey={(item) => item.id}
          layout="2-up-md"
          gapPx={24}
          regionLabel="Carrousel des témoignages clients"
          prevLabel="Témoignage précédent"
          nextLabel="Témoignage suivant"
          itemLabel={(item, idx) =>
            `Afficher le témoignage ${idx + 1} de ${item.author} (${item.company})`
          }
          testId="testimonials-carousel-track"
          controlsAlign="end"
          renderItem={(item, index) => (
            <RevealBlock delayMs={Math.min(index, 2) * 60} className="w-full h-full">
              <blockquote className="h-full bg-white rounded-xl p-6 sm:p-7 border border-slate-200 hover:border-[#12408F]/40 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-1" aria-label={`${item.rating} sur 5`}>
                      {Array.from({ length: item.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 fill-[#F16D22] text-[#F16D22]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">
                      {item.category} · {item.date}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    « {item.quote} »
                  </p>
                </div>

                <footer className="mt-6 pt-4 border-t border-slate-100">
                  <div className="text-sm font-bold text-[#12408F]">{item.author}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {item.role} — {item.company}
                  </div>
                </footer>
              </blockquote>
            </RevealBlock>
          )}
        />
      </div>
    </section>
  );
}
