import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Star, User, Calendar } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// Categories matching folder names in public/portfolio
const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'kitchens', label: 'Modular Kitchens' },
    { id: 'bedrooms', label: 'Bedrooms & Wardrobes' },
    { id: 'office space', label: 'Office Spaces' },
];

const PortfolioPage = () => {
    const [searchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const category = searchParams.get('category');
        if (category && categories.some(c => c.id === category)) {
            setActiveCategory(category);
        }
    }, [searchParams]);

    useEffect(() => {
        fetch('http://localhost:3001/api/portfolio-images')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch portfolio images:", err);
                setIsLoading(false);
            });
    }, []);

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter((p: any) => p.category === activeCategory);

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const handleProjectClick = (index: number) => {
        setSelectedIndex(index);
    };

    const handleClose = () => {
        setSelectedIndex(-1);
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev + 1) % filteredProjects.length);
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === -1) return;
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex]);

    const activeProject = selectedIndex >= 0 ? filteredProjects[selectedIndex] : null;

    return (
        <main className="min-h-screen bg-background text-foreground animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Navigation />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="text-center mb-16 space-y-6">
                    <h1 className="heading-xl leading-tight">
                        <span className="font-light">Our</span> <span className="font-bold text-primary">Portfolio</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl md:text-2xl font-light text-muted-foreground tracking-wide leading-relaxed">
                        Explore our diverse collection of premium interiors, from functional modular kitchens to luxurious bedroom suites.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <div key={cat.id}>
                            <Button
                                onClick={() => { setActiveCategory(cat.id); setSelectedIndex(-1); }}
                                variant={activeCategory === cat.id ? "default" : "outline"}
                                className={`rounded-full px-8 py-2 transition-all ${activeCategory === cat.id
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-primary/10"
                                    }`}
                            >
                                {cat.label}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Gallery Grid - Reverted to Card Style with Badge and Gradient */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project, index) => (
                                <div
                                    key={project.id || index}
                                    onClick={() => handleProjectClick(index)}
                                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-muted/20 aspect-[4/5] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <img
                                        src={project.src}
                                        alt={project.alt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/FFF?text=Image+Not+Found';
                                        }}
                                    />

                                    {/* Top Badge */}
                                    <div className="absolute top-4 left-4 z-10">

                                    </div>

                                    {/* Hover Zoom Overlay */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-0 pointer-events-none">
                                        <div className="bg-white/20 backdrop-blur-md text-white rounded-full p-4 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                            <ZoomIn className="w-8 h-8" />
                                        </div>
                                    </div>

                                    {/* Permanent Bottom Card Content - Gradient Style */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-24 flex flex-col justify-end">
                                        <h3 className="text-white font-bold text-xl mb-2 line-clamp-1">{project.alt}</h3>
                                        <p className="text-white/80 text-sm mb-4 line-clamp-2 font-light leading-relaxed">
                                            Experience the perfect blend of functionality and aesthetics with this custom-designed interior solution.
                                        </p>

                                        <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-2">
                                            <div className="flex items-center gap-2 text-white/90 text-xs font-medium">
                                                <User className="w-3 h-3" />
                                                <span>Naresh Innovations</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white/60 text-xs">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredProjects.length === 0 && (
                            <div className="col-span-full py-20 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                                <p>No images uploaded for this category yet.</p>
                                <p className="text-sm mt-2">Add images to <span className="font-mono text-primary">/public/portfolio/{activeCategory}</span></p>
                            </div>
                        )}
                    </>
                )}
            </div>



            {/* Lightbox / Image Viewer - Refined as Card Overlay */}
            <AnimatePresence>
                {selectedIndex !== -1 && activeProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl" // Darker semi-transparent bg + heavy blur
                        onClick={handleClose}
                    >
                        {/* Lightbox is now a "Card" floating above */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl h-[85vh] mx-4 md:mx-10 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button - Now inside the card top-right */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full z-[60]"
                                onClick={handleClose}
                            >
                                <X className="w-6 h-6" />
                            </Button>

                            {/* Main Image Area with Navigation */}
                            <div className="flex-1 relative w-full h-full flex items-center justify-center">
                                {/* Navigation Buttons - Integrated on sides */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 rounded-full z-[60] h-12 w-12 hidden md:flex transition-all"
                                    onClick={handlePrev}
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 rounded-full z-[60] h-12 w-12 hidden md:flex transition-all"
                                    onClick={handleNext}
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </Button>

                                <TransformWrapper
                                    initialScale={1}
                                    minScale={1}
                                    maxScale={4}
                                >
                                    {({ zoomIn, zoomOut, resetTransform }) => (
                                        <TransformComponent wrapperClass="!w-full !h-full flex items-center justify-center" contentClass="!w-full !h-full flex items-center justify-center">
                                            <img
                                                src={activeProject.src}
                                                alt={activeProject.alt}
                                                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                                            />
                                        </TransformComponent>
                                    )}
                                </TransformWrapper>
                            </div>

                            {/* Card Footer - Minimal metadata inside the modal */}
                            <div className="p-6 border-t border-white/5 bg-black/20 flex justify-between items-center text-white/60 text-sm">
                                <div>
                                    <span className="font-medium text-white">{activeProject.alt}</span>
                                    <span className="mx-2">•</span>
                                    <span>{activeCategory === 'all' ? 'Portfolio' : categories.find(c => c.id === activeCategory)?.label}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs">{selectedIndex + 1} of {filteredProjects.length}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default PortfolioPage;
