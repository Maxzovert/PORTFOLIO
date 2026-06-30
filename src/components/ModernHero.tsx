import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Download } from 'lucide-react';
import resumePdf from '@/assets/UP-RESUME.pdf';
import profileImage from '@/assets/Heroimg.png';
import heroGraphic from '@/assets/graphic.png';

gsap.registerPlugin(ScrollTrigger);

const ModernHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headerRef.current, scriptRef.current, titleWrapRef.current, imageRef.current, starRef.current, ctaRef.current, scrollRef.current], {
        opacity: 0,
      });
      gsap.set(scriptRef.current, { y: -30, rotation: -8 });
      gsap.set(imageRef.current, { y: 80, scale: 0.92 });
      gsap.set(headerRef.current, { y: -20 });
      gsap.set(ctaRef.current, { y: 30 });
      gsap.set(starRef.current, { scale: 0, rotation: -90 });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(scriptRef.current, { opacity: 1, y: 0, rotation: -2, duration: 1, ease: 'power4.out' }, '-=0.5')
        .to(titleWrapRef.current, { opacity: 1, duration: 1.1, ease: 'power4.out' }, '-=0.7')
        .to(imageRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=0.9')
        .to(starRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(2)' }, '-=0.6')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to(scrollRef.current, { opacity: 1, duration: 0.6 }, '-=0.3');

      gsap.to(starRef.current, {
        rotation: 15,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to(heroRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as Window & { lenis?: { scrollTo: (t: HTMLElement, o: object) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 2, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={heroRef} className="hero paper-bg min-h-screen relative overflow-hidden">
      {/* Paper texture marks */}
      <div className="hero-texture-left" aria-hidden />
      <img
        src={heroGraphic}
        alt=""
        className="hero-graphic"
        aria-hidden
      />

      <header ref={headerRef} className="top-header">
        <div className="header-dots">
          <span className="header-dot" />
          <span className="header-dot" />
          <span className="header-dot" />
        </div>
        <div className="header-center micro-label">Full Stack Developer</div>
        <div className="header-right micro-label">Abdullah</div>
      </header>

      <div ref={scriptRef} className="hero-script">
        Full stack
      </div>

      <div ref={titleWrapRef} className="hero-title-wrap">
        <h1 ref={titleRef} className="hero-title">
          DEVELOPER
        </h1>
      </div>

      <img
        ref={imageRef}
        src={profileImage}
        alt="Abdullah — Developer"
        className="hero-image editorial-img"
      />

      <div ref={starRef} className="hero-star star-symbol" aria-hidden>
        ✱
      </div>

      <div ref={ctaRef} className="hero-cta">
        <button type="button" onClick={() => scrollTo('projects')} className="editorial-btn">
          View Projects
        </button>
        <button
          type="button"
          onClick={() => {
            const link = document.createElement('a');
            link.href = resumePdf;
            link.download = 'Abdullah_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="editorial-btn editorial-btn-outline"
        >
          <Download className="w-3.5 h-3.5" />
          Resume
        </button>
        <button type="button" onClick={() => scrollTo('contact')} className="editorial-btn editorial-btn-dark">
          Get In Touch
        </button>
      </div>

      <div ref={scrollRef} className="hero-scroll micro-label">
        <span>Scroll</span>
        <ArrowDown className="w-3 h-3 animate-bounce" />
      </div>
    </section>
  );
};

export default ModernHero;
