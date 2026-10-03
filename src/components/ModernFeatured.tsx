import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, Plus, Sparkles } from 'lucide-react';
import SectionDecorations from './SectionDecorations';
import maxstarterImage from '@/assets/maxstarter.png';
import gitworkImage from '@/assets/gitwork.png';
import writexImage from '@/assets/Writex.png';
import gawriGangaImage from '@/assets/Gawri Ganga.png';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedWork {
  title: string;
  category: string;
  type: string;
  description: string;
  highlights: string[];
  tech: string[];
  image: string;
  liveLink: string;
  githubLink?: string;
  extraLinks?: { label: string; href: string }[];
}

const featuredWorks: FeaturedWork[] = [
  {
    title: 'MaxStarter',
    category: 'Developer Tool',
    type: 'Open Source',
    description:
      'An opinionated Expo + React Native CLI starter I built and published on npm. Answer a few prompts and get a ready-to-build Expo app with routing, optional screens, theme tokens, icons, and a design.md apply workflow — without generator bloat overwriting your code.',
    highlights: [
      'Interactive CLI (npx maxstarter) with Expo SDK presets, screens, tabs, and auth stubs',
      'Centralized theme tokens, AppIcon abstraction, and ownership markers that protect your code',
      'design.md + logo apply workflow so visuals stay intentional after generation',
    ],
    tech: ['Expo', 'React Native', 'TypeScript', 'npm'],
    image: maxstarterImage,
    liveLink: 'https://maxstarter.vercel.app/',
    githubLink: 'https://github.com/Maxzovert/maxstarter',
    extraLinks: [{ label: 'npm', href: 'https://www.npmjs.com/package/maxstarter' }],
  },
  {
    title: 'Gitwork',
    category: 'AI/ML',
    type: 'Open Source',
    description:
      'An AI-powered GitHub collaboration workspace I built for teams to query codebases with RAG, review AI-generated commit and pull-request summaries, convert meeting recordings into GitHub issues, and generate onboarding documentation — all in one unified platform.',
    highlights: [
      'Branch-aware source indexing with 768-dim pgvector embeddings and incremental re-indexing',
      'File-grounded codebase Q&A using RAG + Google Gemini with relevant file references',
      'Meeting audio → AssemblyAI transcription → AI chapter extraction → GitHub issue drafts',
    ],
    tech: ['Next.js', 'tRPC', 'Prisma', 'pgvector', 'Gemini'],
    image: gitworkImage,
    liveLink: 'https://gitwork-mauve.vercel.app/',
    githubLink: 'https://github.com/Maxzovert/gitwork.git',
  },
  {
    title: 'WRITE-X',
    category: 'Web',
    type: 'Open Source',
    description:
      'A full-stack blogging platform I designed and built entirely on my own, from the writer-facing UI to the backend APIs and database layer. WriteX is built for creators who want a real space to share ideas, not content optimized for algorithms.',
    highlights: [
      'Solo end-to-end development, frontend, backend, auth, and content workflows',
      'Rich-text editing with TipTap, Supabase for data, and Gemini-powered features',
      'Deployed and maintained independently on Render',
    ],
    tech: ['React', 'TipTap', 'Supabase', 'Gemini'],
    image: writexImage,
    liveLink: 'https://writtex.onrender.com/',
    githubLink: 'https://github.com/Maxzovert/writex.git',
  },
  {
    title: 'Gawri Ganga',
    category: 'E-Commerce',
    type: 'Client',
    description:
      'Built and deployed Gawriganga, a production-grade e-commerce platform serving 15,000+ visitors using React.js, Node.js, PostgreSQL, and AWS.',
    highlights: [
      'Customer, admin, auth, inventory, order, and payment modules with RESTful APIs',
      'Integrated Easebuzz, Shiprocket, and AWS for payments, shipping, and infrastructure',
      'Reduced page load ~40% and AWS costs ~50% through optimization and CDN caching',
    ],
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'AWS'],
    image: gawriGangaImage,
    liveLink: 'https://www.gawriganga.com/',
  },
];

const getFeaturedSpan = (index: number, hovered: number | null) => {
  if (hovered === index) return { col: 2, row: 2 };
  return { col: 1, row: 1 };
};

const ModernFeatured = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
        gridRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
              The four projects that define my work — hover a card to expand. Open-source tools, AI systems, and shipped production platforms.
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

        <div
          ref={gridRef}
          className="featured-bento"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {featuredWorks.map((work, index) => {
            const isExpanded = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && !isExpanded;
            const { col, row } = getFeaturedSpan(index, hoveredIndex);

            return (
              <article
                key={work.title}
                className={`bento-card featured-bento-card ${isExpanded ? 'bento-card-expanded' : ''} ${isDimmed ? 'bento-card-dimmed' : ''}`}
                style={{
                  gridColumn: `span ${col}`,
                  gridRow: `span ${row}`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setHoveredIndex(null);
                  }
                }}
                tabIndex={0}
              >
                <div className="bento-card-media">
                  <img src={work.image} alt={work.title} className="bento-card-image" />
                </div>

                {!isExpanded && (
                  <div className="bento-card-label">
                    <p className="micro-label text-[var(--bg-paper)]/80 mb-1">{work.category}</p>
                    <h3 className="font-bebas text-lg sm:text-xl uppercase text-[var(--bg-paper)] leading-tight tracking-[0.04em]">
                      {work.title}
                    </h3>
                  </div>
                )}

                <div className={`bento-card-panel ${isExpanded ? 'bento-card-panel-visible' : ''}`}>
                  <div className="bento-card-panel-scroll">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="micro-label border border-[var(--blue)]/30 px-2 py-0.5 rounded-md text-[var(--blue)]">
                        {work.category}
                      </span>
                      <span className="micro-label border border-black/15 px-2 py-0.5 rounded-md text-charcoal">
                        {work.type}
                      </span>
                    </div>

                    <h3 className="font-bebas text-xl sm:text-2xl uppercase text-[var(--blue)] leading-tight tracking-[0.04em]">
                      {work.title}
                    </h3>

                    <p className="body-copy text-sm leading-[1.65] tracking-[0.02em] mt-2 text-charcoal">
                      {work.description}
                    </p>

                    {work.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1.5">
                        {work.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2 text-xs sm:text-sm text-charcoal leading-snug"
                          >
                            <span className="text-[var(--blue)] mt-0.5 flex-shrink-0">▹</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {work.tech.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 text-xs border border-black/20 rounded-md bg-[var(--gray-light)]/40 text-charcoal font-inter"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bento-card-actions">
                    <a
                      href={work.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bento-card-link bento-card-link-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Live
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    {work.extraLinks?.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bento-card-link bento-card-link-secondary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {link.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ))}
                    {work.githubLink && (
                      <a
                        href={work.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bento-card-link bento-card-link-secondary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-4 w-4" />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
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
