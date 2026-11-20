import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CONSULTING_OFFERS, type ConsultingOffer } from '../data/catalog';

import { RevealBlock } from './RevealBlock';

interface ConsultingSectionProps {
  onRequestConsultingQuote: (offer: ConsultingOffer) => void;
}

export function ConsultingSection({ onRequestConsultingQuote }: ConsultingSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(CONSULTING_OFFERS[0].id);
  const activeOffer =
    CONSULTING_OFFERS.find((o) => o.id === selectedId) ?? CONSULTING_OFFERS[0];

  return (
    <section id="conseil" className="py-16 lg:py-24 bg-[#12408F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-[#F16D22] mb-2">Nos offres d’accompagnement</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
            Conseil et accompagnement sur mesure
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Au-delà de la formation, nos consultants IPRP et experts QHSE interviennent directement
            sur vos sites pour évaluer vos risques, structurer vos démarches ISO/RSE et renforcer
            le bien-être au travail.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left selector list */}
          <RevealBlock className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex flex-col gap-3" role="tablist" aria-label="Pôles de conseil">
              {CONSULTING_OFFERS.map((offer) => {
                const isSelected = offer.id === activeOffer.id;
                return (
                  <button
                    key={offer.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedId(offer.id)}
                    className={`text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F16D22] ${
                      isSelected
                        ? 'bg-white text-[#12408F] border-white shadow-lg translate-x-1'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`text-xs font-medium ${
                          isSelected ? 'text-[#F16D22]' : 'text-slate-300'
                        }`}
                      >
                        {offer.domain}
                      </span>
                      <span className="text-xs font-mono tabular-nums text-slate-400">
                        {offer.index}
                      </span>
                    </div>
                    <div className="text-base font-bold leading-snug">{offer.title}</div>
                  </button>
                );
              })}
            </div>
          </RevealBlock>

          {/* Right detail panel */}
          <RevealBlock delayMs={80} className="lg:col-span-7 flex">
            <div
              key={activeOffer.id}
              className="panel-enter w-full bg-white text-[#0F172A] rounded-2xl p-7 sm:p-9 border border-slate-200 flex flex-col justify-between"
            >
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-500 mb-3">
                <span className="font-semibold text-[#F16D22]">{activeOffer.domain}</span>
                <span aria-hidden="true">·</span>
                <span>{activeOffer.duration}</span>
              </div>

              <h3 className="text-2xl font-bold text-[#12408F] leading-snug">
                {activeOffer.title}
              </h3>

              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                {activeOffer.summary}
              </p>

              <div className="mt-7 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-bold text-[#12408F] mb-4">
                  Livrables et étapes clés de la mission
                </h4>
                <ul className="space-y-3">
                  {activeOffer.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2
                        className="w-5 h-5 text-[#F16D22] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-500">{activeOffer.regulatoryRef}</p>

              <button
                type="button"
                onClick={() => onRequestConsultingQuote(activeOffer)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#F16D22] hover:bg-[#D95B16] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Planifier un diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
