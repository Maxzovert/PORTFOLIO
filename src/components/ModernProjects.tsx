import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Play, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ModernProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

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

  const filters = [
    { name: "All", active: true },
    { name: "Web", active: false },
    { name: "Mobile", active: false },
    { name: "AI/ML", active: false }
  ];

  const projects = [
    {
      title: "Neural Canvas",
      category: "AI/ML",
      description: "AI-powered digital art creation platform with real-time style transfer and collaborative features.",
      tech: ["React", "TensorFlow.js", "WebGL", "Socket.io"],
      stats: { stars: 1200, forks: 89 },
      gradient: "bg-gradient-neon",
      featured: true
    },
    {
      title: "Quantum Dashboard",
      category: "Web",
      description: "Real-time analytics dashboard with quantum-inspired visualizations and predictive modeling.",
      tech: ["Next.js", "D3.js", "WebGL", "Python"],
      stats: { stars: 856, forks: 67 },
      gradient: "bg-gradient-cyber",
      featured: true
    },
    {
      title: "Holographic UI Kit",
      category: "Web",
      description: "Futuristic component library with holographic effects and advanced animation systems.",
      tech: ["React", "GSAP", "Three.js", "Framer"],
      stats: { stars: 2100, forks: 145 },
      gradient: "bg-gradient-primary",
      featured: false
    },
    {
      title: "Nexus Mobile",
      category: "Mobile",
      description: "Cross-platform mobile app with AR integration and real-time collaboration features.",
      tech: ["React Native", "ARKit", "WebRTC", "Firebase"],
      stats: { stars: 634, forks: 78 },
      gradient: "bg-gradient-dark",
      featured: false
    },
    {
      title: "Code Synthesizer",
      category: "AI/ML",
      description: "AI-powered code generation tool with natural language processing and intelligent suggestions.",
      tech: ["Python", "OpenAI", "FastAPI", "React"],
      stats: { stars: 3400, forks: 289 },
      gradient: "bg-gradient-neon",
      featured: true
    },
    {
      title: "Ethereal CMS",
      category: "Web",
      description: "Next-generation content management system with blockchain integration and AI assistance.",
      tech: ["Vue.js", "Nuxt", "Ethereum", "IPFS"],
      stats: { stars: 945, forks: 123 },
      gradient: "bg-gradient-cyber",
      featured: false
    }
  ];

  return (
    <section ref={sectionRef} className="section-padding relative">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="neon-text">FEATURED</span>{' '}
            <span className="cyber-text font-mono" data-text="WORKS">WORKS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Exploring the boundaries of technology through innovative projects that blend 
            <span className="text-primary text-glow"> creativity</span>,{' '}
            <span className="text-secondary text-glow">performance</span>, and{' '}
            <span className="text-accent text-glow">user experience</span>
          </p>
        </div>

        {/* Filter tabs */}
        <div ref={filterRef} className="flex justify-center mb-16">
          <div className="glass-card p-2 flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.name}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  filter.active
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
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`glass-card overflow-hidden group perspective-1000 ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Project preview */}
              <div className={`h-48 ${project.gradient} relative overflow-hidden`}>
                {project.featured && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <Star className="h-4 w-4 text-background fill-current" />
                    <span className="text-background text-sm font-medium">Featured</span>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform">
                    <ExternalLink className="h-4 w-4 text-foreground" />
                  </button>
                  <button className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform">
                    <Github className="h-4 w-4 text-foreground" />
                  </button>
                  <button className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform">
                    <Play className="h-4 w-4 text-foreground" />
                  </button>
                </div>

                {/* Animated background elements */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Stats overlay */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-background/80">
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-3 w-3" />
                    <span>{project.stats.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Github className="h-3 w-3" />
                    <span>{project.stats.forks}</span>
                  </div>
                </div>
              </div>

              {/* Project info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-primary border border-primary/30 px-2 py-1 rounded bg-primary/10">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                  {project.description}
                </p>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
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
        <div className="text-center">
          <button className="neon-button group">
            <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
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