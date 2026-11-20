import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { computeCarouselMetrics, getCardsPerScrollStep } from '../utils/carouselLogic';

export type CarouselLayout = '4-up' | '3-up' | '2-up-sm' | '2-up-md';

interface HorizontalCarouselProps<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  layout: CarouselLayout;
  gapPx?: number;
  regionLabel: string;
  prevLabel: string;
  nextLabel: string;
  itemLabel: (item: T, index: number) => string;
  testId?: string;
  headerLeft?: ReactNode;
  headerExtra?: ReactNode;
  resetKey?: string | number;
  controlsAlign?: 'end' | 'between';
  showControlsWhenSingle?: boolean;
}

const SLIDE_WIDTH_CLASSES: Record<CarouselLayout, string> = {
  '4-up': 'w-[84%] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]',
  '3-up': 'w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]',
  '2-up-sm': 'w-[86%] sm:w-[calc(50%-10px)]',
  '2-up-md': 'w-[86%] md:w-[calc(50%-12px)]',
};

export function HorizontalCarousel<T>({
  items,
  getKey,
  renderItem,
  layout,
  gapPx = 24,
  regionLabel,
  prevLabel,
  nextLabel,
  itemLabel,
  testId,
  headerLeft,
  headerExtra,
  resetKey,
  controlsAlign = 'between',
  showControlsWhenSingle = false,
}: HorizontalCarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(items.length > 1);
  const [hasOverflow, setHasOverflow] = useState(items.length > 1);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth : 0;

    const metrics = computeCarouselMetrics({
      scrollLeft: el.scrollLeft,
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      cardWidth,
      gapPx,
      itemCount: items.length,
    });

    setCanPrev(metrics.canPrev);
    setCanNext(metrics.canNext);
    setHasOverflow(metrics.hasOverflow);
    setScrollRatio(metrics.scrollRatio);
    setActiveIndex(metrics.activeIndex);
  }, [gapPx, items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    const frame = requestAnimationFrame(updateScrollState);
    return () => cancelAnimationFrame(frame);
  }, [resetKey, updateScrollState]);

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    window.addEventListener('resize', updateScrollState, { passive: true });
    let observer: ResizeObserver | null = null;
    if (el && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateScrollState);
      observer.observe(el);
    }
    return () => {
      window.removeEventListener('resize', updateScrollState);
      observer?.disconnect();
    };
  }, [updateScrollState]);

  const scrollByStep = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth : 320;
    const cardsPerClick = getCardsPerScrollStep(el.clientWidth, cardWidth, gapPx);
    const stepPx = cardWidth + gapPx;

    el.scrollBy({
      left: direction * stepPx * cardsPerClick,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const target = el.children[index] as HTMLElement | undefined;
    if (!target) return;
    el.scrollTo({
      left: target.offsetLeft,
      behavior: 'smooth',
    });
  };

  const showControls = showControlsWhenSingle || (items.length > 1 && hasOverflow);
  const gapClass = gapPx === 20 ? 'gap-5' : 'gap-6';
  const slideWidthClass = SLIDE_WIDTH_CLASSES[layout];

  return (
    <div>
      {(headerLeft || showControls || headerExtra) && (
        <div
          className={
            headerLeft
              ? 'flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8'
              : `flex flex-wrap items-center ${
                  headerExtra ? 'justify-between' : controlsAlign === 'end' ? 'justify-end' : 'justify-between'
                } gap-4 mb-6`
          }
        >
          {headerLeft && <div className="min-w-0 flex-1">{headerLeft}</div>}

          {(headerExtra || showControls) && (
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              {headerExtra}

              {showControls && (
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-xs font-mono font-medium text-slate-500 tabular-nums mr-1">
                    {String(activeIndex + 1).padStart(2, '0')} /{' '}
                    {String(items.length).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    onClick={() => scrollByStep(-1)}
                    disabled={!canPrev}
                    aria-label={prevLabel}
                    className="w-11 h-11 rounded-lg border border-slate-200 bg-white text-[#12408F] hover:border-[#12408F] hover:bg-[#12408F] hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors duration-150 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F16D22]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollByStep(1)}
                    disabled={!canNext}
                    aria-label={nextLabel}
                    className="w-11 h-11 rounded-lg border border-slate-200 bg-white text-[#12408F] hover:border-[#F16D22] hover:bg-[#F16D22] hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors duration-150 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F16D22]"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Horizontal snap slider track */}
      <div
        ref={trackRef}
        onScroll={updateScrollState}
        onKeyDown={(e) => {
          if (!hasOverflow) return;
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollByStep(1);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollByStep(-1);
          }
        }}
        role="region"
        aria-roledescription="carrousel"
        aria-label={regionLabel}
        data-testid={testId}
        className={`flex ${gapClass} overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-2 -my-2 px-0.5 -mx-0.5`}
      >
        {items.map((item, index) => (
          <div key={getKey(item, index)} className={`snap-start shrink-0 ${slideWidthClass} flex`}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Bottom slide progress track & quick jump indicators */}
      {showControls && (
        <div className="mt-7 flex items-center justify-between gap-6">
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F16D22] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.max(20, Math.round(20 + scrollRatio * 80))}%` }}
            />
          </div>

          <div className="hidden sm:flex items-center gap-1.5" aria-label="Accès direct par slide">
            {items.map((item, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={getKey(item, idx)}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  aria-label={itemLabel(item, idx)}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? 'w-6 bg-[#12408F]'
                      : 'w-2 bg-slate-300 hover:bg-[#F16D22]'
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
