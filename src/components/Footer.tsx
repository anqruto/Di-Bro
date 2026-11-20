import { THEMES, type ThemeId } from '../data/catalog';
import type { PageRoute } from '../utils/catalogLogic';
import type { LegalDocType } from './LegalModal';

interface FooterProps {
  onSelectTheme: (themeId: ThemeId) => void;
  onNavigateRoute: (route: PageRoute) => void;
  onOpenLegal: (doc: LegalDocType) => void;
}

export function Footer({ onSelectTheme, onNavigateRoute, onOpenLegal }: FooterProps) {
  return (
    <footer className="bg-[#12408F] text-slate-200 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center justify-center rounded-xl overflow-hidden bg-[#12408F] w-[156px] h-[64px]">
              <img
                src="./assets/aistudio/3_62b332ef.png"
                alt="DIDAS & BROTHERS — Conseils & Formation"
                referrerPolicy="no-referrer"
                className="w-[210px] h-[210px] max-w-none object-contain"
              />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Votre partenaire en conseil et formation professionnelle pour la performance durable,
              le management et la sécurité au travail.
            </p>
            <p className="text-xs text-slate-400">
              24 Avenue de l’Opéra, 75001 Paris · 01 84 60 42 10 · contact@didas-brothers.fr
            </p>
          </div>

          {/* Thematic formation links mirroring propuls.fr footer directory */}
          <div className="lg:col-span-5">
            <h3 className="text-sm font-bold text-white mb-4">Thématiques de formation</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {THEMES.map((theme) => (
                <li key={theme.id}>
                  <button
                    type="button"
                    onClick={() => onSelectTheme(theme.id)}
                    className="text-left text-slate-300 hover:text-[#F16D22] transition-colors cursor-pointer"
                  >
                    {theme.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateRoute('/')}
                  className="text-slate-300 hover:text-[#F16D22] transition-colors cursor-pointer"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateRoute('/formations')}
                  className="text-slate-300 hover:text-[#F16D22] transition-colors cursor-pointer"
                >
                  Nos formations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateRoute('/conseil')}
                  className="text-slate-300 hover:text-[#F16D22] transition-colors cursor-pointer"
                >
                  Conseil et accompagnement
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateRoute('/le-cabinet')}
                  className="text-slate-300 hover:text-[#F16D22] transition-colors cursor-pointer"
                >
                  Le cabinet &amp; Références
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateRoute('/contact')}
                  className="text-slate-300 hover:text-[#F16D22] transition-colors cursor-pointer"
                >
                  Contactez-nous
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} DIDAS &amp; BROTHERS — Conseils &amp; Formation. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal('mentions')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mentions légales
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('cgv')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              CGV
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
