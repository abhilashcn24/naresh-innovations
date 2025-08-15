import { useEffect, useRef } from 'react';
import { Sparkles, Home, Lock, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProductsSection = () => {
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

  const products = [
    {
      icon: Sparkles,
      title: 'Premium Glass Solutions',
      description: 'Tempered glass, frosted glass, decorative glass panels, and custom glass installations for modern interiors.',
      features: ['Tempered Safety Glass', 'Decorative Panels', 'Custom Designs', 'Professional Installation'],
      color: 'from-emerald-500/20 to-green-500/20',
    },
    {
      icon: Layers,
      title: 'Quality Plywood & Boards',
      description: 'High-grade plywood, MDF, HDF, and specialty boards for furniture, cabinets, and architectural applications.',
      features: ['Premium Plywood', 'MDF & HDF Boards', 'Waterproof Options', 'Eco-Friendly Materials'],
      color: 'from-lime-500/20 to-green-400/20',
    },
    {
      icon: Lock,
      title: 'Designer Locks & Handles',
      description: 'Luxury door handles, cabinet hardware, security locks, and architectural fittings from premium brands.',
      features: ['Designer Handles', 'Security Locks', 'Cabinet Hardware', 'Architectural Fittings'],
      color: 'from-green-600/20 to-emerald-600/20',
    },
    {
      icon: Home,
      title: 'Interior Accessories',
      description: 'Complete range of interior accessories, hinges, brackets, and specialized hardware for finishing touches.',
      features: ['Hinges & Brackets', 'Sliding Systems', 'Lighting Fixtures', 'Finishing Hardware'],
      color: 'from-green-500/20 to-lime-500/20',
    },
  ];

  return (
    <section id="products" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 luxury-fade-up">
          <h2 className="heading-lg text-primary mb-4 font-serif">Our Premium Products</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of premium materials and hardware solutions, 
            carefully curated to bring luxury and functionality to your interior spaces.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card
              key={index}
              className="luxury-scale-in group relative overflow-hidden border-border hover:shadow-luxury transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <product.icon className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-primary group-hover:text-accent transition-colors duration-300">
                  {product.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <button className="text-accent font-medium hover:text-primary transition-colors duration-300 group">
                    Learn More
                    <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center luxury-fade-up">
          <div className="bg-gradient-luxury p-8 rounded-2xl text-primary-foreground">
            <h3 className="heading-md mb-4 font-serif">Need Custom Solutions?</h3>
            <p className="body-md mb-6 opacity-90">
              Our experts can help you find the perfect materials and hardware for your specific project requirements.
            </p>
            <button className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105">
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;