import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Logo removed - using text instead

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'products', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
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
           ? 'bg-black/70 backdrop-blur-md border-b border-white/30 shadow-glass'
           : 'bg-black/70 backdrop-blur-sm border-b border-white/20'
       }`}
     >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
                                      <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
               <img 
                 src="/logo.png" 
                 alt="Naresh Innovations Logo" 
                 className="w-full h-full object-contain rounded-full"
                 onError={(e) => {
                   // Fallback to text if image fails to load
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.nextElementSibling?.classList.remove('hidden');
                 }}
               />
               <span className="text-white font-bold text-lg hidden">NI</span>
             </div>
                         <div>
               <h1 className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-white'}`}>Naresh Innovations</h1>
               <p className={`text-xs transition-colors duration-300 ${isScrolled ? 'text-white/70' : 'text-white/90'}`}>Crafting Dream Interiors</p>
             </div>
          </div>

                     {/* Desktop Navigation */}
           <div className="hidden lg:flex items-center space-x-8">
             {navItems.map((item) => {
               const isActive = activeSection === item.href.replace('#', '');
               return (
                 <a
                   key={item.name}
                   href={item.href}
                   className={`transition-colors duration-300 font-medium relative group ${
                     isActive 
                       ? 'text-accent' 
                       : 'text-white hover:text-accent'
                   }`}
                 >
                   {item.name}
                   <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-accent transition-all duration-300 ${
                     isActive ? 'w-full' : 'w-0 group-hover:w-full'
                   }`}></span>
                 </a>
               );
             })}
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
               {navItems.map((item) => {
                 const isActive = activeSection === item.href.replace('#', '');
                 return (
                   <a
                     key={item.name}
                     href={item.href}
                     className={`transition-colors duration-300 font-medium py-2 ${
                       isActive 
                         ? 'text-accent' 
                         : 'text-white hover:text-accent'
                     }`}
                     onClick={() => setIsMobileMenuOpen(false)}
                   >
                     {item.name}
                   </a>
                 );
               })}
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