import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Instagram, MessageSquare, Loader2, ArrowUpRight, Plus, Sparkles, Globe } from 'lucide-react';
import SectionDecorations from './SectionDecorations';
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
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        formRef.current?.querySelectorAll('.form-field'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contactInfoRef.current?.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        socialRef.current?.children,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: socialRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        const missingVars = [];
        if (!serviceId) missingVars.push('VITE_EMAILJS_SERVICE_ID');
        if (!templateId) missingVars.push('VITE_EMAILJS_TEMPLATE_ID');
        if (!publicKey) missingVars.push('VITE_EMAILJS_PUBLIC_KEY');
        throw new Error(`EmailJS is not configured. Missing: ${missingVars.join(', ')}`);
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          project_type: formData.project || 'Not specified',
          message: formData.message,
          to_email: 'hello@veriencestudio.com',
        },
        publicKey
      );

      toast.success('Message sent successfully!', {
        description: "I'll get back to you as soon as possible.",
        duration: 5000,
      });

      setFormData({ name: '', email: '', project: '', message: '' });
    } catch (error: unknown) {
      console.error('Error sending email:', error);

      let errorMessage = 'Please try again later or contact me directly via email.';
      const err = error as { message?: string; text?: string };
      if (err?.message?.includes('not configured')) {
        errorMessage = 'Email service is not configured. Please contact me directly via email.';
      } else if (err?.text) {
        errorMessage = `Email service error: ${err.text}`;
      } else if (err?.message) {
        errorMessage = err.message;
      }

      toast.error('Failed to send message', {
        description: errorMessage,
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@veriencestudio.com',
      href: 'mailto:hello@veriencestudio.com',
    },
    {
      icon: Globe,
      label: 'Studio',
      value: 'veriencestudio.com',
      href: 'https://veriencestudio.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9599454313',
      href: 'tel:+919599454313',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Delhi, India',
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Globe, label: 'Verience Studio', href: 'https://veriencestudio.com' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/Maxzovert' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/95abdullah99/' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/_maxzovert_' },
    { icon: MessageSquare, label: 'Discord', href: 'https://discord.com/users/983761421269598248' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding paper-bg relative overflow-hidden">
      <SectionDecorations variant="contact" />

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        <div className="text-left mb-10 sm:mb-12 md:mb-16 relative">
          <div className="flex items-start justify-between gap-4">
            <h2 ref={titleRef} className="section-title text-left">
              CONTACT
            </h2>
            <span className="star-symbol mt-4 hidden text-3xl opacity-80 md:block">✱</span>
          </div>
          <span className="script-word absolute right-[6%] top-[20%] hidden md:block rotate-[5deg] text-5xl">
            Reach out
          </span>
          <div className="mt-2 flex items-end gap-4">
            <p className="body-copy max-w-xl">
              Ready to build something extraordinary? Send a message or reach out directly.
            </p>
            <Sparkles className="mb-1 hidden h-6 w-6 text-editorial-blue opacity-70 md:block rotate-[10deg]" strokeWidth={1.5} />
          </div>
          <div className="mt-4 hidden sm:inline-flex items-center gap-2 border border-black/15 bg-white px-3 py-2 rounded-lg rotate-[-3deg]">
            <ArrowUpRight className="h-4 w-4 text-charcoal" strokeWidth={1.5} />
            <span className="micro-label text-charcoal">Let's talk</span>
          </div>
          <Plus className="absolute right-[22%] top-[8%] hidden h-5 w-5 text-charcoal/40 lg:block rotate-[20deg]" strokeWidth={1.5} />
        </div>

        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-8 sm:gap-10 lg:gap-14 items-start">
          {/* Contact sidebar */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <p className="micro-label text-[var(--gray-mid)] mb-4 tracking-[0.14em]">Direct contact</p>
              <div ref={contactInfoRef} className="space-y-3">
                {contactInfo.map((info) => {
                  const inner = (
                    <>
                      <div className="contact-info-icon">
                        <info.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--blue)]" />
                      </div>
                      <div className="min-w-0">
                        <p className="micro-label text-[var(--gray-mid)] mb-0.5">{info.label}</p>
                        <p className="font-inter text-sm sm:text-base text-charcoal break-words">{info.value}</p>
                      </div>
                      {info.href && (
                        <ArrowUpRight className="h-4 w-4 text-[var(--gray-mid)] group-hover:text-[var(--blue)] transition-colors flex-shrink-0 ml-auto" />
                      )}
                    </>
                  );

                  return info.href ? (
                    <a
                      key={info.label}
                      href={info.href}
                      className="contact-info-card glass-card group flex items-center gap-4 p-4 sm:p-5"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={info.label} className="contact-info-card glass-card flex items-center gap-4 p-4 sm:p-5">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="micro-label text-[var(--gray-mid)] mb-4 tracking-[0.14em]">Connect online</p>
              <div ref={socialRef} className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-card glass-card flex items-center gap-3 p-4 group"
                  >
                    <social.icon className="h-5 w-5 text-[var(--blue)] group-hover:scale-110 transition-transform" />
                    <span className="micro-label text-charcoal group-hover:text-[var(--blue)] transition-colors">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-4 sm:p-5 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green" />
              </span>
              <div>
                <p className="micro-label text-charcoal tracking-[0.1em]">Available for projects</p>
                <p className="text-xs text-[var(--gray-mid)] mt-0.5 font-inter">Currently accepting new work</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-6 sm:p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="contact-info-icon">
                <MessageSquare className="h-5 w-5 text-[var(--blue)]" />
              </div>
              <div>
                <h3 className="font-bebas text-2xl sm:text-3xl uppercase text-[var(--blue)] tracking-[0.04em] leading-none">
                  Start a conversation
                </h3>
                <p className="text-xs text-[var(--gray-mid)] font-inter mt-1">I'll respond within 24 hours</p>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="form-field grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="contact-label">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="contact-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="you@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="project" className="contact-label">
                  Project type
                </label>
                <input
                  type="text"
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  className="contact-input"
                  placeholder="Web app, mobile, e-commerce, etc."
                />
              </div>

              <div className="form-field">
                <label htmlFor="message" className="contact-label">
                  Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="contact-input contact-textarea"
                  placeholder="Tell me about your project vision, timeline, and goals..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="editorial-btn w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernContact;
