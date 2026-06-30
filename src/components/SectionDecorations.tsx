import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Asterisk, ArrowUpRight, Heart, Plus, Sparkles, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type SectionVariant = 'about' | 'experience' | 'projects' | 'contact' | 'skills' | 'education';

interface DecoItem {
  id: string;
  className: string;
  strokeWidth?: number;
  Icon?: typeof Asterisk;
  symbol?: string;
}

interface SectionFrame {
  num: string;
  script: string;
  railLeft: string;
  railRight: string;
  symbolLeft?: string;
  symbolRight?: string;
}

const SECTION_FRAME: Record<SectionVariant, SectionFrame> = {
  about: { num: '02', script: 'Story', railLeft: 'Creative', railRight: 'Developer', symbolRight: '✱' },
  skills: { num: '03', script: 'Craft', railLeft: 'Stack', railRight: 'Tools', symbolLeft: '✱' },
  experience: { num: '04', script: 'Journey', railLeft: 'Career', railRight: 'Impact', symbolRight: '✱' },
  education: { num: '05', script: 'Learn', railLeft: 'Study', railRight: 'Growth', symbolLeft: '✱' },
  projects: { num: '06', script: 'Build', railLeft: 'Launch', railRight: 'Ship', symbolRight: '✱' },
  contact: { num: '07', script: 'Hello', railLeft: 'Reach', railRight: 'Connect' },
};

const DECO_BY_SECTION: Record<SectionVariant, DecoItem[]> = {
  about: [
    { id: 'about-plus-l', Icon: Plus, className: 'section-deco section-deco-about-plus-l', strokeWidth: 1.5 },
    { id: 'about-star-l', Icon: Asterisk, className: 'section-deco section-deco-about-star-l', strokeWidth: 2 },
    { id: 'about-arrow-l', Icon: ArrowUpRight, className: 'section-deco section-deco-about-arrow-l', strokeWidth: 1.5 },
    { id: 'about-spark-l', Icon: Sparkles, className: 'section-deco section-deco-about-spark-l', strokeWidth: 1.5 },
    { id: 'about-spark-r', Icon: Sparkles, className: 'section-deco section-deco-about-spark-r', strokeWidth: 1.5 },
    { id: 'about-star-r', Icon: Star, className: 'section-deco section-deco-about-star-r', strokeWidth: 1.5 },
    { id: 'about-heart-r', Icon: Heart, className: 'section-deco section-deco-about-heart-r', strokeWidth: 1.5 },
    { id: 'about-plus-r', Icon: Plus, className: 'section-deco section-deco-about-plus-r', strokeWidth: 1.5 },
    { id: 'about-star-sm-l', Icon: Star, className: 'section-deco section-deco-about-star-sm-l', strokeWidth: 1.5 },
    { id: 'about-symbol-m', symbol: '●', className: 'section-deco section-deco-about-symbol-m' },
  ],
  experience: [
    { id: 'exp-star', Icon: Asterisk, className: 'section-deco section-deco-exp-star', strokeWidth: 2 },
    { id: 'exp-plus', Icon: Plus, className: 'section-deco section-deco-exp-plus', strokeWidth: 1.5 },
    { id: 'exp-spark', Icon: Sparkles, className: 'section-deco section-deco-exp-spark', strokeWidth: 1.5 },
    { id: 'exp-arrow', Icon: ArrowUpRight, className: 'section-deco section-deco-exp-arrow', strokeWidth: 1.5 },
    { id: 'exp-heart', Icon: Heart, className: 'section-deco section-deco-exp-heart', strokeWidth: 1.5 },
    { id: 'exp-star-l', Icon: Star, className: 'section-deco section-deco-exp-star-l', strokeWidth: 1.5 },
    { id: 'exp-plus-r', Icon: Plus, className: 'section-deco section-deco-exp-plus-r', strokeWidth: 1.5 },
    { id: 'exp-star-sm', Icon: Star, className: 'section-deco section-deco-exp-star-sm', strokeWidth: 1.5 },
    { id: 'exp-symbol', symbol: '✱', className: 'section-deco section-deco-exp-symbol' },
  ],
  projects: [
    { id: 'proj-plus', Icon: Plus, className: 'section-deco section-deco-proj-plus', strokeWidth: 1.5 },
    { id: 'proj-star', Icon: Star, className: 'section-deco section-deco-proj-star', strokeWidth: 1.5 },
    { id: 'proj-asterisk', Icon: Asterisk, className: 'section-deco section-deco-proj-asterisk', strokeWidth: 2 },
    { id: 'proj-spark', Icon: Sparkles, className: 'section-deco section-deco-proj-spark', strokeWidth: 1.5 },
    { id: 'proj-arrow', Icon: ArrowUpRight, className: 'section-deco section-deco-proj-arrow', strokeWidth: 1.5 },
    { id: 'proj-heart', Icon: Heart, className: 'section-deco section-deco-proj-heart', strokeWidth: 1.5 },
    { id: 'proj-star-l', Icon: Star, className: 'section-deco section-deco-proj-star-l', strokeWidth: 1.5 },
    { id: 'proj-plus-r', Icon: Plus, className: 'section-deco section-deco-proj-plus-r', strokeWidth: 1.5 },
    { id: 'proj-symbol', symbol: '●', className: 'section-deco section-deco-proj-symbol' },
  ],
  contact: [
    { id: 'contact-spark', Icon: Sparkles, className: 'section-deco section-deco-contact-spark', strokeWidth: 1.5 },
    { id: 'contact-plus', Icon: Plus, className: 'section-deco section-deco-contact-plus', strokeWidth: 1.5 },
    { id: 'contact-star', Icon: Asterisk, className: 'section-deco section-deco-contact-star', strokeWidth: 2 },
    { id: 'contact-heart', Icon: Heart, className: 'section-deco section-deco-contact-heart', strokeWidth: 1.5 },
    { id: 'contact-arrow', Icon: ArrowUpRight, className: 'section-deco section-deco-contact-arrow', strokeWidth: 1.5 },
    { id: 'contact-star-r', Icon: Star, className: 'section-deco section-deco-contact-star-r', strokeWidth: 1.5 },
    { id: 'contact-spark-l', Icon: Sparkles, className: 'section-deco section-deco-contact-spark-l', strokeWidth: 1.5 },
    { id: 'contact-plus-l', Icon: Plus, className: 'section-deco section-deco-contact-plus-l', strokeWidth: 1.5 },
  ],
  skills: [
    { id: 'skills-star', Icon: Asterisk, className: 'section-deco section-deco-skills-star', strokeWidth: 2 },
    { id: 'skills-plus', Icon: Plus, className: 'section-deco section-deco-skills-plus', strokeWidth: 1.5 },
    { id: 'skills-spark', Icon: Sparkles, className: 'section-deco section-deco-skills-spark', strokeWidth: 1.5 },
    { id: 'skills-heart', Icon: Heart, className: 'section-deco section-deco-skills-heart', strokeWidth: 1.5 },
    { id: 'skills-heart-l', Icon: Heart, className: 'section-deco section-deco-skills-heart-l', strokeWidth: 1.5 },
    { id: 'skills-star-r', Icon: Star, className: 'section-deco section-deco-skills-star-r', strokeWidth: 1.5 },
    { id: 'skills-plus-r', Icon: Plus, className: 'section-deco section-deco-skills-plus-r', strokeWidth: 1.5 },
    { id: 'skills-symbol', symbol: '●', className: 'section-deco section-deco-skills-symbol' },
  ],
  education: [
    { id: 'edu-spark', Icon: Sparkles, className: 'section-deco section-deco-edu-spark', strokeWidth: 1.5 },
    { id: 'edu-star', Icon: Star, className: 'section-deco section-deco-edu-star', strokeWidth: 1.5 },
    { id: 'edu-plus', Icon: Plus, className: 'section-deco section-deco-edu-plus', strokeWidth: 1.5 },
    { id: 'edu-asterisk', Icon: Asterisk, className: 'section-deco section-deco-edu-asterisk', strokeWidth: 2 },
    { id: 'edu-arrow', Icon: ArrowUpRight, className: 'section-deco section-deco-edu-arrow', strokeWidth: 1.5 },
    { id: 'edu-heart', Icon: Heart, className: 'section-deco section-deco-edu-heart', strokeWidth: 1.5 },
    { id: 'edu-star-l', Icon: Star, className: 'section-deco section-deco-edu-star-l', strokeWidth: 1.5 },
    { id: 'edu-spark-r', Icon: Sparkles, className: 'section-deco section-deco-edu-spark-r', strokeWidth: 1.5 },
    { id: 'edu-symbol', symbol: '✱', className: 'section-deco section-deco-edu-symbol' },
  ],
};

interface SectionDecorationsProps {
  variant: SectionVariant;
  light?: boolean;
}

const SectionDecorations = ({ variant, light = false }: SectionDecorationsProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const frame = SECTION_FRAME[variant];
  const items = DECO_BY_SECTION[variant];

  useEffect(() => {
    const root = frameRef.current;
    if (!root) return;

    const decorItems = root.querySelectorAll('.section-deco');
    const introItems = root.querySelectorAll('.section-frame-intro');

    const ctx = gsap.context(() => {
      if (introItems.length) {
        gsap.fromTo(
          introItems,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: root,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(
        decorItems,
        { opacity: 0, scale: 0.6, rotation: -30 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'back.out(1.8)',
          scrollTrigger: {
            trigger: root,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      decorItems.forEach((el, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.to(el, {
          rotation: dir * 18,
          duration: 4 + i * 0.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });

        gsap.to(el, {
          y: dir * 10,
          x: dir * -6,
          duration: 3 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }, frameRef);

    return () => ctx.revert();
  }, [variant]);

  return (
    <div
      ref={frameRef}
      className={`section-frame${light ? ' section-frame--light' : ''}`}
      aria-hidden
    >
      {/* <div className="section-texture-left section-frame-intro" />
      <div className="section-texture-right section-frame-intro" /> */}

      <div className="section-side-rail section-side-rail--left hidden xl:flex section-frame-intro">
        <span className="section-rail-line" />
        <span className="section-rail-tag">{frame.railLeft}</span>
        <Plus className="section-rail-icon" strokeWidth={1.5} />
        <span className="section-rail-line section-rail-line--short" />
      </div>

      <div className="section-side-rail section-side-rail--right hidden xl:flex section-frame-intro">
        <span className="section-rail-line section-rail-line--short" />
        <Heart className="section-rail-icon" strokeWidth={1.5} />
        <span className="section-rail-tag">{frame.railRight}</span>
        <span className="section-rail-line" />
      </div>

      <span className="section-edge-num hidden md:block section-frame-intro">
        {frame.num}
      </span>

      <span className="section-edge-script section-edge-script--right hidden lg:block section-frame-intro">
        {frame.script}
      </span>

      {frame.symbolLeft && (
        <span className="section-edge-symbol section-edge-symbol--left hidden md:block section-frame-intro">
          {frame.symbolLeft}
        </span>
      )}

      {frame.symbolRight && (
        <span className="section-edge-symbol section-edge-symbol--right hidden md:block section-frame-intro">
          {frame.symbolRight}
        </span>
      )}

      <div className="section-deco-layer">
        {items.map(({ id, Icon, className, strokeWidth = 1.5, symbol }) => (
          <div key={id} className={className}>
            {symbol ? (
              <span className="section-deco-symbol">{symbol}</span>
            ) : Icon ? (
              <Icon strokeWidth={strokeWidth} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionDecorations;
