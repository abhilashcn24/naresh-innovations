import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-bg-green.jpg';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate elements with staggered delays
            setTimeout(() => {
              titleRef.current?.classList.add('animate');
            }, 300);
            
            setTimeout(() => {
              subtitleRef.current?.classList.add('animate');
            }, 600);
            
            setTimeout(() => {
              ctaRef.current?.classList.add('animate');
            }, 900);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury interior design showcase"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1
          ref={titleRef}
          className="heading-xl text-white mb-6 luxury-fade-up"
        >
          Naresh Innovations
          <span className="block text-accent mt-2 text-xl tracking-wide">Crafting Your Dream Interiors</span>
        </h1>

        <p
          ref={subtitleRef}
          className="body-lg text-white/90 mb-8 max-w-2xl mx-auto luxury-fade-up"
        >
          Premium glass, plywood, locks, handles, and complete interior solutions in Mysuru. 
          From 2D/3D design plans to turnkey execution, we transform spaces into luxury experiences.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center luxury-fade-up"
        >
          <Button size="lg" className="btn-luxury text-lg px-8 py-4">
            Explore Our Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-accent transition-all duration-300 px-8 py-4 backdrop-blur-sm"
          >
            Get Free Consultation
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToNextSection}
          className="scroll-indicator p-2 rounded-full glass-effect hover:bg-accent/20 transition-all duration-300"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={24} />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-40 right-20 w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default HeroSection;