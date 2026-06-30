import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, Award, MapPin, ArrowUpRight, Plus, Sparkles } from 'lucide-react';
import SectionDecorations from './SectionDecorations';

gsap.registerPlugin(ScrollTrigger);

const ModernEducation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

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

      // Education cards animation
      gsap.fromTo(educationRef.current?.children,
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
            amount: 0.6,
            from: "start"
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: educationRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const education = [
    {
      degree: "Bachelor of Computer Applications",
      field: "Computer Applications",
      institution: "Management Education and Research Institute, IP University",
      location: "Delhi, India",
      period: "2022 - 2025",
      gpa: "CGPA: 7.7",
      achievements: [
        "Specialized in web development and software engineering",
        "Completed projects using MERN stack technologies"
      ],
      gradient: "bg-gradient-neon"
    },
    {
      degree: "Senior Secondary (12th)",
      field: "General Studies",
      institution: "GOVT Sarvodaya Bal Vidyalaya, Rajgarh Colony",
      location: "Delhi, India",
      period: "2022",
      gpa: "Percentage: 62%",
      achievements: [],
      gradient: "bg-gradient-cyber"
    }
  ];

  return (
    <section ref={sectionRef} id="education" className="section-padding dark-section relative overflow-hidden">
      <SectionDecorations variant="education" light />

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        <div className="text-left mb-12 sm:mb-16 md:mb-20 relative">
          <div className="flex items-start justify-between gap-4">
            <h2 ref={titleRef} className="section-title section-title-light text-left">
              EDUCATION
            </h2>
            <span className="star-symbol-light mt-4 hidden text-3xl md:block">✱</span>
          </div>
          <span className="script-word-light absolute right-[5%] top-[20%] hidden md:block rotate-[-5deg]">
            Learning
          </span>
          <div className="mt-2 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[var(--bg-paper)] opacity-50 rotate-[8deg]" strokeWidth={1.5} />
            <p className="body-copy max-w-lg text-[var(--gray-mid)]">
              Academic background and continuous learning journey
            </p>
          </div>
          <div className="mt-4 hidden sm:inline-flex items-center gap-2 border border-white/25 bg-white/5 px-3 py-2 rounded-lg rotate-[3deg]">
            <ArrowUpRight className="h-4 w-4 text-[var(--bg-paper)] opacity-80" strokeWidth={1.5} />
            <span className="micro-label text-[var(--bg-paper)] opacity-90">Academics</span>
          </div>
          <Plus className="absolute left-[3%] top-[65%] hidden h-5 w-5 text-[var(--bg-paper)] opacity-35 lg:block rotate-[-20deg]" strokeWidth={1.5} />
        </div>

        {/* Education grid */}
        <div ref={educationRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 group hover:border-white/40 transition-all duration-500 relative h-full"
            >
              {/* Icon and degree */}
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                <div className="p-2.5 sm:p-3 md:p-3.5 lg:p-4 border border-white/30 bg-white/5 group-hover:border-[var(--bg-paper)] transition-all duration-300 flex-shrink-0 rounded-md">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[var(--bg-paper)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bebas text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-[0.04em] text-[var(--bg-paper)] mb-1 sm:mb-1.5 break-words leading-[1.05]">
                    {edu.degree}
                  </h3>
                  <p className="text-[var(--gray-mid)] text-xs sm:text-sm md:text-base font-inter tracking-[0.03em] mb-1 sm:mb-2 break-words">
                    {edu.field}
                  </p>
                </div>
              </div>

              {/* Institution and location */}
              <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 space-y-1.5 sm:space-y-2">
                <div className="flex items-start gap-2.5 text-[var(--gray-mid)]">
                  <span className="mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center border border-white/20 bg-white/5 flex-shrink-0 rounded-sm">
                    <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[var(--bg-paper)]" />
                  </span>
                  <span className="font-semibold text-[var(--bg-paper)] text-xs sm:text-sm md:text-base break-words leading-relaxed tracking-[0.02em]">{edu.institution}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm md:text-base text-[var(--gray-mid)] tracking-[0.02em]">
                  <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center border border-white/20 bg-white/5 flex-shrink-0 rounded-sm">
                    <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[var(--bg-paper)]" />
                  </span>
                  <span className="break-words">{edu.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm md:text-base text-[var(--gray-mid)] tracking-[0.02em]">
                  <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center border border-white/20 bg-white/5 flex-shrink-0 rounded-sm">
                    <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[var(--bg-paper)]" />
                  </span>
                  <span>{edu.period}</span>
                </div>
                {edu.gpa && (
                  <div className="text-xs sm:text-sm md:text-base pt-1">
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 border border-white/25 text-[var(--bg-paper)] inline-block break-words font-inter tracking-[0.04em] rounded-md">
                      {edu.gpa}
                    </span>
                  </div>
                )}
              </div>

              {/* Achievements */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div className="mt-auto">
                  <h4 className="micro-label text-[var(--bg-paper)] mb-2 sm:mb-3 tracking-[0.12em]">Highlights</h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm md:text-base text-[var(--gray-mid)]">
                        <span className="text-[var(--bg-paper)] mt-1 sm:mt-1.5 flex-shrink-0">▹</span>
                        <span className="break-words leading-relaxed tracking-[0.02em]">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernEducation;

