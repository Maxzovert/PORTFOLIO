import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

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
      title: "MERN Stack Developer (Frontend-Focused)",
      company: "Metaarth Finserv Pvt. Ltd.",
      location: "Delhi, India",
      type: "Full-time",
      period: "Sep 2024 – Nov 2024",
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
    <section ref={sectionRef} id="experience" className="section-padding relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent"></div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8">
            <span className="neon-text">WORK</span>{' '}
            <span className="cyber-text font-mono" data-text="EXPERIENCE">EXPERIENCE</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light px-4">
            My professional journey and the projects I've contributed to
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"></div>

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-12 sm:pl-16 md:pl-20">
                {/* Timeline dot */}
                <div className={`absolute left-2 sm:left-6 md:left-10 top-6 w-4 h-4 sm:w-5 sm:h-5 rounded-full ${exp.gradient} border-4 border-background shadow-neon`}></div>

                {/* Experience card */}
                <div className="glass-card p-6 sm:p-8 group hover:border-primary/50 transition-all duration-500">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
                    <div className="flex-1 mb-3 sm:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <h3 className="text-xl sm:text-2xl font-bold text-glow">
                          {exp.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-muted-foreground text-sm sm:text-base">
                        <span className="flex items-center gap-1">
                          <span className="font-semibold text-foreground">{exp.company}</span>
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <span className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-lg font-mono border border-primary/30">
                        {exp.type}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-muted/50 rounded-lg text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-200 font-mono border border-muted/30 hover:border-primary/30"
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

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </section>
  );
};

export default ModernExperience;

