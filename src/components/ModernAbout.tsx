import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Asterisk, Brain, Plus, Rocket, Sparkles, Target, Zap } from 'lucide-react';
import SectionDecorations from './SectionDecorations';
import profile from '@/assets/Heroimg.png';

gsap.registerPlugin(ScrollTrigger);

const ModernAbout = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleBlockRef.current?.children,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleBlockRef.current,
            start: 'top 82%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 42 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        textRef.current?.children,
        { opacity: 0, y: 42 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 82%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        statsRef.current?.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Leveraging cutting-edge AI technologies to build intelligent, adaptive user experiences.',
      index: '01',
    },
    {
      icon: Rocket,
      title: 'Performance',
      description: 'Optimizing applications for lightning-fast performance and seamless user interactions.',
      index: '02',
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Crafting pixel-perfect interfaces with meticulous attention to detail and user experience.',
      index: '03',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Pushing boundaries with experimental technologies and creative problem-solving approaches.',
      index: '04',
    },
  ];

  const stats = [
    { number: '50+', label: 'Projects' },
    { number: '2+', label: 'Years' },
    { number: '100%', label: 'Passion' },
    { number: '∞', label: 'Learning' },
  ];

  return (
    <section ref={sectionRef} id="about" className="section-padding paper-bg relative overflow-hidden">
      <SectionDecorations variant="about" />

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div ref={titleBlockRef} className="relative lg:col-span-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="section-title text-left leading-[0.85]">ABOUT ME</h2>
              <span className="star-symbol mt-4 hidden text-3xl opacity-80 md:block">✱</span>
            </div>

            <div className="mt-2 flex items-end gap-4">
              <span className="script-word relative z-10 rotate-[-4deg]">Introduction</span>
              <Sparkles className="mb-3 hidden h-7 w-7 text-editorial-blue opacity-70 md:block" strokeWidth={1.5} />
            </div>

            <div className="mt-6 max-w-xl">
              <a
                href="https://veriencestudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-black/15 bg-white px-3 py-2 rounded-lg hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors group"
              >
                <ArrowUpRight className="h-4 w-4 text-charcoal group-hover:text-[var(--blue)]" strokeWidth={1.5} />
                <span className="micro-label text-charcoal group-hover:text-[var(--blue)]">Verience Studio</span>
              </a>
            </div>
          </div>

          <div ref={imageRef} className="lg:col-span-6 lg:pb-10">
            <div className="relative mx-auto max-w-lg lg:ml-auto">
              <div className="absolute -left-2 top-10 hidden text-charcoal/70 md:block">
                <Plus className="h-7 w-7" strokeWidth={1.5} />
              </div>

              <div className="relative overflow-hidden bg-transparent">
                <img
                  src={profile}
                  alt="Abdullah"
                  className="mx-auto h-auto max-h-[38rem] w-full scale-125 object-contain object-top"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="-mt-8 grid grid-cols-1 gap-10 lg:-mt-64 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div ref={textRef} className="max-w-2xl space-y-6">
              <p className="font-inter text-[1.35rem] leading-[1.45] tracking-[-0.025em] text-charcoal md:text-[1.5rem]">
              I'm a full-stack developer and founder passionate about building products that solve real-world problems. From frontend development to backend architecture, cloud infrastructure, databases, and deployment, I handle the entire product lifecycle.
              </p>
              <p className="font-inter text-[1.35rem] leading-[1.45] tracking-[-0.025em] text-charcoal md:text-[1.5rem]">
              I've shipped production-ready applications with active users, focusing on scalability, performance, and exceptional user experiences. I enjoy turning ambitious ideas into reliable digital products while continuously exploring new technologies to build faster, smarter, and better solutions.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:flex lg:items-end lg:justify-end">
            <div ref={statsRef} className="grid grid-cols-2 gap-6 sm:flex sm:flex-wrap sm:gap-10 lg:justify-end">
              {stats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="font-bebas text-4xl leading-none text-[var(--blue)] sm:text-5xl">{stat.number}</div>
                  <div className="micro-label mt-1 text-charcoal">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20">
          <div ref={cardsRef} className="about-features">
            {skills.map((skill) => (
              <div key={skill.title} className="about-feature group">
                <span className="about-feature-num">{skill.index}</span>
                <div className="about-feature-main">
                  <div className="about-feature-head">
                    <skill.icon className="about-feature-icon" strokeWidth={1.5} />
                    <h3 className="about-feature-title">{skill.title}</h3>
                  </div>
                  <p className="about-feature-desc">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernAbout;