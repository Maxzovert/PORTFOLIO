import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, Plus, Smartphone, Sparkles } from 'lucide-react';
import SectionDecorations from './SectionDecorations';
import writexImage from '@/assets/Writex.png';
import thryveImage from '@/assets/thryve.png';
import medRemImage from '@/assets/Medrem.png';
import snapNotesImage from '@/assets/Snapnotes.png';
import resolviaImage from '@/assets/Resolvia.jpg';
import LitChatImage from '@/assets/LitChat.png';
import gawriGangaImage from '@/assets/Gawri Ganga.png';
import legaloidsImage from '@/assets/Legaloids.png';
import metamicrodigitalImage from '@/assets/Metamicrodigital.png';
import tobedoneImage from '@/assets/TOBEDONE.jpeg';
import vcrmImage from '@/assets/vcrm.png';

gsap.registerPlugin(ScrollTrigger);

type ProjectType = 'Personal' | 'Client' | 'Verience';

interface Project {
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tech: string[];
  image: string;
  liveLink: string;
  liveLabel?: string;
  githubLink?: string;
  extraLinks?: { label: string; href: string; icon?: 'android' }[];
  type: ProjectType;
  featured?: boolean;
}

const getBentoSpan = (index: number, hovered: number | null) => {
  if (hovered === index) return { col: 2, row: 2 };
  return { col: 1, row: 1 };
};

const ModernProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const personalProjects: Project[] = [
    {
      title: 'WRITE-X',
      category: 'Web',
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
      type: 'Personal',
      featured: true,
    },
    {
      title: 'Thryve',
      category: 'Web',
      description:
        'An AI-powered learning management system I built solo from scratch using Next.js. I handled the full product flow, course creation, AI content generation, user authentication, payments, and the complete responsive UI.',
      highlights: [
        'Built entirely on my own: frontend, backend logic, database, and integrations',
        'Google Gemini for AI-generated course content and learning assistance',
        'Clerk authentication and Stripe payments wired into a production-ready LMS',
        'Deployed on Vercel with a clean Tailwind + ShadCN interface',
      ],
      tech: ['Next.js', 'Postgres', 'Clerk', 'Stripe'],
      image: thryveImage,
      liveLink: 'https://thryve-orpin.vercel.app/',
      githubLink: 'https://github.com/Maxzovert/thryve.git',
      type: 'Personal',
      featured: true,
    },
    {
      title: 'Resolvia',
      category: 'AI/ML',
      description:
        'An AI-powered helpdesk platform I developed end-to-end on my own. Resolvia uses agentic triage to classify support tickets, draft replies, manage a knowledge base, and deliver a role-based workflow with full audit logs.',
      highlights: [
        'Solo full-stack build, architecture, APIs, admin panel, and AI pipeline',
        'Automated ticket classification and AI-drafted responses using Google Gemini',
        'Role-based access, knowledge base management, and complete audit trail',
      ],
      tech: ['Next.js', 'Gemini', 'RB Auth', 'MongoDB'],
      image: resolviaImage,
      liveLink: 'https://github.com/Maxzovert/Resolvia.git',
      githubLink: 'https://github.com/Maxzovert/Resolvia.git',
      type: 'Personal',
      featured: true,
    },
    {
      title: 'MED-REM',
      category: 'Mobile',
      description:
        'A privacy-first medication tracking app I designed and built on my own using React Native and Expo. The focus was on helping users stay consistent with health routines through a simple, trustworthy mobile experience.',
      highlights: [
        'Solo mobile development, UI, state management, reminders, and Android build',
        'Privacy-first approach with a clean, distraction-free interface',
        'Built to make daily medication tracking fast and reliable',
      ],
      tech: ['React Native', 'Expo', 'CSS', 'Android'],
      image: medRemImage,
      liveLink: 'https://github.com/Maxzovert/med-rem.git',
      githubLink: 'https://github.com/Maxzovert/med-rem.git',
      type: 'Personal',
    },
    {
      title: 'SnapNotes',
      category: 'Web',
      description:
        'A secure notes application I built solo on the MERN stack. I implemented JWT-based authentication, full CRUD operations, title-based search, Mongoose schema modeling, and tested REST APIs, everything from database to UI.',
      highlights: [
        'End-to-end solo build with React frontend and Node/Express backend',
        'Secure auth, note management, and search functionality',
        'REST API design with MongoDB and Mongoose',
      ],
      tech: ['React', 'MongoDB', 'Express', 'Node.js'],
      image: snapNotesImage,
      liveLink: 'https://github.com/Maxzovert/snapnotes.git',
      githubLink: 'https://github.com/Maxzovert/snapnotes.git',
      type: 'Personal',
    },
    {
      title: 'LitChat',
      category: 'Web',
      description:
        'A real-time chat application I built entirely on my own with React, Node, Express, and Socket.io. I handled messaging, authentication, media uploads, and deployment, delivering a fast, clean chat experience.',
      highlights: [
        'Solo full-stack development with real-time Socket.io messaging',
        'Secure authentication and Cloudinary-powered media handling',
        'Fully deployed on Render with a responsive Tailwind UI',
      ],
      tech: ['React.js', 'Socket.io', 'MongoDB', 'CSS'],
      image: LitChatImage,
      liveLink: 'https://github.com/Maxzovert/LitChat.git',
      githubLink: 'https://github.com/Maxzovert/LitChat.git',
      type: 'Personal',
    },
  ];

  const verienceProjects: Project[] = [
    {
      title: 'TOBEDONE',
      category: 'Project Management',
      description:
        'Verience\'s in-house project management platform, built as a React Native app and web app. We designed it so our team can assign tasks to employees, track progress, and pull reports in a few clicks, without jumping between separate tools for chat, tasks, and updates.',
      highlights: [
        'Built in-house to replace multiple apps with one workflow for tasks, chat, and reporting',
        'Actively used daily by the Verience team for project management and internal operations',
        'Group tasks and individual tasks with employee assignment and quick status reports',
        'In-app chat where tasks can be created and assigned directly from conversations',
      ],
      tech: ['React Native', 'React', 'Node.js', 'Web App'],
      image: tobedoneImage,
      liveLink: 'https://tobedone-app.vercel.app/home',
      liveLabel: 'Web App',
      extraLinks: [
        {
          label: 'Android',
          href: 'https://expo.dev/accounts/maxzovert/projects/tobedone/builds/a1f86ea3-cc5b-48f0-9e82-784e565e93d1',
          icon: 'android',
        },
      ],
      type: 'Verience',
      featured: true,
    },
    {
      title: 'VCRM',
      category: 'CRM',
      description:
        'Verience\'s own CRM, built with Next.js and PostgreSQL. Instead of stitching together separate tools for email, follow-ups, invoices, and payments, we built one system tailored to how we actually work with clients.',
      highlights: [
        'Custom CRM built to keep sales, follow-ups, billing, and client communication in one place',
        'Actively used daily by the Verience team for client follow-ups, invoices, and payments',
        'Send personalised emails to clients and manage follow-up schedules from a single dashboard',
        'Next.js frontend with PostgreSQL for reliable data and a fast, polished admin experience',
      ],
      tech: ['Next.js', 'PostgreSQL', 'Tailwind', 'TypeScript'],
      image: vcrmImage,
      liveLink: 'https://vs-crm-nine.vercel.app/',
      type: 'Verience',
      featured: true,
    },
  ];

  const clientProjects: Project[] = [
    {
      title: 'Gawri Ganga',
      category: 'E-Commerce',
      description:
        'Built and deployed Gawriganga, a production-grade e-commerce platform serving 15,000+ visitors using React.js, Node.js, PostgreSQL, and AWS.',
      highlights: [
        'Developed customer, admin, authentication, inventory, order, and payment modules with RESTful APIs',
        'Integrated Easebuzz, Shiprocket, and AWS services for payments, shipping, and cloud infrastructure',
        'Reduced initial page load time by ~40% through lazy loading, image optimization, API tuning, and CDN caching',
        'Reduced AWS infrastructure costs by ~50% through resource optimization and efficient cloud configuration',
      ],
      tech: ['React.js', 'Node.js', 'PostgreSQL', 'AWS', 'Easebuzz', 'Shiprocket'],
      image: gawriGangaImage,
      liveLink: 'https://www.gawriganga.com/',
      type: 'Client',
      featured: true,
    },
    {
      title: 'Legaloids',
      category: 'Law Firm',
      description:
        'A professional law firm website I designed and developed on my own for Legaloids. I built the full frontend experience, practice area pages, team profiles, contact flows, and a trustworthy brand presence tailored for legal client inquiries.',
      highlights: [
        'Solo development from design to deployment, no team, built end-to-end by me',
        'Clean, credible UI with structured practice areas and lead-capture contact flows',
        'Responsive layout optimized for mobile and desktop visitors',
        'Deployed on Vercel with fast load times and production-ready performance',
      ],
      tech: ['React', 'Tailwind', 'Vercel'],
      image: legaloidsImage,
      liveLink: 'https://legaloids.com/',
      type: 'Client',
      featured: true,
    },
    {
      title: 'Meta Micro Digital',
      category: 'Corporate',
      description:
        'The official company website for Meta Micro Digital, built entirely by me. I created a modern corporate landing with services, about, and contact sections, focused on clarity, brand positioning, and converting visitors into inquiries.',
      highlights: [
        'Solo build, strategy, UI design, frontend development, and deployment',
        'Structured service showcase with clear CTAs and contact integration',
        'Polished responsive design aligned with the company brand',
        'Live on Vercel with optimized performance and maintainable codebase',
      ],
      tech: ['React', 'Tailwind', 'Vercel'],
      image: metamicrodigitalImage,
      liveLink: 'https://metamicrodigital.com/',
      type: 'Client',
      featured: true,
    },
  ];

  const filters = ['All', 'Clients', 'Personal', 'Verience'] as const;

  const filteredProjects =
    activeFilter === 'Personal'
      ? personalProjects
      : activeFilter === 'Clients'
        ? clientProjects
        : activeFilter === 'Verience'
          ? verienceProjects
          : [...clientProjects, ...personalProjects, ...verienceProjects];

  const sectionSubtitle =
    activeFilter === 'Personal'
      ? 'Personal projects, exploring technology through creativity, performance, and user experience.'
      : activeFilter === 'Clients'
        ? 'Client and freelancing work, websites and platforms delivered for businesses and brands.'
        : activeFilter === 'Verience'
          ? 'In-house products built at Verience Studio, our own tools for project management, CRM, and daily operations.'
          : 'A full showcase of Verience builds, client work, and personal projects, from shipped products to experimental ideas.';

  const scriptLabel =
    activeFilter === 'Personal'
      ? 'Builds'
      : activeFilter === 'Clients'
        ? 'Clients'
        : activeFilter === 'Verience'
          ? 'Verience'
          : 'All Work';

  const handleFilterClick = (filterName: string) => {
    setActiveFilter(filterName);
    setHoveredIndex(null);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        filterRef.current?.children,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: filterRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        showcaseRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding paper-bg relative overflow-hidden">
      <SectionDecorations variant="projects" />

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        <div className="text-left mb-8 sm:mb-10 md:mb-12 relative">
          <div className="flex items-start justify-between gap-4">
            <h2 ref={titleRef} className="section-title text-left">
              PROJECTS
            </h2>
            <span className="star-symbol mt-4 hidden text-3xl opacity-80 md:block">✱</span>
          </div>
          <span className="script-word absolute right-[5%] top-[18%] hidden md:block rotate-[-6deg] text-5xl">
            {scriptLabel}
          </span>
          <div className="mt-2 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-editorial-blue opacity-60 rotate-[-8deg]" strokeWidth={1.5} />
            <p className="body-copy max-w-xl">{sectionSubtitle}</p>
          </div>
          <Plus className="absolute left-[2%] top-[72%] hidden h-5 w-5 text-charcoal/45 lg:block rotate-[-18deg]" strokeWidth={1.5} />
        </div>

        <div ref={filterRef} className="mb-8 sm:mb-10 inline-flex overflow-hidden rounded-xl border border-black">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-5 sm:px-8 py-3 micro-label transition-all duration-300 border-r border-black last:border-r-0 ${
                activeFilter === filter
                  ? 'bg-[var(--black)] text-[var(--bg-paper)]'
                  : 'bg-transparent text-[var(--charcoal)] hover:bg-[var(--gray-light)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div
          ref={showcaseRef}
          className="projects-bento"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {filteredProjects.map((project, index) => {
            const isExpanded = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && !isExpanded;
            const { col, row } = getBentoSpan(index, hoveredIndex);

            return (
              <article
                key={`${project.title}-${index}`}
                className={`bento-card ${isExpanded ? 'bento-card-expanded' : ''} ${isDimmed ? 'bento-card-dimmed' : ''}`}
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
                  <img
                    src={project.image}
                    alt={project.title}
                    className="bento-card-image"
                  />
                </div>

                {!isExpanded && (
                  <div className="bento-card-label">
                    <p className="micro-label text-[var(--bg-paper)]/80 mb-1">{project.category}</p>
                    <h3 className="font-bebas text-lg sm:text-xl uppercase text-[var(--bg-paper)] leading-tight tracking-[0.04em]">
                      {project.title}
                    </h3>
                  </div>
                )}

                <div className={`bento-card-panel ${isExpanded ? 'bento-card-panel-visible' : ''}`}>
                  <div className="bento-card-panel-scroll">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="micro-label border border-[var(--blue)]/30 px-2 py-0.5 rounded-md text-[var(--blue)]">
                        {project.category}
                      </span>
                      <span className="micro-label border border-black/15 px-2 py-0.5 rounded-md text-charcoal">
                        {project.type}
                      </span>
                    </div>

                    <h3 className="font-bebas text-xl sm:text-2xl uppercase text-[var(--blue)] leading-tight tracking-[0.04em]">
                      {project.title}
                    </h3>

                    <p className="body-copy text-sm leading-[1.65] tracking-[0.02em] mt-2 text-charcoal">
                      {project.description}
                    </p>

                    {project.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1.5">
                        {project.highlights.slice(0, 3).map((highlight) => (
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
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs border border-black/20 rounded-md bg-[var(--gray-light)]/40 text-charcoal font-inter"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bento-card-actions">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bento-card-link bento-card-link-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.liveLabel ?? 'View Live'}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    {project.extraLinks?.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bento-card-link bento-card-link-secondary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {link.icon === 'android' ? (
                          <Smartphone className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                        {link.label}
                      </a>
                    ))}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
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

        <div className="text-left mt-10 sm:mt-12">
          <a
            href="https://github.com/Maxzovert"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-btn editorial-btn-dark inline-flex"
          >
            <Github className="h-4 w-4" />
            Explore All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ModernProjects;
