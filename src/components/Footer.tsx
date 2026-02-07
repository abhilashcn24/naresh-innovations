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
    <footer className="bg-luxury-charcoal text-luxury-charcoal-foreground text-sm">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
                <img
                  src="/logo.png"
                  alt="NI"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold">Nāresh Innovations</h3>
            </div>

            <div className="space-y-2 opacity-80">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <span className="text-xs leading-relaxed">#673, 'M' block, Kuvempu Nagar 2nd Stage, Nrupathunga Road, Mysuru-570023</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-xs">+91 9880079820</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-xs">nareshinnovations@yahoo.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex justify-around md:justify-start md:gap-12">
            <div>
              <h4 className="text-base font-semibold mb-3 text-accent">Links</h4>
              <ul className="space-y-1">
                {quickLinks.slice(0, 4).map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-xs hover:text-accent transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-3 text-accent">Products</h4>
              <ul className="space-y-1">
                {products.slice(0, 4).map((product) => (
                  <li key={product} className="text-xs opacity-80">{product}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-xs opacity-70">Follow us:</span>
              <a
                href="https://www.instagram.com/naresh_innovations_official/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <div className="text-xs opacity-50 text-right">
              © {currentYear} Nāresh Innovations.<br />All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;