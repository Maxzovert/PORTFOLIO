import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Rocket, Target, Zap } from 'lucide-react';
import profile from '@/assets/Heroimg.png';

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
    <section ref={sectionRef} id="about" className="section-padding paper-bg relative overflow-hidden">
      <div className="editorial-divider absolute top-0 left-0" />

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        <div className="relative min-h-[60vh] mb-12 sm:mb-16">
          <h2 ref={titleRef} className="section-title text-left mb-0">
            ABOUT ME
          </h2>
          <span className="script-word absolute right-[8%] bottom-[5%] hidden md:block rotate-[-3deg]">
            Introduction
          </span>
          <span className="star-symbol absolute left-[42%] top-[12%] hidden lg:block text-4xl opacity-80">✱</span>

          <div ref={photoRef} className="absolute right-[4%] top-[18%] w-[34%] max-w-sm hidden md:block">
            <img
              src={profile}
              alt="Abdullah"
              className="w-full aspect-[4/5] object-cover editorial-img border border-black/20"
            />
          </div>

          <div ref={textRef} className="mt-8 md:mt-12 max-w-md md:max-w-lg space-y-6">
            <p className="body-copy">
              I'm a passionate developer who thrives at the intersection of creativity and technology.
              With a deep love for crafting digital experiences that not only function flawlessly but
              also inspire and delight users.
            </p>
            <p className="body-copy">
              My approach combines cutting-edge technologies with user-centered design principles.
              I believe in pushing boundaries while maintaining accessibility and performance at the core
              of every project.
            </p>
          </div>
        </div>

        <div className="mb-12 sm:mb-16 md:mb-20">
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="glass-card p-4 sm:p-6 group transition-all duration-300 relative border-t-2 border-t-[var(--blue)]"
              >
                <div className="flex flex-col items-start space-y-3 sm:space-y-4">
                  <div className="p-2 border border-black/20 group-hover:border-[var(--blue)] transition-colors">
                    <skill.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--blue)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bebas text-xl sm:text-2xl mb-2 uppercase tracking-tight text-[var(--black)]">
                      {skill.title}
                    </h3>
                    <p className="body-copy text-sm">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-left border-t border-black pt-8">
          <div ref={statsRef} className="flex flex-wrap gap-8 sm:gap-12 md:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="group">
                <div className="font-bebas text-4xl sm:text-5xl text-[var(--blue)] mb-1 leading-none">
                  {stat.number}
                </div>
                <div className="micro-label text-charcoal">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="editorial-divider absolute bottom-0 left-0" />
    </section>
  );
};

export default ModernAbout;