import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Database, 
  Server,
  Zap,
  Globe,
  Rocket,
  ArrowUpRight,
  Plus,
  Sparkles,
} from 'lucide-react';
import SectionDecorations from './SectionDecorations';

gsap.registerPlugin(ScrollTrigger);

const ModernSkills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { 
          opacity: 0,
          y: 100,
          skewY: 5
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Skills animation with stagger
      gsap.fromTo(skillsRef.current?.children,
        { 
          opacity: 0,
          y: 60,
          rotationX: -15,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.8,
            from: "start"
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: "Languages",
      icon: Code2,
      skills: ["JavaScript", "HTML", "CSS"],
      gradient: "bg-gradient-neon"
    },
    {
      title: "Frontend Development",
      icon: Globe,
      skills: ["React.js", "Next.js", "Tailwind CSS", "shadcn/ui", "Bootstrap", "Framer Motion", "Radix UI"],
      gradient: "bg-gradient-cyber"
    },
    {
      title: "Backend Development",
      icon: Server,
      skills: ["Node.js", "Express.js", "REST APIs"],
      gradient: "bg-gradient-primary"
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["PostgreSQL", "MongoDB", "Supabase", "Prisma"],
      gradient: "bg-gradient-dark"
    },
    {
      title: "Tools & Technologies",
      icon: Zap,
      skills: [
        "Git",
        "GitHub",
        "Postman",
        "VS Code",
        "npm",
        "Vite",
        "GitHub Actions",
        "Cursor",
        "Clerk",
        "JWT",
        "Bcrypt",
        "Google Gemini API",
        "Stripe",
        "Easebuzz",
        "Shiprocket",
      ],
      gradient: "bg-gradient-neon"
    },
    {
      title: "DevOps & Deployment",
      icon: Rocket,
      skills: ["Vercel", "Render", "AWS", "Cloudflare", "Docker", "Nginx", "CI/CD"],
      gradient: "bg-gradient-cyber"
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className="section-padding dark-section relative overflow-hidden">
      <SectionDecorations variant="skills" light />

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        <div className="text-left mb-12 sm:mb-16 md:mb-20 px-2 relative">
          <div className="flex items-start justify-between gap-4">
            <h2 ref={titleRef} className="section-title section-title-light text-left leading-none">
              STRENGTHS
            </h2>
            <span className="star-symbol-light mt-4 hidden text-3xl md:block">✱</span>
          </div>
          <span className="script-word-light absolute right-[4%] top-[22%] hidden md:block rotate-[5deg]">
            Toolkit
          </span>
          <div className="mt-2 flex items-center gap-3 flex-nowrap overflow-x-auto">
            <Sparkles className="h-5 w-5 flex-shrink-0 text-[var(--bg-paper)] opacity-50 rotate-[-10deg]" strokeWidth={1.5} />
            <p className="body-copy text-[var(--gray-mid)] whitespace-nowrap">
              A comprehensive toolkit of technologies and frameworks I use to bring ideas to life
            </p>
          </div>
          <div className="mt-4 hidden sm:inline-flex items-center gap-2 border border-white/25 bg-white/5 px-3 py-2 rounded-lg rotate-[-2deg]">
            <ArrowUpRight className="h-4 w-4 text-[var(--bg-paper)] opacity-80" strokeWidth={1.5} />
            <span className="micro-label text-[var(--bg-paper)] opacity-90">Tech Stack</span>
          </div>
          <Plus className="absolute right-[18%] top-[58%] hidden h-5 w-5 text-[var(--bg-paper)] opacity-40 lg:block rotate-[15deg]" strokeWidth={1.5} />
        </div>

        {/* Skills grid */}
        <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 group transition-all duration-300 relative"
            >
              <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                <div className="p-2.5 sm:p-3 border border-white/30 group-hover:border-[var(--bg-paper)] transition-colors mr-3 sm:mr-4 flex-shrink-0 rounded-md">
                  <category.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[var(--bg-paper)]" />
                </div>
                <h3 className="font-bebas text-lg sm:text-xl uppercase tracking-tight text-[var(--bg-paper)]">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border border-white/20 rounded-md text-[var(--gray-mid)] hover:border-[var(--bg-paper)] hover:text-[var(--bg-paper)] transition-all duration-200 font-inter"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernSkills;

