import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Database, 
  Server,
  Zap,
  Globe
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
      skills: ["MongoDB", "NoSQL"],
      gradient: "bg-gradient-dark"
    },
    {
      title: "Tools & Technologies",
      icon: Zap,
      skills: ["Git", "GitHub", "JWT", "Bcrypt", "Clerk", "Google Gemini API"],
      gradient: "bg-gradient-neon"
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className="section-padding relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 px-2">
          <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
            <span className="neon-text block sm:inline">SKILLS</span>
            <span className="hidden sm:inline"> </span>
            <br className="sm:hidden" />
            <span className="cyber-text font-mono block sm:inline mt-1 sm:mt-0" data-text="& EXPERTISE">& EXPERTISE</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-light px-2 sm:px-4">
            A comprehensive toolkit of technologies and frameworks I use to bring ideas to life
          </p>
        </div>

        {/* Skills grid */}
        <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 group hover:border-primary/50 transition-all duration-500 relative"
            >
              {/* Category header */}
              <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                <div className={`p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl ${category.gradient} group-hover:scale-110 transition-transform duration-300 mr-3 sm:mr-4 flex-shrink-0`}>
                  <category.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="font-bold text-base sm:text-lg md:text-xl text-glow break-words">
                  {category.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-muted/50 rounded-md sm:rounded-lg text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-200 font-mono border border-muted/30 hover:border-primary/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </section>
  );
};

export default ModernSkills;

