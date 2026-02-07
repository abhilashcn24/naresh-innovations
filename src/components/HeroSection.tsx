import { useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury interior design showcase"
          className="w-full h-full object-cover"
        />
        {/* Modern Gradient Overlay for Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Content - Laptop Optimized (Left Aligned for cleaner read) */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl space-y-8 animate-fade-up">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#3d550c]" />
            <span>Premium Interior Solutions in Mysuru</span>
          </div>

          <h1 className="heading-xl text-white drop-shadow-lg leading-tight">
            <span className="font-light">Nāresh</span> <span className="font-bold text-primary">Innovations</span>
            <span className="block mt-4 text-3xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-wide">
              Crafting Dream Interiors
            </span>
          </h1>

          <p className="body-lg text-white/80 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            From premium glass and plywood to turnkey execution. We bring 15+ years of expertise to transform your space into a masterpiece of luxury and functionality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Explore Our Collections
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/5 border-white/20 text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto rounded-full backdrop-blur-md transition-all duration-300"
            >
              Get Free Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <button
          onClick={scrollToNextSection}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;