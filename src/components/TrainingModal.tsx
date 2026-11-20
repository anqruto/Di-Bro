import { useEffect } from 'react';
import { Award, CheckCircle2, Clock, Star, Users, X } from 'lucide-react';
import type { FormationItem } from '../data/catalog';
import { getThemeLabel } from '../utils/catalogLogic';

interface TrainingModalProps {
  formation: FormationItem | null;
  onClose: () => void;
  onRequestQuote: (formation: FormationItem) => void;
}

export function TrainingModal({ formation, onClose, onRequestQuote }: TrainingModalProps) {
  useEffect(() => {
    if (!formation) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [formation, onClose]);

  if (!formation) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="training-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12408F]/70 backdrop-blur-xs modal-backdrop-enter"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 modal-card-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 mb-2">
              <span className="font-semibold text-[#F16D22]">
                {getThemeLabel(formation.themeId)}
              </span>
              <span aria-hidden="true">/</span>
              <span>{formation.subCategory}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-slate-700 tabular-nums">
                <Star className="w-3.5 h-3.5 fill-[#F16D22] text-[#F16D22]" aria-hidden="true" />
                {formation.rating.toFixed(1).replace('.', ',')}/5 ({formation.reviewCount} avis)
              </span>
            </div>
            <h2 id="training-modal-title" className="text-xl sm:text-2xl font-bold text-[#12408F]">
              {formation.title}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Fermer la fiche formation"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-[#12408F] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-6">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{formation.summary}</p>

          {/* Key metadata grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#F16D22] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="text-xs text-slate-500">Durée</div>
                <div className="text-sm font-semibold text-[#12408F] tabular-nums">
                  {formation.duration}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-[#F16D22] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="text-xs text-slate-500">Modalité</div>
                <div className="text-sm font-semibold text-[#12408F]">{formation.format}</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-[#F16D22] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="text-xs text-slate-500">Validation</div>
                <div className="text-xs font-semibold text-[#12408F] leading-snug">
                  {formation.certification}
                </div>
              </div>
            </div>
          </div>

          {/* Objectifs pédagogiques */}
          <div>
            <h3 className="text-sm font-bold text-[#12408F] mb-3">Objectifs pédagogiques</h3>
            <ul className="space-y-2">
              {formation.objectives.map((obj) => (
                <li key={obj} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2
                    className="w-4 h-4 text-[#F16D22] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Programme */}
          <div>
            <h3 className="text-sm font-bold text-[#12408F] mb-3">Programme synthétique</h3>
            <div className="space-y-2">
              {formation.modules.map((mod) => (
                <div
                  key={mod}
                  className="px-4 py-2.5 rounded-lg bg-[#F8FAFC] border border-slate-200 text-sm text-slate-700"
                >
                  {mod}
                </div>
              ))}
            </div>
          </div>

          {/* Public visé */}
          <div className="text-sm text-slate-600">
            <strong className="text-[#12408F]">Public concerné :</strong> {formation.audience}
          </div>
        </div>

        <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={() => onRequestQuote(formation)}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-[#F16D22] hover:bg-[#D95B16] rounded-lg transition-colors cursor-pointer"
          >
            Demander un devis pour cette formation
          </button>
        </div>
      </div>
    </div>
  );
}
