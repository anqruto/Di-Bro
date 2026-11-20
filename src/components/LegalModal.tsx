import { useEffect } from 'react';
import { X } from 'lucide-react';

export type LegalDocType = 'mentions' | 'cgv' | null;

interface LegalModalProps {
  docType: LegalDocType;
  onClose: () => void;
}

export function LegalModal({ docType, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!docType) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [docType, onClose]);

  if (!docType) return null;

  const isMentions = docType === 'mentions';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12408F]/70 backdrop-blur-xs modal-backdrop-enter"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 modal-card-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <h2 id="legal-modal-title" className="text-xl font-bold text-[#12408F]">
            {isMentions ? 'Mentions légales' : 'Conditions Générales de Vente (CGV)'}
          </h2>
          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-sm text-slate-600 leading-relaxed">
          {isMentions ? (
            <>
              <p>
                <strong className="text-[#12408F]">Éditeur :</strong> DIDAS &amp; BROTHERS SAS —
                Cabinet de conseil et organisme de formation professionnelle continue.
              </p>
              <p>
                <strong className="text-[#12408F]">Siège social :</strong> 24 Avenue de l’Opéra,
                75001 Paris, France.
              </p>
              <p>
                <strong className="text-[#12408F]">Contact :</strong> contact@didas-brothers.fr ·
                01 84 60 42 10.
              </p>
              <p>
                <strong className="text-[#12408F]">Certification &amp; Agréments :</strong>{' '}
                Organisme certifié Qualiopi au titre des actions de formation, habilité INRS et
                enregistré auprès de la DREETS pour les formations CSE/CSSCT.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong className="text-[#12408F]">1. Objet et champ d’application :</strong> Toute
                commande de formation ou de prestation de conseil auprès de DIDAS &amp; BROTHERS
                implique l’acceptation sans réserve des présentes CGV.
              </p>
              <p>
                <strong className="text-[#12408F]">2. Inscriptions et conventions :</strong> Chaque
                action donne lieu à l’établissement d’une convention de formation professionnelle
                précisant les objectifs, durées, modalités et tarifs.
              </p>
              <p>
                <strong className="text-[#12408F]">3. Financement OPCO :</strong> En cas de
                prise en charge par un OPCO, l’entreprise cliente demeure responsable de la
                transmission du dossier avant le démarrage de la session.
              </p>
              <p>
                <strong className="text-[#12408F]">4. Accessibilité :</strong> Nos modalités
                d’accueil et d’adaptation pédagogique pour les personnes en situation de handicap
                sont étudiées en amont avec notre référent handicap.
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#12408F] hover:bg-[#12408F]/90 rounded-lg transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
