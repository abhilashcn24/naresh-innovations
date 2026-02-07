import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'products', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-border shadow-sm py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden rounded-full bg-white/10 backdrop-blur-sm shadow-lg border border-white/20">
              <img
                src="/logo.png"
                alt="Naresh Innovations Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className={`font-bold text-lg hidden ${isScrolled ? 'text-foreground' : 'text-white'}`}>NI</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl tracking-wide leading-none">
                <span className={`font-light ${isScrolled ? 'text-foreground' : 'text-white'}`}>Nāresh</span>
                <span className="font-bold text-[#3D550C] ml-1">Innovations</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isHashLink = item.href.startsWith('#');
              const linkHref = isHashLink ? `/${item.href}` : item.href;
              const isHomePage = window.location.pathname === '/';
              const isPortfolioPage = window.location.pathname === '/portfolio';
              const isProductsPage = window.location.pathname === '/products';

              let isActive = false;
              if (isHomePage && isHashLink) {
                isActive = activeSection === item.href.replace('#', '');
              } else if (isPortfolioPage && item.name === 'Portfolio') {
                isActive = true;
              } else if (isProductsPage && item.name === 'Products') {
                isActive = true;
              }

              if (item.name === 'Products') {
                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                    className="relative px-2 -mx-2 py-4 -my-4" // Expand hover area
                  >
                    <DropdownMenu open={isProductsOpen} onOpenChange={setIsProductsOpen} modal={false}>
                      <DropdownMenuTrigger asChild className="outline-none data-[state=open]:text-primary">
                        <a
                          href="/#products"
                          className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 cursor-pointer relative group ${isScrolled || !isHomePage
                            ? (isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary')
                            : (isActive ? 'text-white' : 'text-white/80 hover:text-white')
                            }`}
                          onClick={() => setIsProductsOpen(false)}
                        >
                          {item.name}
                          <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </a>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        sideOffset={20}
                        className="w-64 p-2 bg-background/80 backdrop-blur-2xl border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200 rounded-xl"
                        onMouseEnter={() => setIsProductsOpen(true)}
                        onMouseLeave={() => setIsProductsOpen(false)}
                      >
                        {[
                          { path: "all", label: "All Products" },
                          { path: "glass", label: "Glass Solutions" },
                          { path: "plywood", label: "Plywood & Boards" },
                          { path: "hardware", label: "Locks & Hardware" },
                          { path: "accessories", label: "Interior Accessories" }
                        ].map((subItem) => (
                          <DropdownMenuItem key={subItem.path} asChild className="focus:bg-transparent p-0">
                            <Link
                              to={`/products?category=${subItem.path}`}
                              className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
                              onClick={() => setIsProductsOpen(false)}
                            >
                              {subItem.label}
                              <ChevronDown className="w-4 h-4 opacity-0 -rotate-90 group-hover:opacity-100 transition-all duration-200 translate-x-[-4px] group-hover:translate-x-0" />
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              }

              return (
                <a
                  key={item.name}
                  href={linkHref}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${isScrolled || !isHomePage
                    ? (isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary')
                    : (isActive ? 'text-white' : 'text-white/80 hover:text-white')
                    }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                </a>
              );
            })}
          </div>

          {/* Desktop CTA & Mode Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              onClick={() => {
                if (window.location.pathname !== '/') {
                  window.location.href = '/#contact';
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`rounded-full px-6 transition-all duration-300 ${isScrolled
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-lg'
                : 'bg-white text-black hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg'
                }`}
            >
              Get Free Consultation
            </Button>
            <div className="scale-75 origin-center">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu Button & Mode Toggle */}
          <div className="lg:hidden flex items-center space-x-4">
            <div className="scale-75 origin-right">
              <ModeToggle />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={isScrolled ? 'text-foreground' : 'text-white'}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border bg-background/95 backdrop-blur-xl rounded-2xl p-4 absolute left-4 right-4 shadow-xl animate-in slide-in-from-top-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                const isHashLink = item.href.startsWith('#');
                const linkHref = isHashLink ? `/${item.href}` : item.href;

                if (item.name === 'Products') {
                  // Simple link for mobile for now, to specific page
                  return (
                    <Link
                      key={item.name}
                      to="/products"
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground/80 hover:bg-muted'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Products
                    </Link>
                  )
                }

                return (
                  <a
                    key={item.name}
                    href={linkHref}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:bg-muted'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-border/50">
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (window.location.pathname !== '/') {
                      window.location.href = '/#contact';
                    } else {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Free Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;