import { useEffect, useRef } from 'react';
import { Award, Users, Clock, Star } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.luxury-fade-up, .luxury-scale-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: Award, number: '15+', label: 'Years Experience' },
    { icon: Clock, number: '1000+', label: 'Projects Completed' },
    { icon: Star, number: '4.9', label: 'Customer Rating' },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="luxury-fade-up">
              <h2 className="heading-lg text-primary mb-4 font-serif">
                Transforming Spaces Since 2008
              </h2>
              <div className="w-20 h-1 bg-accent mb-6"></div>
            </div>

            <div className="space-y-6 luxury-fade-up">
              <p className="body-md text-muted-foreground">
                Naresh Innovations has been Mysuru's premier destination for luxury interior solutions. 
                We specialize in high-quality glass installations, premium plywood work, designer locks 
                and handles, and comprehensive interior design services.
              </p>

              <p className="body-md text-muted-foreground">
                Our expertise spans from conceptual 2D/3D design planning to complete turnkey execution. 
                We believe every space tells a story, and we're here to help you craft yours with 
                precision, elegance, and unmatched craftsmanship.
              </p>

              <div className="bg-card p-6 rounded-lg shadow-glass border border-border">
                <h3 className="heading-md text-primary mb-3">Our Promise</h3>
                <p className="body-md text-muted-foreground">
                  "Quality is never an accident; it is always the result of intelligent effort." 
                  We stand behind every project with our commitment to excellence and customer satisfaction.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="luxury-scale-in text-center p-6 bg-card rounded-lg shadow-glass border border-border hover:shadow-luxury transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="heading-md text-primary font-bold mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-20 luxury-fade-up">
          <h3 className="heading-md text-center text-primary mb-12 font-serif">Our Journey</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent/30"></div>
            
            {[
              { year: '2008', title: 'Founded', desc: 'Started with a vision to transform interior spaces' },
              { year: '2012', title: 'Expansion', desc: 'Added 3D design services and premium materials' },
              { year: '2018', title: 'Innovation', desc: 'Introduced turnkey interior solutions' },
              { year: '2024', title: 'Leadership', desc: 'Recognized as Mysuru\'s premier interior partner' },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-card p-4 rounded-lg shadow-glass border border-border">
                    <div className="text-accent font-bold text-lg">{item.year}</div>
                    <div className="font-semibold text-primary">{item.title}</div>
                    <div className="text-muted-foreground text-sm">{item.desc}</div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;