import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Rocket, Target, Zap } from 'lucide-react';
import profile from '@/assets/MainImg.jpeg';

gsap.registerPlugin(ScrollTrigger);

const ModernAbout = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with split text effect
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

      // Staggered card animations
      gsap.fromTo(cardsRef.current?.children,
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
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Photo frame animation
      gsap.fromTo(photoRef.current,
        { 
          opacity: 0,
          scale: 0.8,
          rotation: -5,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Text reveal animation
      gsap.fromTo(textRef.current?.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats counter animation
      gsap.fromTo(statsRef.current?.children,
        { 
          scale: 0,
          rotation: 180,
          opacity: 0 
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      icon: Brain,
      title: "AI Integration",
      description: "Leveraging cutting-edge AI technologies to build intelligent, adaptive user experiences.",
      gradient: "bg-gradient-neon"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing applications for lightning-fast performance and seamless user interactions.",
      gradient: "bg-gradient-cyber"
    },
    {
      icon: Target,
      title: "Precision",
      description: "Crafting pixel-perfect interfaces with meticulous attention to detail and user experience.",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Pushing boundaries with experimental technologies and creative problem-solving approaches.",
      gradient: "bg-gradient-dark"
    }
  ];

  const stats = [
    { number: "50+", label: "Projects" },
    { number: "2+", label: "Years" },
    { number: "100%", label: "Passion" },
    { number: "∞", label: "Learning" }
  ];

  return (
    <section ref={sectionRef} className="section-padding relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8">
            <span className="neon-text">ABOUT</span>{' '}
            <span className="cyber-text font-mono" data-text="ME">ME</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start mb-12 sm:mb-16 md:mb-20">
          {/* Photo Frame */}
          <div ref={photoRef} className="relative order-1 lg:order-2 mb-8 lg:mb-0 max-w-sm mx-auto lg:max-w-none">
            <div className="glass-card p-3 sm:p-4 rounded-2xl group hover:border-primary/50 transition-all duration-300">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
                <img
                  src={profile}
                  alt="Abdullah - Developer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div ref={textRef} className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary text-glow">
                Creative Technologist
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                I'm a passionate developer who thrives at the intersection of creativity and technology. 
                With a deep love for crafting digital experiences that not only function flawlessly but 
                also inspire and delight users.
              </p>
            </div>

            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-secondary text-glow">
                Innovation Driven
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                My approach combines cutting-edge technologies with user-centered design principles. 
                I believe in pushing boundaries while maintaining accessibility and performance at the core 
                of every project.
              </p>
            </div>

            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-accent text-glow">
                Continuous Evolution
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                The tech landscape evolves rapidly, and so do I. I'm constantly exploring new frameworks, 
                experimenting with emerging technologies, and refining my craft to deliver exceptional 
                digital solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                className="glass-card p-4 sm:p-6 group hover:border-primary/50 transition-all duration-500 relative"
              >
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  <div className={`p-3 sm:p-4 rounded-2xl ${skill.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <skill.icon className="h-5 w-5 sm:h-6 sm:w-6 text-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 text-glow">
                      {skill.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                      {skill.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="text-center">
          <div ref={statsRef} className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card p-4 sm:p-6 min-w-[100px] sm:min-w-[120px] group hover:scale-110 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-glow mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-mono text-sm">
                  {stat.label}
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

export default ModernAbout;