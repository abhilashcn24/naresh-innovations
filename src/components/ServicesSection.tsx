import { useRef, useEffect } from 'react';
import { Palette, Ruler, Hammer, CheckCircle, ArrowRight } from 'lucide-react';
import serviceBg from '@/assets/hero-bg.jpg';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.service-card, .process-step');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Palette,
      title: '2D/3D Design Planning',
      description: 'Comprehensive design visualization with detailed floor plans, 3D renderings, and material specifications.',
    },
    {
      icon: Ruler,
      title: 'Space Planning & Consultation',
      description: 'Expert consultation on space optimization, material selection, and design aesthetics.',
    },
    {
      icon: Hammer,
      title: 'Turnkey Execution',
      description: 'Complete project management from design approval to final installation and handover.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Rigorous quality checks and post-completion support to ensure lasting satisfaction.',
    },
  ];

  return (
    <section id="services" className="relative pt-24 lg:pt-32 pb-0 overflow-hidden flex flex-col" ref={sectionRef}>
      {/* Background Image with Dark Overlay for Text Contrast */}
      <div className="absolute inset-0 z-0 h-full">
        <img
          src={serviceBg}
          alt="Interior design services background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm dark:bg-background/95"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 mb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content remains same */}

          {/* Left: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-semibold tracking-wide uppercase text-sm">Our Expertise</span>
              <h2 className="heading-lg text-foreground">Complete Interior Solutions</h2>
              <p className="body-lg text-muted-foreground">
                We don't just supply materials; we build experiences. From the initial sketch to the final polish, our turnkey execution ensures your vision becomes reality without the hassle.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="service-card p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <service.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">

            </div>
          </div>

          {/* Right: Visual/Process (Laptop Optimization: Side by Side) */}
          <div className="hidden lg:block relative p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl -rotate-1 transform"></div>
            <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 text-center">Our Process</h3>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Consultation', desc: 'Understanding your vision' },
                  { step: '02', title: 'Design & Plan', desc: '2D/3D visualization & material selection' },
                  { step: '03', title: 'Execution', desc: 'Professional installation & management' },
                  { step: '04', title: 'Handover', desc: 'Quality audit & final delivery' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-6 process-step opacity-0 animate-fade-up" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    {i !== 3 && <div className="hidden md:block absolute left-[3.25rem] h-8 w-0.5 bg-border -bottom-4 translate-y-full"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Brand Marquee Section */}
      {/* Brand Marquee Section - Collapsed to bottom */}
      <div className="relative mt-auto w-full border-t border-white/10 bg-black/40 backdrop-blur-md py-6 z-20">

        {/* Section 1: Brands */}
        <div className="mb-2">
          <p className="text-center text-xs text-white/40 uppercase tracking-[0.2em] font-medium mb-4">Brands We Deal With</p>

          {/* Partners (Left Scroll) */}
          <div className="flex overflow-hidden select-none mask-gradient">
            <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center">
              {['Hettich', 'Hafele', 'Greenply', 'Saint-Gobain', 'Century Ply', 'Kajaria', 'Asian Paints', 'Ebco', 'Blum', 'Hardware & Fittings'].map((item, i) => (
                <span key={i} className="text-lg md:text-2xl font-bold text-white/10 px-6 uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center">
              {['Hettich', 'Hafele', 'Greenply', 'Saint-Gobain', 'Century Ply', 'Kajaria', 'Asian Paints', 'Ebco', 'Blum', 'Hardware & Fittings'].map((item, i) => (
                <span key={i} className="text-lg md:text-2xl font-bold text-white/10 px-6 uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider with nice fade */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full my-4"></div>

        {/* Section 2: Clients */}
        <div>
          <p className="text-center text-xs text-white/40 uppercase tracking-[0.2em] font-medium mb-4">Our Clients</p>

          {/* Clients (Right Scroll) */}
          <div className="flex overflow-hidden select-none">
            <div className="flex animate-marquee-reverse whitespace-nowrap min-w-full shrink-0 items-center">
              {['Infosys', 'Wipro', 'HCL', 'Decathlon', 'Harman', 'L&T', 'Mphasis', 'Narayana Health', 'Cyient', 'Unisys'].map((item, i) => (
                <span key={i} className="text-lg md:text-2xl font-bold text-white/10 px-6 uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex animate-marquee-reverse whitespace-nowrap min-w-full shrink-0 items-center">
              {['Infosys', 'Wipro', 'HCL', 'Decathlon', 'Harman', 'L&T', 'Mphasis', 'Narayana Health', 'Cyient', 'Unisys'].map((item, i) => (
                <span key={i} className="text-lg md:text-2xl font-bold text-white/10 px-6 uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;