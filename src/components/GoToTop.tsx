import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

type LenisInstance = {
  scroll: number;
  on: (event: 'scroll', fn: () => void) => void;
  off: (event: 'scroll', fn: () => void) => void;
  scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number }) => void;
};

const getLenis = () => (window as Window & { lenis?: LenisInstance }).lenis;

const GoToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const lenis = getLenis();
      const scrollY = lenis?.scroll ?? window.scrollY;
      setVisible(scrollY > 480);
    };

    const onScroll = () => update();

    let lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', onScroll);
      update();
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      update();
    }

    const interval = window.setInterval(() => {
      if (!lenis && getLenis()) {
        lenis = getLenis();
        window.removeEventListener('scroll', onScroll);
        lenis?.on('scroll', onScroll);
        update();
      }
    }, 150);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
      getLenis()?.off('scroll', onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.8,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`go-to-top${visible ? ' go-to-top--visible' : ''}`}
      aria-label="Go to top"
    >
      <ArrowUp className="h-4 w-4" strokeWidth={1.75} />
      <span className="go-to-top-label">Top</span>
    </button>
  );
};

export default GoToTop;
