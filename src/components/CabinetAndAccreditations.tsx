import { Accessibility, Award, Building2, ShieldCheck } from 'lucide-react';
import { ACCREDITATIONS, TEAM_MEMBERS } from '../data/catalog';
import { HorizontalCarousel } from './HorizontalCarousel';
import { RevealBlock } from './RevealBlock';

interface CabinetAndAccreditationsProps {
  onContactAccessibility: () => void;
}

export function CabinetAndAccreditations({
  onContactAccessibility,
}: CabinetAndAccreditationsProps) {
  return (
    <section id="cabinet" className="py-16 lg:py-24 bg-white border-b border-slate-200 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Part 1: Brand identity & Leadership Team */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <RevealBlock className="lg:col-span-5 space-y-5">
            <p className="text-sm font-semibold text-[#F16D22]">Le cabinet DIDAS &amp; BROTHERS</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#12408F] text-balance">
              Un collectif engagé pour la performance et la sécurité au travail
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Fondé sur la complémentarité entre conseil stratégique de terrain et pédagogie
              opérationnelle, DIDAS &amp; BROTHERS réunit des consultants IPRP, psychologues du
              travail et formateurs certifiés. Chaque intervention est construite à partir de vos
              contraintes métier réelles.
            </p>

            <div className="p-5 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center gap-5">
              <div className="w-36 h-16 bg-white rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src="./assets/aistudio/logo_e5b80c07.png"
                  alt="Logo DIDAS & BROTHERS"
                  referrerPolicy="no-referrer"
                  className="w-[164px] h-[164px] max-w-none object-contain"
                />
              </div>
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong className="block text-sm text-[#12408F] mb-0.5">
                  Proximité &amp; Réactivité
                </strong>
                Interventions intra-entreprise partout en France métropolitaine et sessions
                inter-entreprises planifiées toute l’année.
              </div>
            </div>
          </RevealBlock>

          <div className="lg:col-span-7 min-w-0">
            <HorizontalCarousel
              items={TEAM_MEMBERS}
              getKey={(member) => member.id}
              layout="2-up-sm"
              gapPx={20}
              regionLabel="Carrousel de l’équipe de direction et consultants"
              prevLabel="Membre précédent"
              nextLabel="Membre suivant"
              itemLabel={(member, idx) =>
                `Afficher le profil ${idx + 1} : ${member.name}`
              }
              testId="team-carousel-track"
              controlsAlign="end"
              renderItem={(member, index) => (
                <RevealBlock delayMs={Math.min(index, 2) * 55} className="w-full h-full">
                  <div className="h-full bg-[#F8FAFC] rounded-xl p-6 border border-slate-200 hover:border-[#12408F]/40 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-11 h-11 rounded-lg bg-[#12408F] text-white font-bold text-sm flex items-center justify-center shrink-0">
                          {member.initials}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#12408F]">{member.name}</h3>
                          <p className="text-xs font-medium text-[#F16D22]">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{member.specialty}</p>
                    </div>
                    <p className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500">
                      {member.experience}
                    </p>
                  </div>
                </RevealBlock>
              )}
            />
          </div>
        </div>

        {/* Part 2: Référentiels et agréments (INRS, DREETS, CARSAT) */}
        <div>
          <RevealBlock className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-[#F16D22] mb-2">Gage de conformité</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#12408F]">
              Référentiels et agréments officiels
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACCREDITATIONS.map((acc, index) => {
              const Icon = index === 0 ? ShieldCheck : index === 1 ? Building2 : Award;
              return (
                <RevealBlock key={acc.id} delayMs={index * 75} className="h-full">
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

          {/* Part 3: Certification Qualiopi & Accessibilité PMR strip */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    Soucieux des situations rencontrées par les personnes à mobilité réduite ou en
                    situation de handicap, le cabinet DIDAS &amp; BROTHERS étudie et accompagne
                    chaque parcours avec notre référent handicap.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={onContactAccessibility}
                    className="text-sm font-semibold text-[#12408F] hover:text-[#F16D22] transition-colors cursor-pointer"
                  >
                    Contacter notre référent accessibilité →
                  </button>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
