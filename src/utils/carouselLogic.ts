export interface CarouselMetricsInput {
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
  cardWidth: number;
  gapPx: number;
  itemCount: number;
}

export interface CarouselMetrics {
  canPrev: boolean;
  canNext: boolean;
  hasOverflow: boolean;
  scrollRatio: number;
  activeIndex: number;
}

export function computeCarouselMetrics({
  scrollLeft,
  scrollWidth,
  clientWidth,
  cardWidth,
  gapPx,
  itemCount,
}: CarouselMetricsInput): CarouselMetrics {
  const maxScroll = Math.max(0, scrollWidth - clientWidth);
  const clampedScroll = Math.min(maxScroll, Math.max(0, scrollLeft));
  const hasOverflow = maxScroll > 4;

  const canPrev = clampedScroll > 4;
  const canNext = maxScroll - clampedScroll > 4;
  const scrollRatio = maxScroll > 0 ? Math.min(1, Math.max(0, clampedScroll / maxScroll)) : 0;

  let activeIndex = 0;
  if (itemCount > 1 && cardWidth > 0) {
    const stepWidth = cardWidth + gapPx;
    activeIndex = Math.min(itemCount - 1, Math.max(0, Math.round(clampedScroll / stepWidth)));
  }

  return {
    canPrev,
    canNext,
    hasOverflow,
    scrollRatio,
    activeIndex,
  };
}

export function getCardsPerScrollStep(
  clientWidth: number,
  cardWidth: number,
  gapPx: number
): number {
  if (clientWidth <= 0 || cardWidth <= 0) return 1;
  const stepWidth = cardWidth + gapPx;
  const visibleCards = Math.max(1, Math.floor((clientWidth + gapPx + 2) / stepWidth));
  if (visibleCards >= 2) {
    return 2;
  }
  return 1;
}
