import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealBlockProps {
  children: ReactNode;
  delayMs?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
}

export function RevealBlock({
  children,
  delayMs = 0,
  direction = 'up',
  className = '',
}: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const checkPosition = () => {
      const rect = el.getBoundingClientRect();
      // Reveal if already inside viewport or already scrolled past (e.g. jump links)
      if (rect.top <= window.innerHeight * 0.99) {
        setVisible(true);
        return true;
      }
      return false;
    };

    if (checkPosition()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight * 0.99) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.02, rootMargin: '0px 0px -10px 0px' }
    );

    observer.observe(el);

    const handleScroll = () => {
      if (checkPosition()) {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hiddenClass =
    direction === 'left'
      ? 'reveal-hidden-left'
      : direction === 'right'
        ? 'reveal-hidden-right'
        : 'reveal-hidden-up';

  return (
    <div
      ref={ref}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`reveal-base ${visible ? 'reveal-visible' : hiddenClass} ${className}`}
    >
      {children}
    </div>
  );
}
