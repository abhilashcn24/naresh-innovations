import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
    title: string;
    category: string;
    images: string[];
    id: string;
    navigate?: (path: string) => void;
    onClick?: () => void;
}

const ProductCard = ({ title, category, images, id, navigate, onClick }: ProductCardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // Ensure we have at least some images to prevent crashes
    const displayImages = images && images.length > 0 ? images : [
        `https://placehold.co/600x800/2a2a2a/FFF?text=${title ? title.replace(' ', '+') : 'Product'}`
    ];

    useEffect(() => {
        if (displayImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % displayImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [displayImages.length]);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    };

    const handleCardClick = () => {
        if (onClick) {
            onClick();
        } else if (navigate) {
            navigate(`/products?category=${id}`);
        }
    };

    return (
        <div
            className="product-card group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50"
            onClick={handleCardClick}
        >
            {/* Image Slider */}
            {displayImages.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    alt={`${title} - ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                        }`}
                />
            ))}



            {/* Glassmorphism Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none">
                {/* Bottom Info Panel with Blur */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/30 backdrop-blur-xl border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="flex justify-between items-end">
                        <div className="flex-1">
                            <h3 className="text-white text-2xl font-bold leading-tight mb-1">
                                {title}
                            </h3>
                            <p className="text-white/70 text-sm font-light">
                                {category}
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-10">
                
            </div>
        </div>
    );
}

export default ProductCard;
