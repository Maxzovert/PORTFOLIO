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
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8">
            <span className="neon-text">SKILLS</span>{' '}
            <span className="cyber-text font-mono" data-text="& EXPERTISE">& EXPERTISE</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light px-4">
            A comprehensive toolkit of technologies and frameworks I use to bring ideas to life
          </p>
        </div>

        {/* Skills grid */}
        <div ref={skillsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="glass-card p-6 sm:p-8 group hover:border-primary/50 transition-all duration-500 relative"
            >
              {/* Category header */}
              <div className="flex items-center mb-4 sm:mb-6">
                <div className={`p-3 sm:p-4 rounded-2xl ${category.gradient} group-hover:scale-110 transition-transform duration-300 mr-4`}>
                  <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-glow">
                  {category.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs sm:text-sm bg-muted/50 rounded-lg text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-200 font-mono border border-muted/30 hover:border-primary/30"
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

