import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Instagram, MessageSquare, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Animate submit button
    const submitBtn = e.currentTarget.querySelector('button[type="submit"]');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Validate environment variables
      if (!serviceId || !templateId || !publicKey) {
        const missingVars = [];
        if (!serviceId) missingVars.push('VITE_EMAILJS_SERVICE_ID');
        if (!templateId) missingVars.push('VITE_EMAILJS_TEMPLATE_ID');
        if (!publicKey) missingVars.push('VITE_EMAILJS_PUBLIC_KEY');
        
        console.error('EmailJS configuration missing:', missingVars);
        throw new Error(`EmailJS is not configured. Missing: ${missingVars.join(', ')}`);
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          project_type: formData.project || 'Not specified',
          message: formData.message,
          to_email: '95abdullah95@gmail.com', // Your email
        },
        publicKey
      );

      // Success feedback
      toast.success('Message sent successfully!', {
        description: 'I\'ll get back to you as soon as possible.',
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        project: '',
        message: ''
      });

      // Animate success
      if (submitBtn) {
        gsap.to(submitBtn, {
          scale: 1.05,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      }
    } catch (error: any) {
      console.error('Error sending email:', error);
      
      // Provide detailed error feedback
      let errorMessage = 'Please try again later or contact me directly via email.';
      
      if (error?.message?.includes('not configured')) {
        errorMessage = 'Email service is not configured. Please contact me directly via email.';
      } else if (error?.text) {
        errorMessage = `Email service error: ${error.text}`;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      // Error feedback
      toast.error('Failed to send message', {
        description: errorMessage,
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
      value: "95abdullah13@gmail.com",
      gradient: "bg-gradient-neon",
      href: "mailto:95abdullah13@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9599454313",
      gradient: "bg-gradient-cyber",
      href: "tel:+919599454313"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Delhi, India",
      gradient: "bg-gradient-primary",
      href: null
    }
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/Maxzovert", hoverColor: "hover:text-primary" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/95abdullah99/", hoverColor: "hover:text-secondary" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/_maxzovert_", hoverColor: "hover:text-accent" },
    { icon: MessageSquare, label: "Discord", href: "https://discord.com/users/983761421269598248", hoverColor: "hover:text-green" }
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-neon morphing-blob opacity-10 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gradient-cyber morphing-blob opacity-10 blur-3xl" style={{ animationDelay: '-3s' }}></div>

      <div className="container mx-auto max-w-6xl relative z-10 px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8">
            <span className="neon-text">LET'S</span>{' '}
            <span className="cyber-text font-mono" data-text="CONNECT">CONNECT</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light px-4">
            Ready to build something extraordinary? Let's discuss your next project and bring 
            your vision to life with cutting-edge technology and creative innovation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          {/* Contact Form */}
          <div className="glass-card p-6 sm:p-7 md:p-8 relative order-2 lg:order-1">
            {/* Form glow effect */}
            <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-glow flex items-center">
                <MessageSquare className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Start a Conversation
              </h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
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
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none font-mono text-sm sm:text-base touch-manipulation ${
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
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none font-mono text-sm sm:text-base touch-manipulation ${
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
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none font-mono text-sm sm:text-base touch-manipulation ${
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
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none resize-none font-mono text-sm sm:text-base touch-manipulation ${
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
                  disabled={isSubmitting}
                  className="neon-button w-full group disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation text-sm sm:text-base py-3 sm:py-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      Launch Project
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            {/* Contact details */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-glow">
                Direct Contact
              </h3>
              <div ref={contactInfoRef} className="space-y-3 sm:space-y-4">
                {contactInfo.map((info) => {
                  const content = (
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`p-3 sm:p-4 rounded-2xl ${info.gradient} group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-background" />
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground text-xs sm:text-sm">
                          {info.label}
                        </p>
                        <p className="text-base sm:text-lg font-mono text-glow break-words">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  );

                  return info.href ? (
                    <a
                      key={info.label}
                      href={info.href}
                      className="glass-card p-4 sm:p-5 md:p-6 hover:scale-105 transition-all duration-300 group block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={info.label}
                      className="glass-card p-4 sm:p-5 md:p-6 hover:scale-105 transition-all duration-300 group"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-glow">
                Connect Online
              </h4>
              <div ref={socialRef} className="grid grid-cols-2 gap-3 sm:gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`glass-card p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center hover:scale-110 transition-all duration-300 group ${social.hoverColor}`}
                  >
                    <social.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 mb-2 group-hover:scale-125 transition-transform duration-300" />
                    <span className="font-medium font-mono text-xs sm:text-sm">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability status */}
            <div className="glass-card p-4 sm:p-5 md:p-6 text-center">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green rounded-full animate-pulse mr-2"></div>
                <span className="text-green font-mono text-xs sm:text-sm">Available for Projects</span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Currently accepting new projects
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