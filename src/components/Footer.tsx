import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    '2D/3D Design Planning',
    'Interior Consultation',
    'Turnkey Execution',
    'Quality Assurance',
    'Project Management',
    'After-Sales Support',
  ];

  const products = [
    'Premium Glass Solutions',
    'Quality Plywood & Boards',
    'Designer Locks & Handles',
    'Interior Accessories',
    'Lighting Fixtures',
    'Custom Hardware',
  ];

  return (
    <footer className="bg-luxury-charcoal text-luxury-charcoal-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-luxury rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">N</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Naresh Innovations</h3>
                <p className="text-sm text-luxury-charcoal-foreground/80">Crafting Dream Interiors</p>
              </div>
            </div>
            
            <p className="text-luxury-charcoal-foreground/80 leading-relaxed">
              Transform your space with our premium interior solutions. From concept to completion, 
              we bring luxury and functionality together in perfect harmony.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-sm">Mysuru, Karnataka, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-sm">+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-sm">info@nareshinnovations.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm">Mon - Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-luxury-charcoal-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-luxury-charcoal-foreground/80 text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Our Products</h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product}>
                  <span className="text-luxury-charcoal-foreground/80 text-sm">
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-luxury-charcoal-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-luxury-charcoal-foreground/80">Follow us:</span>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-luxury-charcoal-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-luxury-charcoal-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-luxury-charcoal-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-luxury-charcoal-foreground/80 text-sm">Get updates:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-luxury-charcoal-foreground/10 border border-luxury-charcoal-foreground/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent text-luxury-charcoal-foreground placeholder-luxury-charcoal-foreground/60"
                />
                <button className="px-6 py-2 bg-accent text-accent-foreground rounded-r-lg hover:bg-accent/90 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-luxury-charcoal-foreground/20 bg-luxury-charcoal/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-luxury-charcoal-foreground/60">
              © {currentYear} Naresh Innovations. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-luxury-charcoal-foreground/60">
              <a href="#" className="hover:text-accent transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;