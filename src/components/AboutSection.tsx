import { useEffect, useRef } from 'react';
import { Award, Users, Clock, Home } from 'lucide-react';
import aboutImage from '@/assets/office image/nareshInnovations.mp4';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Years Experience', value: '25+', icon: Clock },
    { label: 'Projects Completed', value: '250+', icon: Home },
    { label: 'Happy Clients', value: '500+', icon: Users },

  ];

  return (
    <section id="about" className="section-container bg-background overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: Image/Visual */}
        <div className="relative animate-on-scroll opacity-0 order-2 lg:order-1">
          <div className="rounded-2xl overflow-hidden relative shadow-2xl">
            <video
              src={aboutImage}
              className="w-full h-auto hover:scale-105 transition-transform duration-700"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none"></div>
          </div>
          {/* Floating Card */}
          
            
        </div>

        {/* Right: Content */}
        <div className="space-y-8 animate-on-scroll opacity-0 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="heading-lg text-foreground">About <span className="text-primary">Naresh Innovations</span></h2>
            <p className="body-lg text-muted-foreground">
              Founded in 2010, we started with a simple vision: to bring premium quality interior materials to Mysuru. Over the last 15 years, we have evolved into a full-service interior solutions provider.
            </p>
            <p className="body-lg text-muted-foreground">
              We don't just sell products, we understand spaces. Whether it's selecting the perfect glass for your facade or designing a custom kitchen, our team brings technical expertise and creative vision to every project.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <stat.icon className="w-6 h-6 text-primary" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="pt-4">

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;