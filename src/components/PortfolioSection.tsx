import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Helper component for the auto-sliding card
const PortfolioCard = ({ title, categoryId, images, navigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) return null;

    const currentImage = images[currentIndex];

    return (
        <div
            className="portfolio-card group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            onClick={() => navigate(`/portfolio?category=${encodeURIComponent(categoryId)}`)}
        >
            {/* Image Slider */}
            {images.map((img, idx) => (
                <img
                    key={img.id || idx}
                    src={img.src}
                    alt={img.alt || title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                        }`}
                />
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-6 w-full">
                    <p className="text-primary font-medium text-sm mb-1 uppercase tracking-wider">
                        {categoryId === 'office space' ? 'Commercial' : 'Residential'}
                    </p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-white text-2xl font-bold">
                            {title}
                        </h3>
                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                            <ArrowUpRight className="text-white w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress indicators (dots) */}
            <div className="absolute bottom-4 right-6 flex gap-1 z-10">
                {images.slice(0, 5).map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-primary' : 'w-1.5 bg-white/30'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

const PortfolioSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [kitchens, setKitchens] = useState([]);
    const [bedrooms, setBedrooms] = useState([]);
    const [offices, setOffices] = useState([]);

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

        const elements = document.querySelectorAll('.portfolio-card');
        elements.forEach((el) => observer.observe(el));

        // Fetch projects from static JSON
        fetch('/portfolio.json')
            .then(res => res.json())
            .then(data => {
                // Filter data into categories
                setKitchens(data.filter((p: any) => p.category.toLowerCase().includes('kitchen')));
                setBedrooms(data.filter((p: any) => p.category.toLowerCase().includes('bedroom')));
                setOffices(data.filter((p: any) => p.category.toLowerCase().includes('office')));
            })
            .catch(err => {
                console.error("Failed to load portfolio on home:", err);
            });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="portfolio" className="section-container">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-4 max-w-2xl">
                    <h2 className="heading-lg text-foreground">Featured Works</h2>
                    <p className="body-lg text-muted-foreground">
                        A glimpse into our portfolio. Click on a category to explore our complete collection.
                    </p>
                </div>
                <Button
                    variant="ghost"
                    className="hidden md:inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-colors"
                    onClick={() => navigate('/portfolio')}
                >
                    View All Projects <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Render the 3 Category Cards */}
                <PortfolioCard
                    title="Modular Kitchens"
                    categoryId="kitchens"
                    images={kitchens}
                    navigate={navigate}
                />
                <PortfolioCard
                    title="Bedrooms & Wardrobes"
                    categoryId="bedrooms"
                    images={bedrooms}
                    navigate={navigate}
                />
                <PortfolioCard
                    title="Office Spaces"
                    categoryId="office space"
                    images={offices}
                    navigate={navigate}
                />
            </div>

            <div className="mt-8 text-center md:hidden">
                <Button
                    variant="ghost"
                    className="inline-flex items-center font-semibold text-primary"
                    onClick={() => navigate('/portfolio')}
                >
                    View All Projects <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </section>
    );
};

export default PortfolioSection;
