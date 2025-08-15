import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-white/20 shadow-glass'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Naresh Innovations Logo" className="w-12 h-12" />
            <div>
              <h1 className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-foreground'}`}>Naresh Innovations</h1>
              <p className={`text-xs transition-colors duration-300 ${isScrolled ? 'text-white/70' : 'text-muted-foreground'}`}>Crafting Dream Interiors</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`transition-colors duration-300 font-medium relative group ${
                  isScrolled ? 'text-white hover:text-accent' : 'text-foreground hover:text-accent'
                }`}
              >
                {item.name}
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className={`transition-all duration-300 ${
              isScrolled 
                ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm' 
                : 'btn-luxury'
            }`}>
              Get Free Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-300 font-medium py-2 ${
                    isScrolled ? 'text-white hover:text-accent' : 'text-foreground hover:text-accent'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className={`mt-4 w-full transition-all duration-300 ${
                isScrolled 
                  ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm' 
                  : 'btn-luxury'
              }`}>
                Get Free Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;