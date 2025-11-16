import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Play, Star } from 'lucide-react';
import writexImage from '@/assets/Writex.png';
import thryveImage from '@/assets/thryve.png';
import medRemImage from '@/assets/Medrem.png';
import snapNotesImage from '@/assets/Snapnotes.png';
import resolviaImage from '@/assets/Resolvia.jpg';
import LitChatImage from '@/assets/LitChat.png';

gsap.registerPlugin(ScrollTrigger);

const ModernProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { 
          opacity: 0,
          y: 100,
          rotationX: -15 
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
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

      // Filter animation
      gsap.fromTo(filterRef.current?.children,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: filterRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Projects animation with 3D effect
      gsap.fromTo(projectsRef.current?.children,
        { 
          opacity: 0,
          y: 80,
          rotationY: -15,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          stagger: {
            amount: 0.8,
            grid: [2, 3],
            from: "start"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Hover animations for project cards
      const projectCards = projectsRef.current?.children;
      if (projectCards) {
        Array.from(projectCards).forEach((card: any) => {
          const handleMouseEnter = () => {
            gsap.to(card, {
              rotationY: 5,
              rotationX: 5,
              z: 50,
              duration: 0.3,
              ease: "power2.out"
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotationY: 0,
              rotationX: 0,
              z: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.3)"
            });
          };

          card.addEventListener('mouseenter', handleMouseEnter);
          card.addEventListener('mouseleave', handleMouseLeave);
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate projects when filter changes
  useEffect(() => {
    if (projectsRef.current) {
      const projectCards = projectsRef.current.children;
      gsap.fromTo(Array.from(projectCards),
        { 
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [activeFilter]);

  const filters = [
    { name: "All" },
    { name: "Web" },
    { name: "Mobile" },
    { name: "AI/ML" }
  ];

  const handleFilterClick = (filterName: string) => {
    setActiveFilter(filterName);
  };

  const projects = [
    {
      title: "WRITE-X",
      category: "WEB",
      description: "Blogging website Created using the MERN stack. WriteX a real one for writers who vibe deep, not for algorithms. Share what hits different and connect with people who actually feel you",
      tech: ["React", "TipTap", "Supabase", "Gemini"],
      gradient: "bg-gradient-neon",
      featured: true,
      image: writexImage,
      liveLink: "https://writtex.onrender.com/",
      githubLink: "https://github.com/Maxzovert/writex.git"
    },
    {
      title: "Thryve",
      category: "Web",
      description: "AI-powered LMS Built using Next.js. Integrated Google Gemini for AI-generated content.Implemented Clerk for authentication and Stripe for payments. Designed with Tailwind CSS and ShadCN for responsive UI.",
      tech: ["Next.js", "Postgres", "Clerk", "Stripe"],
      gradient: "bg-gradient-cyber",
      featured: true,
      image: thryveImage,
      liveLink: "https://thryve-orpin.vercel.app/",
      githubLink: "https://github.com/Maxzovert/thryve.git"
    },
    {
      title: "Resolvia",
      category: "AI/ML",
      description: "Built Resolvia, an AI-powered helpdesk with agentic triage—designed end-to-end using MERN. It auto-classifies tickets, drafts replies, manages the knowledge base, and delivers a clean, role-based support workflow with full audit logs.",
      tech: ["Next.js", "Gemini", "RB Auth", "MongoDB"],
      gradient: "bg-gradient-neon",
      featured: true,
      image: resolviaImage,
      liveLink: "https://github.com/Maxzovert/Resolvia.git",
      githubLink: "https://github.com/Maxzovert/Resolvia.git"
    }, 
    {
      title: "MED-REM",
      category: "Mobile",
      description: "As part of honing my skills in mobile development, I built Med-Rem, a privacy-first, user-friendly medication tracking app designed to help users stay consistent with their health routines",
      tech: ["React Native", "Expo", "Css", "Android"],
      gradient: "bg-gradient-primary",
      featured: false,
      image: medRemImage,
      liveLink: "https://github.com/Maxzovert/med-rem.git",
      githubLink: "https://github.com/Maxzovert/med-rem.git"
    },
    {
      title: "SnapNotes",
      category: "Web",
      description: "MERN Stack Developed a secure notes app with JWT-based authentication. Enabled CRUD operations and title-based search. Used Mongoose for schema modeling and tested REST APIs.",
      tech: ["React", "MongoDB", "Express", "Node.js"],
      gradient: "bg-gradient-dark",
      featured: false,
      image: snapNotesImage,
      liveLink: "https://github.com/Maxzovert/snapnotes.git",
      githubLink: "https://github.com/Maxzovert/snapnotes.git"
    },
    {
      title: "LitChat",
      category: "Web",
      description: "LIT_CHAT, a real-time chat app using React, Tailwind, Node, Express, and Socket.io fully deployed on Render. It delivers fast messaging, secure auth, clean UI, and smooth media handling with Cloudinary.",
      tech: ["React.js", "Socket.io", "Mongodb", "Css"],
      stats: { stars: 945, forks: 123 },
      gradient: "bg-gradient-cyber",
      featured: false,
      image: LitChatImage,
      liveLink: "https://github.com/Maxzovert/LitChat.git",
      githubLink: "https://github.com/Maxzovert/LitChat.git"
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => 
        project.category.toLowerCase() === activeFilter.toLowerCase()
      );

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent"></div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8">
            <span className="neon-text">FEATURED</span>{' '}
            <span className="cyber-text font-mono" data-text="WORKS">WORKS</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light px-4">
            Exploring the boundaries of technology through innovative projects that blend 
            <span className="text-primary text-glow"> creativity</span>,{' '}
            <span className="text-secondary text-glow">performance</span>, and{' '}
            <span className="text-accent text-glow">user experience</span>
          </p>
        </div>

        {/* Filter tabs */}
        <div ref={filterRef} className="flex justify-center mb-8 sm:mb-12 md:mb-16 px-4">
          <div className="glass-card p-1.5 sm:p-2 flex flex-wrap sm:flex-nowrap gap-2 sm:space-x-2 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => handleFilterClick(filter.name)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                  activeFilter === filter.name
                    ? 'bg-primary text-primary-foreground shadow-neon'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div ref={projectsRef} className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`glass-card overflow-hidden group perspective-1000 ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Project preview */}
              <div className={`h-40 sm:h-44 md:h-48 ${project.gradient} relative overflow-hidden`}>
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : null}
                
                {project.featured && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
                    <Star className="h-4 w-4 text-background fill-current drop-shadow-lg" />
                    <span className="text-background text-sm font-medium drop-shadow-lg">Featured</span>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
                  >
                    <Github className="h-4 w-4 text-foreground" />
                  </a>
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
                  >
                    <Play className="h-4 w-4 text-foreground" />
                  </a>
                </div>

                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>

              </div>

              {/* Project info */}
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-xs font-mono text-primary border border-primary/30 px-2 py-1 rounded bg-primary/10">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm">
                  {project.description}
                </p>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-muted/50 rounded text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-200 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-all duration-500 rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <button className="neon-button group w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
            <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" />
            Explore All Projects
          </button>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </section>
  );
};

export default ModernProjects;