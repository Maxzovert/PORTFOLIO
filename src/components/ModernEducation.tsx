import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';

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
    <section ref={sectionRef} id="education" className="section-padding relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 px-2">
          <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
            <span className="neon-text block sm:inline">EDUCATION</span>
            <span className="hidden sm:inline"> </span>
            <br className="sm:hidden" />
            <span className="cyber-text font-mono block sm:inline mt-1 sm:mt-0" data-text="& QUALIFICATIONS">& QUALIFICATIONS</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-light px-2 sm:px-4">
            Academic background and continuous learning journey
          </p>
        </div>

        {/* Education grid */}
        <div ref={educationRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 group hover:border-primary/50 transition-all duration-500 relative h-full"
            >
              {/* Icon and degree */}
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                <div className={`p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl ${edu.gradient} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-glow mb-1 sm:mb-1.5 break-words leading-tight">
                    {edu.degree}
                  </h3>
                  <p className="text-primary text-xs sm:text-sm md:text-base font-medium mb-1 sm:mb-2 break-words">
                    {edu.field}
                  </p>
                </div>
              </div>

              {/* Institution and location */}
              <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 space-y-1.5 sm:space-y-2">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Award className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-foreground text-xs sm:text-sm md:text-base break-words leading-relaxed">{edu.institution}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-muted-foreground">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="break-words">{edu.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-muted-foreground">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>{edu.period}</span>
                </div>
                {edu.gpa && (
                  <div className="text-xs sm:text-sm md:text-base pt-1">
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-primary/20 text-primary rounded-md sm:rounded-lg font-mono border border-primary/30 inline-block break-words">
                      {edu.gpa}
                    </span>
                  </div>
                )}
              </div>

              {/* Achievements */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div className="mt-auto">
                  <h4 className="text-xs sm:text-sm md:text-base font-semibold text-foreground mb-2 sm:mb-3">Highlights:</h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm md:text-base text-muted-foreground">
                        <span className="text-primary mt-1 sm:mt-1.5 flex-shrink-0">▹</span>
                        <span className="break-words leading-relaxed">{achievement}</span>
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

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </section>
  );
};

export default ModernEducation;

