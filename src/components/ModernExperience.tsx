import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ExternalLink, ArrowUpRight, Plus, Sparkles } from 'lucide-react';
import SectionDecorations from './SectionDecorations';

gsap.registerPlugin(ScrollTrigger);

const ModernExperience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      // Timeline items animation
      gsap.fromTo(timelineRef.current?.children,
        { 
          opacity: 0,
          x: -100,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: "start"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      title: "Founder",
      company: "Verience Media and Technology",
      companyUrl: "https://veriencestudio.com",
      location: "India",
      type: "Founder",
      period: "2025 – Present",
      description: "Founded Verience Media and Technology to build digital products, deliver modern web experiences, and work across design, development, and technology strategy.",
      achievements: [
        "Leading product direction, development workflows, and delivery standards",
        "Building a strong foundation across web development, branding, and digital execution",
        "Managing client requirements, technical planning, and end-to-end implementation"
      ],
      technologies: ["React.js", "Next.js", "Node.js", "Tailwind CSS", "Branding", "Product Strategy"],
      gradient: "bg-gradient-cyber"
    },
    {
      title: "MERN Stack Developer (Frontend-Focused)",
      company: "Metaarth Finserv Pvt. Ltd.",
      location: "Delhi, India",
      type: "Full-time",
      period: "Sep 2024 – 10 Jul 2025",
      description: "Worked as a frontend-focused MERN stack developer, contributing to multiple projects and improving UI/UX across various web applications.",
      achievements: [
        "Improved UI and fixed minor bugs on the Meta Grow company website",
        "Handled the frontend development and supported backend dashboard updates for the Gym Management Website",
        "Performed bug fixes and UI enhancements in the Attendance Management System",
        "Resolved issues and improved UI for the Employee Field Sales Tracker System",
        "Collaborated with the team to enhance performance, design consistency, and code quality across projects"
      ],
      technologies: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "ShadCN"],
      gradient: "bg-gradient-neon"
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="section-padding paper-bg relative overflow-hidden">
      <SectionDecorations variant="experience" />

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        <div className="text-left mb-12 sm:mb-16 md:mb-20 relative">
          <div className="flex items-start justify-between gap-4">
            <h2 ref={titleRef} className="section-title text-left">
              EXPERIENCE
            </h2>
            <span className="star-symbol mt-4 hidden text-3xl opacity-80 md:block">✱</span>
          </div>
          <div className="mt-2 flex items-end gap-4">
            <span className="script-word relative z-10 rotate-[3deg] text-4xl sm:text-5xl md:text-6xl">Journey</span>
            <Sparkles className="mb-2 hidden h-6 w-6 text-editorial-blue opacity-70 md:block" strokeWidth={1.5} />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <p className="body-copy max-w-lg">My professional journey and the projects I've contributed to</p>
            <div className="hidden lg:flex items-center gap-2 border border-black/15 bg-white px-3 py-2 rounded-lg rotate-[-2deg]">
              <ArrowUpRight className="h-4 w-4 text-charcoal" strokeWidth={1.5} />
              <span className="micro-label text-charcoal">Work History</span>
            </div>
          </div>
          <Plus className="absolute right-[12%] top-[55%] hidden h-6 w-6 text-charcoal/50 md:block rotate-12" strokeWidth={1.5} />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line - hidden on very small screens */}
          <div className="hidden sm:block absolute left-4 md:left-6 lg:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"></div>

          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-0 sm:pl-12 md:pl-16 lg:pl-20">
                {/* Timeline dot - hidden on very small screens */}
                <div className={`hidden sm:block absolute left-2 md:left-4 lg:left-10 top-4 md:top-6 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full ${exp.gradient} border-2 md:border-3 lg:border-4 border-background shadow-neon`}></div>

                {/* Experience card */}
                <div className="glass-card p-5 sm:p-6 md:p-7 lg:p-8 group hover:border-primary/50 transition-all duration-500">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 sm:mb-5 md:mb-6 gap-3 md:gap-0">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                          <h3 className="font-bebas text-xl sm:text-2xl md:text-3xl uppercase text-[var(--blue)] break-words leading-[1.1] tracking-[0.04em]">
                            {exp.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 md:gap-5 text-muted-foreground text-sm sm:text-base leading-relaxed tracking-[0.02em]">
                        <span className="flex items-center gap-1.5">
                          {'companyUrl' in exp && exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-foreground break-words tracking-[0.015em] hover:text-[var(--blue)] transition-colors inline-flex items-center gap-1.5"
                            >
                              {exp.company}
                              <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
                            </a>
                          ) : (
                            <span className="font-semibold text-foreground break-words tracking-[0.015em]">{exp.company}</span>
                          )}
                        </span>
                        <span className="hidden sm:inline text-charcoal/40">•</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="break-words tracking-[0.02em]">{exp.location}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col sm:items-start md:items-end gap-3 sm:gap-3">
                      <span className="micro-label px-3 py-1.5 border border-black/15 bg-white text-charcoal whitespace-nowrap tracking-[0.1em] rounded-md">
                        {exp.type}
                      </span>
                      <span className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap tracking-[0.02em]">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>{exp.period}</span>
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-inter text-muted-foreground mb-6 sm:mb-7 leading-[1.85] tracking-[0.02em] text-sm sm:text-base">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-5 sm:mb-6 md:mb-7">
                    <h4 className="micro-label text-[var(--blue)] mb-4 sm:mb-5 tracking-[0.12em]">Key Achievements</h4>
                    <ul className="space-y-4 sm:space-y-5">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 sm:gap-4">
                          <span className="text-primary mt-1 flex-shrink-0 text-sm">▹</span>
                          <span className="font-inter text-sm sm:text-base text-primary leading-[1.9] tracking-[0.025em] break-words">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-inter tracking-[0.04em] border border-black/15 rounded-md text-charcoal hover:border-[var(--blue)] hover:text-[var(--blue)] transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernExperience;

