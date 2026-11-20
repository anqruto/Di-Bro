import { ChevronRight } from 'lucide-react';
import type { PageRoute } from '../utils/catalogLogic';

interface PageBannerProps {
  breadcrumbLabel: string;
  kicker: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageObjectPosition?: string;
  onNavigateHome: (route: PageRoute) => void;
}

export function PageBanner({
  breadcrumbLabel,
  kicker,
  title,
  description,
  image,
  imageAlt,
  imageObjectPosition = 'object-center',
  onNavigateHome,
}: PageBannerProps) {
  return (
    <section className="bg-[#12408F] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <nav aria-label="Fil d’Ariane" className="flex items-center gap-2 text-xs text-slate-300 mb-6">
          <button
            type="button"
            onClick={() => onNavigateHome('/')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Accueil
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span className="text-[#F16D22] font-semibold">{breadcrumbLabel}</span>
        </nav>

        <div
          className={`grid grid-cols-1 ${
            image ? 'lg:grid-cols-12 gap-8 lg:gap-12 items-center' : ''
          }`}
        >
          <div className={`${image ? 'lg:col-span-7 space-y-4' : 'max-w-3xl space-y-4'} hero-enter-1`}>
            <p className="text-sm font-semibold text-[#F16D22]">{kicker}</p>
            <h1
              className="font-bold tracking-tight text-white leading-tight text-balance"
              style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)' }}
            >
              {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {image && (
            <div className="lg:col-span-5 hero-enter-2">
              <div className="aspect-4/3 rounded-2xl overflow-hidden border border-white/15 bg-[#12408F]">
                <img
                  src={image}
                  alt={imageAlt ?? title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${imageObjectPosition}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
