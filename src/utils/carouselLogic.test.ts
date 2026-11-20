import test from 'node:test';
import assert from 'node:assert/strict';
import { computeCarouselMetrics, getCardsPerScrollStep } from './carouselLogic';

test('computeCarouselMetrics detects start, middle, and end positions accurately', () => {
  const start = computeCarouselMetrics({
    scrollLeft: 0,
    scrollWidth: 2400,
    clientWidth: 1200,
    cardWidth: 285,
    gapPx: 20,
    itemCount: 8,
  });
  assert.equal(start.hasOverflow, true);
  assert.equal(start.canPrev, false);
  assert.equal(start.canNext, true);
  assert.equal(start.scrollRatio, 0);
  assert.equal(start.activeIndex, 0);

  const mid = computeCarouselMetrics({
    scrollLeft: 610,
    scrollWidth: 2400,
    clientWidth: 1200,
    cardWidth: 285,
    gapPx: 20,
    itemCount: 8,
  });
  assert.equal(mid.canPrev, true);
  assert.equal(mid.canNext, true);
  assert.equal(mid.activeIndex, 2);
  assert.ok(mid.scrollRatio > 0.45 && mid.scrollRatio < 0.55);

  const end = computeCarouselMetrics({
    scrollLeft: 1200,
    scrollWidth: 2400,
    clientWidth: 1200,
    cardWidth: 285,
    gapPx: 20,
    itemCount: 8,
  });
  assert.equal(end.canPrev, true);
  assert.equal(end.canNext, false);
  assert.equal(end.scrollRatio, 1);
  assert.equal(end.activeIndex, 4);
});

test('computeCarouselMetrics disables overflow when all items fit within viewport', () => {
  const single = computeCarouselMetrics({
    scrollLeft: 0,
    scrollWidth: 590,
    clientWidth: 1200,
    cardWidth: 590,
    gapPx: 24,
    itemCount: 1,
  });
  assert.equal(single.hasOverflow, false);
  assert.equal(single.canPrev, false);
  assert.equal(single.canNext, false);
  assert.equal(single.activeIndex, 0);
});

test('getCardsPerScrollStep scrolls 2 cards on multi-column layouts and 1 on single-column', () => {
  assert.equal(getCardsPerScrollStep(1200, 285, 20), 2); // 4-up desktop
  assert.equal(getCardsPerScrollStep(1200, 384, 24), 2); // 3-up desktop
  assert.equal(getCardsPerScrollStep(760, 368, 24), 2); // 2-up tablet
  assert.equal(getCardsPerScrollStep(358, 300, 20), 1); // 1-up mobile
});
