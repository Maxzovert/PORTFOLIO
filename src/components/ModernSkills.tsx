import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Database, 
  Server,
  Zap,
  Globe,
  Rocket
} from 'lucide-react';

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
      skills: ["React.js", "Next.js", "Tailwind CSS", "ShadCN"],
      gradient: "bg-gradient-cyber"
    },
    {
      title: "Backend Development",
      icon: Server,
      skills: ["Node.js", "Express.js"],
      gradient: "bg-gradient-primary"
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["Postgres", "MongoDB", "NoSQL"],
      gradient: "bg-gradient-dark"
    },
    {
      title: "Tools & Technologies",
      icon: Zap,
      skills: ["Git", "GitHub", "JWT", "Bcrypt", "Clerk", "Google Gemini API"],
      gradient: "bg-gradient-neon"
    },
    {
      title: "Deployment",
      icon: Rocket,
      skills: ["Vercel", "Render", "AWS"],
      gradient: "bg-gradient-cyber"
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className="section-padding dark-section relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        <div className="text-left mb-12 sm:mb-16 md:mb-20 px-2">
          <h2 ref={titleRef} className="section-title section-title-light text-left leading-none">
            STRENGTHS
          </h2>
          <p className="body-copy mt-4 max-w-xl text-[var(--gray-mid)]">
            A comprehensive toolkit of technologies and frameworks I use to bring ideas to life
          </p>
        </div>

        {/* Skills grid */}
        <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 group transition-all duration-300 relative"
            >
              <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                <div className="p-2.5 sm:p-3 border border-white/30 group-hover:border-[var(--bg-paper)] transition-colors mr-3 sm:mr-4 flex-shrink-0">
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
                    className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border border-white/20 text-[var(--gray-mid)] hover:border-[var(--bg-paper)] hover:text-[var(--bg-paper)] transition-all duration-200 font-inter"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="editorial-divider absolute bottom-0 left-0 opacity-30" />
    </section>
  );
};

export default ModernSkills;

