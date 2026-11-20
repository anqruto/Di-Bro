import { useEffect, useState } from 'react';

export interface SpySectionItem {
  id: string;
  index: string;
  label: string;
}

interface SectionSpyNavProps {
  sections: SpySectionItem[];
}

export function SectionSpyNav({ sections }: SectionSpyNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const updateActiveFromScroll = () => {
      const offset = 180;
      let current = sections[0]?.id ?? '';
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset) {
          current = sec.id;
        }
      }
      setActiveId(current);
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveFromScroll);
  }, [sections]);

  const scrollToBlock = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Navigation rapide entre les sections de la page"
      className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToBlock(section.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12408F] ${
                  isActive
                    ? 'text-[#12408F] font-semibold'
                    : 'text-slate-500 hover:text-[#12408F]'
                }`}
              >
                <span
                  className={`font-mono text-[11px] tabular-nums transition-colors duration-200 ${
                    isActive ? 'text-[#F16D22]' : 'text-slate-400'
                  }`}
                >
                  {section.index}
                </span>{' '}
                <span>{section.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute left-3 right-3 bottom-0 h-0.5 bg-[#F16D22] rounded-full transition-all duration-300 ease-out origin-left ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
