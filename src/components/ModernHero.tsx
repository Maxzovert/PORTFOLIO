import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Code2, Sparkles, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ModernHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], { opacity: 0, y: 100 });
      gsap.set(blobRef.current, { scale: 0, rotation: -180 });

      // Hero entrance animation
      const tl = gsap.timeline();
      
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .to(blobRef.current, {
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "back.out(1.7)"
      }, "-=1.2")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

      // Continuous animations
      gsap.to(blobRef.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });

      // Parallax scrolling
      gsap.to(heroRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Grid animation
      gsap.to(gridRef.current, {
        backgroundPosition: "100px 100px",
        duration: 10,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      // Particle animation
      const particles = particlesRef.current?.children;
      if (particles) {
        gsap.from(particles, {
          opacity: 0,
          scale: 0,
          duration: 2,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 1
        });
      }

      // Magnetic hover effect for CTA buttons
      const buttons = ctaRef.current?.querySelectorAll('button');
      buttons?.forEach(button => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
          button.removeEventListener('mousemove', handleMouseMove);
          button.removeEventListener('mouseleave', handleMouseLeave);
        };
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen relative overflow-hidden bg-background">
      {/* Animated grid background */}
      <div ref={gridRef} className="absolute inset-0 cyber-grid"></div>
      
      {/* Morphing blob background */}
      <div 
        ref={blobRef}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-neon morphing-blob opacity-20 blur-3xl"
      ></div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full floating-element opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary rounded-full floating-element opacity-40" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-accent rounded-full floating-element opacity-80" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-green rounded-full floating-element opacity-50" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute bottom-1/4 right-2/3 w-4 h-4 bg-primary/30 rounded-full floating-element blur-sm" style={{ animationDelay: '-4s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl">
          {/* Main title with glitch effect */}
          <h1 ref={titleRef} className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight mb-8">
            <span className="neon-text">ABDULLAH</span>
            <br />
            <span className="cyber-text font-mono" data-text="DEVELOPER">DEVELOPER</span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 font-light leading-relaxed">
            Building the future with{' '}
            <span className="text-primary text-glow">innovative code</span>,{' '}
            <span className="text-secondary text-glow">creative design</span>, and{' '}
            <span className="text-accent text-glow">cutting-edge tech</span>
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="neon-button group">
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
              View Projects
            </button>
            
            <button className="relative px-8 py-4 rounded-xl bg-gradient-cyber text-background font-medium overflow-hidden group">
              <span className="relative z-10 flex items-center">
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Get In Touch
              </span>
              <div className="absolute inset-0 hologram"></div>
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground">
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-sm mb-2 font-mono">SCROLL</span>
              <ArrowDown className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Side decorations */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-primary via-secondary to-accent opacity-60"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-accent via-secondary to-primary opacity-60"></div>
    </section>
  );
};

export default ModernHero;