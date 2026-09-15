import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, Plus, Sparkles } from 'lucide-react';
import SectionDecorations from './SectionDecorations';
import maxstarterImage from '@/assets/maxstarter.png';
import gitworkImage from '@/assets/gitwork.png';
import writexImage from '@/assets/Writex.png';
import gawriGangaImage from '@/assets/Gawri Ganga.png';

gsap.registerPlugin(ScrollTrigger);

const featuredWorks = [
  {
    index: '01',
    title: 'MaxStarter',
    tag: 'Open Source · CLI',
    blurb:
      'Opinionated Expo + React Native starter. One interactive CLI, ready-to-build apps — without the bloat.',
    tech: ['Expo', 'React Native', 'TypeScript', 'npm'],
    image: maxstarterImage,
    liveLink: 'https://maxstarter.vercel.app/',
    githubLink: 'https://github.com/Maxzovert/maxstarter',
  },
  {
    index: '02',
    title: 'Gitwork',
    tag: 'Open Source · AI',
    blurb:
      'AI GitHub workspace — RAG codebase Q&A, commit & PR digests, meetings turned into issues.',
    tech: ['Next.js', 'pgvector', 'Gemini', 'Clerk'],
    image: gitworkImage,
    liveLink: 'https://gitwork-mauve.vercel.app/',
    githubLink: 'https://github.com/Maxzovert/gitwork.git',
  },
  {
    index: '03',
    title: 'WRITE-X',
    tag: 'Open Source · Web',
    blurb:
      'Full-stack blogging platform built end-to-end — TipTap editing, Supabase, and Gemini-powered features.',
    tech: ['React', 'TipTap', 'Supabase', 'Gemini'],
    image: writexImage,
    liveLink: 'https://writtex.onrender.com/',
    githubLink: 'https://github.com/Maxzovert/writex.git',
  },
  {
    index: '04',
    title: 'Gawri Ganga',
    tag: 'Client · E-Commerce',
    blurb:
      'Production e-commerce for 15,000+ visitors — React, Node, PostgreSQL, AWS, payments & shipping.',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'AWS'],
    image: gawriGangaImage,
    liveLink: 'https://www.gawriganga.com/',
  },
];

const ModernFeatured = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, skewY: 4 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        gridRef.current?.children ?? [],
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="section-padding dark-section relative overflow-hidden"
    >
      <SectionDecorations variant="featured" light />

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        <div className="text-left mb-10 sm:mb-12 md:mb-16 relative">
          <div className="flex items-start justify-between gap-4">
            <h2 ref={titleRef} className="section-title section-title-light text-left">
              FEATURED
            </h2>
            <span className="star-symbol-light mt-4 hidden text-3xl md:block">✱</span>
          </div>
          <span className="script-word-light absolute right-[4%] top-[18%] hidden md:block rotate-[5deg]">
            Highlights
          </span>
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <Sparkles
              className="h-5 w-5 flex-shrink-0 text-[var(--bg-paper)] opacity-50 rotate-[-10deg]"
              strokeWidth={1.5}
            />
            <p className="body-copy text-[var(--gray-mid)] max-w-xl">
              The four projects that define my work — open-source tools, AI systems, and shipped production platforms.
            </p>
          </div>
          <div className="mt-4 hidden sm:inline-flex items-center gap-2 border border-white/25 bg-white/5 px-3 py-2 rounded-lg rotate-[-2deg]">
            <ArrowUpRight className="h-4 w-4 text-[var(--bg-paper)] opacity-80" strokeWidth={1.5} />
            <span className="micro-label text-[var(--bg-paper)] opacity-90">Selected Work</span>
          </div>
          <Plus
            className="absolute right-[16%] top-[58%] hidden h-5 w-5 text-[var(--bg-paper)] opacity-40 lg:block rotate-[15deg]"
            strokeWidth={1.5}
          />
        </div>

        <div ref={gridRef} className="featured-grid">
          {featuredWorks.map((work) => (
            <article key={work.title} className="featured-card group">
              <div className="featured-card-media">
                <img src={work.image} alt={work.title} className="featured-card-image" />
                <span className="featured-card-index">{work.index}</span>
              </div>

              <div className="featured-card-body">
                <p className="micro-label text-[var(--gray-mid)] mb-2">{work.tag}</p>
                <h3 className="featured-card-title">{work.title}</h3>
                <p className="featured-card-blurb">{work.blurb}</p>

                <div className="featured-card-tech">
                  {work.tech.map((item) => (
                    <span key={item} className="featured-card-chip">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="featured-card-actions">
                  <a
                    href={work.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-card-link bento-card-link-primary"
                  >
                    View Live
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  {work.githubLink && (
                    <a
                      href={work.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bento-card-link bento-card-link-secondary featured-card-link-dark"
                    >
                      <Github className="h-4 w-4" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 sm:mt-12">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('projects');
              if (!el) return;
              const lenis = (window as Window & { lenis?: { scrollTo: (t: HTMLElement, o: object) => void } }).lenis;
              if (lenis) {
                lenis.scrollTo(el, { offset: 0, duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
              } else {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="editorial-btn editorial-btn-outline featured-browse-btn inline-flex"
          >
            Browse all projects
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ModernFeatured;
