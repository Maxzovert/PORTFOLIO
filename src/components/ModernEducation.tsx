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
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8">
            <span className="neon-text">EDUCATION</span>{' '}
            <span className="cyber-text font-mono" data-text="& QUALIFICATIONS">& QUALIFICATIONS</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light px-4">
            Academic background and continuous learning journey
          </p>
        </div>

        {/* Education grid */}
        <div ref={educationRef} className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="glass-card p-6 sm:p-8 group hover:border-primary/50 transition-all duration-500 relative"
            >
              {/* Icon and degree */}
              <div className="flex items-start gap-4 mb-4 sm:mb-6">
                <div className={`p-3 sm:p-4 rounded-2xl ${edu.gradient} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-background" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-glow mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-primary text-sm sm:text-base font-medium mb-2">
                    {edu.field}
                  </p>
                </div>
              </div>

              {/* Institution and location */}
              <div className="mb-4 sm:mb-6 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">{edu.institution}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{edu.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{edu.period}</span>
                </div>
                {edu.gpa && (
                  <div className="text-sm">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg font-mono border border-primary/30 inline-block">
                      {edu.gpa}
                    </span>
                  </div>
                )}
              </div>

              {/* Achievements */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Highlights:</h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1.5">▹</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Additional certifications section (optional) */}

      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </section>
  );
};

export default ModernEducation;

