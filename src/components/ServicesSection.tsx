import { useEffect, useRef } from 'react';
import { Palette, Ruler, Hammer, CheckCircle } from 'lucide-react';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.luxury-fade-up, .luxury-scale-in');
    elements?.forEach((el) => observer.observe(el));

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

  const process = [
    { step: '01', title: 'Consultation', desc: 'Understanding your vision and requirements' },
    { step: '02', title: 'Design', desc: '2D/3D planning and material selection' },
    { step: '03', title: 'Approval', desc: 'Design refinement and client approval' },
    { step: '04', title: 'Execution', desc: 'Professional installation and finishing' },
    { step: '05', title: 'Handover', desc: 'Quality check and project completion' },
  ];

  return (
    <section id="services" className="py-20 bg-secondary/20" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 luxury-fade-up">
          <h2 className="heading-lg text-primary mb-4 font-serif">Complete Interior Solutions</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            From initial concept to final execution, we provide end-to-end interior solutions 
            that transform your vision into reality with precision and elegance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="luxury-scale-in text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                <service.icon className="w-10 h-10 text-accent" />
              </div>
              <h3 className="heading-md text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="luxury-fade-up">
          <h3 className="heading-md text-center text-primary mb-12 font-serif">Our Process</h3>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-accent/30 transform -translate-y-1/2"></div>
            
            <div className="grid lg:grid-cols-5 gap-8">
              {process.map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full text-accent-foreground font-bold text-xl mb-4 relative z-10">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-primary mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-20 luxury-fade-up">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="heading-md text-primary mb-6 font-serif">See Our Work in Action</h3>
              <p className="body-md text-muted-foreground mb-6">
                Watch how we transform spaces through our comprehensive design and execution process. 
                From initial 3D visualization to final installation, every step is crafted with precision.
              </p>
              <ul className="space-y-3">
                {[
                  'Professional 3D rendering and visualization',
                  'High-quality material selection and sourcing',
                  'Expert craftsmanship and installation',
                  'Timely project completion and handover',
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-gradient-luxury rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20"></div>
                <div className="relative z-10 text-center text-primary-foreground">
                  <Palette className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium">3D Design Preview</p>
                  <p className="text-sm opacity-80">Interactive Floor Plan Demo</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;