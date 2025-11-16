import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ModernContact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

      // Form fields animation
      gsap.fromTo(formRef.current?.querySelectorAll('.form-field'),
        { 
          opacity: 0,
          x: -50,
          rotationY: -10 
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact info animation
      gsap.fromTo(contactInfoRef.current?.children,
        { 
          opacity: 0,
          scale: 0.8,
          y: 30 
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Social links animation
      gsap.fromTo(socialRef.current?.children,
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
            trigger: socialRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate submit button
    const submitBtn = e.currentTarget.querySelector('button[type="submit"]');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@developer.io",
      gradient: "bg-gradient-neon"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      gradient: "bg-gradient-cyber"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      gradient: "bg-gradient-primary"
    }
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#", hoverColor: "hover:text-primary" },
    { icon: Linkedin, label: "LinkedIn", href: "#", hoverColor: "hover:text-secondary" },
    { icon: Twitter, label: "Twitter", href: "#", hoverColor: "hover:text-accent" },
    { icon: MessageSquare, label: "Discord", href: "#", hoverColor: "hover:text-green" }
  ];

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-neon morphing-blob opacity-10 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-cyber morphing-blob opacity-10 blur-3xl" style={{ animationDelay: '-3s' }}></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section title */}
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="neon-text">LET'S</span>{' '}
            <span className="cyber-text font-mono" data-text="CONNECT">CONNECT</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Ready to build something extraordinary? Let's discuss your next project and bring 
            your vision to life with cutting-edge technology and creative innovation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="glass-card p-8 relative">
            {/* Form glow effect */}
            <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-glow flex items-center">
                <MessageSquare className="mr-3 h-6 w-6 text-primary" />
                Start a Conversation
              </h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="form-field">
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none font-mono ${
                      focusedField === 'name'
                        ? 'border-primary shadow-neon'
                        : 'border-border hover:border-border/80'
                    }`}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none font-mono ${
                      focusedField === 'email'
                        ? 'border-secondary shadow-cyber'
                        : 'border-border hover:border-border/80'
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="project" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Project Type
                  </label>
                  <input
                    type="text"
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('project')}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none font-mono ${
                      focusedField === 'project'
                        ? 'border-accent shadow-glass'
                        : 'border-border hover:border-border/80'
                    }`}
                    placeholder="Web App, Mobile, AI/ML, etc."
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none resize-none font-mono ${
                      focusedField === 'message'
                        ? 'border-green shadow-neon'
                        : 'border-border hover:border-border/80'
                    }`}
                    placeholder="Tell me about your project vision..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="neon-button w-full group"
                >
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  Launch Project
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact details */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-glow">
                Direct Contact
              </h3>
              <div ref={contactInfoRef} className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="glass-card p-6 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 rounded-2xl ${info.gradient} group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="h-6 w-6 text-background" />
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground text-sm">
                          {info.label}
                        </p>
                        <p className="text-lg font-mono text-glow">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-glow">
                Connect Online
              </h4>
              <div ref={socialRef} className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`glass-card p-6 flex flex-col items-center justify-center text-center hover:scale-110 transition-all duration-300 group ${social.hoverColor}`}
                  >
                    <social.icon className="h-8 w-8 mb-2 group-hover:scale-125 transition-transform duration-300" />
                    <span className="font-medium font-mono text-sm">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability status */}
            <div className="glass-card p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-3 h-3 bg-green rounded-full animate-pulse mr-2"></div>
                <span className="text-green font-mono text-sm">Available for Projects</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Currently accepting new projects for Q1 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
    </section>
  );
};

export default ModernContact;