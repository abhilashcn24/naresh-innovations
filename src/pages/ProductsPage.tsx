import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Layers, Box, Lock, Lightbulb, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import ProductCard from '@/components/ProductCard';

// Load all product images from assets
const productImagesRaw = import.meta.glob('@/assets/products/**/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' });

const getCategoryImages = (category: string) => {
    return Object.keys(productImagesRaw)
        .filter(path => path.includes(`/${category}/`))
        .map(path => productImagesRaw[path]);
};

// Helper to generate placeholder sub-products
const generateSubProducts = (categoryName: string, images?: string[], count: number = 8) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `${categoryName}-${i}`,
        title: `${categoryName} Style ${i + 1}`,
        description: `High-quality ${categoryName.toLowerCase()} variant featuring premium finish and durability.`,
        image: images && images.length > 0 ? images[i % images.length] : `https://placehold.co/600x400/2a2a2a/FFF?text=${categoryName}+${i + 1}`
    }));
};

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openProduct, setOpenProduct] = useState<any>(null);

    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            setSelectedCategory(category);
        }
    }, [searchParams]);

    const categories = [
        { value: 'all', label: 'All Products' },
        { value: 'glass', label: 'Glass Solutions' },
        { value: 'plywood', label: 'Plywood & Boards' },
        { value: 'hardware', label: 'Locks & Hardware' },
        { value: 'accessories', label: 'Interior Accessories' },
    ];

    const products = [
        {
            id: 'glass-1',
            category: 'glass',
            title: 'Premium Glass Solutions',
            description: 'Tempered, frosted, and decorative glass for modern interiors. Perfect for partitions, shower enclosures, and aesthetic elements.',
            images: getCategoryImages('glass'),
            features: ['Tempered Safety Glass', 'Frosted Designs', 'Custom Sizes', 'UV Resistant'],
            subProducts: generateSubProducts('Glass Design', getCategoryImages('glass'))
        },
        {
            id: 'plywood-1',
            category: 'plywood',
            title: 'Commercial Plywood',
            description: 'High-grade commercial plywood suitable for all interior furniture needs. Durable and termite resistant.',
            images: getCategoryImages('plywood').slice(0, 3), // Distribute if needed
            features: ['Termite Resistant', 'Water Resistant', 'High Strength', 'Smooth Finish'],
            subProducts: generateSubProducts('Commercial Ply', getCategoryImages('plywood'))
        },
        {
            id: 'plywood-2',
            category: 'plywood',
            title: 'Marine Grade Plywood',
            description: 'Superior quality marine plywood for kitchens and bathrooms. Waterproof and long-lasting.',
            images: getCategoryImages('plywood').slice(3), // Use rest or duplicate
            features: ['100% Waterproof', 'Boiling Water Proof', 'Marine Grade', 'Lifetime Warranty'],
            subProducts: generateSubProducts('Marine Ply', getCategoryImages('plywood'))
        },
        {
            id: 'hardware-1',
            category: 'hardware',
            title: 'Designer Locks & Handles',
            description: 'Luxury hardware that adds a finishing touch of elegance. Secure and stylish locking mechanisms.',
            images: getCategoryImages('accessories'),
            features: ['Digital Locks', 'Mortise Handles', 'Brass Finishes', 'High Security'],
            subProducts: generateSubProducts('Lock Design', getCategoryImages('accessories'))
        },
        {
            id: 'accessories-1',
            category: 'accessories',
            title: 'Smart Lighting Solutions',
            description: 'Intelligent lighting systems to set the perfect mood. App-controlled and energy efficient.',
            images: getCategoryImages('hardware'),
            features: ['App Control', 'RGB Color Changing', 'Voice Activation', 'Dimming Capable'],
            subProducts: generateSubProducts('Light Fixture', getCategoryImages('hardware'))
        },
        {
            id: 'accessories-2',
            category: 'accessories',
            title: 'Kitchen Organizers',
            description: 'Maximize your kitchen space with our smart organizers. Cutlery trays, aesthetic bottle pull-outs and more.',
            images: getCategoryImages('hardware'), // Reuse for now or add specific folder
            features: ['Stainless Steel', 'Soft Close', 'Modular Design', 'Rust Proof'],
            subProducts: generateSubProducts('Organizer', getCategoryImages('hardware'))
        }
    ];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <main className="min-h-screen bg-background text-foreground animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Navigation />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="text-center mb-16 space-y-6">
                    <h1 className="heading-xl leading-tight">
                        <span className="font-light">Our Premium</span> <span className="font-bold text-primary">Collections</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl md:text-2xl font-light text-muted-foreground tracking-wide leading-relaxed">
                        Explore our curated range of high-quality materials. Click on any collection to view detailed designs.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <Button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            variant={selectedCategory === cat.value ? "default" : "outline"}
                            className={`rounded-full px-6 py-2 h-auto text-sm md:text-base transition-all ${selectedCategory === cat.value
                                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                : "hover:bg-primary/10 hover:border-primary/30"
                                }`}
                        >
                            {cat.label}
                        </Button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => setOpenProduct(product)}
                        >
                            {/* Product Image Header */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={product.images && product.images.length > 0 ? product.images[0] : `https://placehold.co/600x400/2a2a2a/FFF?text=${product.title}`}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{product.title}</h3>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                                    {product.description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {product.features.map((feature, i) => (
                                        <div key={i} className="flex items-center text-sm text-foreground/80">
                                            <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <Button className="w-full rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors mt-auto">
                                    View Collection
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>No products found in this category.</p>
                    </div>
                )}
            </div>



            <AnimatePresence>
                {openProduct && (
                    <Dialog open={!!openProduct} onOpenChange={(open) => !open && setOpenProduct(null)}>
                        <DialogContent className="max-w-7xl w-full h-[95vh] flex flex-col p-0 bg-background/95 backdrop-blur-2xl border-white/10 overflow-hidden !rounded-3xl [&>button]:hidden">
                            <motion.div
                                layoutId={`product-${openProduct.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="flex flex-col h-full"
                            >
                                {/* Header with Hero Image */}
                                <div className="relative h-64 md:h-80 shrink-0 overflow-hidden">
                                    <img
                                        src={openProduct.images && openProduct.images.length > 0 ? openProduct.images[0] : (openProduct.image || `https://placehold.co/600x400/2a2a2a/FFF?text=${openProduct.title}`)}
                                        alt={openProduct.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-8 md:p-12">
                                        <p className="text-primary font-medium text-xs mb-2 uppercase tracking-widest">
                                            {openProduct.category}
                                        </p>
                                        <DialogTitle asChild>
                                            <motion.h2
                                                layoutId={`product-title-${openProduct.id}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-4xl md:text-5xl font-bold mb-4"
                                            >
                                                {openProduct.title}
                                            </motion.h2>
                                        </DialogTitle>
                                        <DialogDescription asChild>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-xl text-muted-foreground max-w-3xl"
                                            >
                                                {openProduct.description}
                                            </motion.p>
                                        </DialogDescription>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-4 right-4 bg-black/20 backdrop-blur-md hover:bg-black/40 text-white rounded-full"
                                        onClick={() => setOpenProduct(null)}
                                    >
                                        <X size={24} />
                                    </Button>
                                </div>

                                {/* Content Grid */}
                                <div className="flex-1 overflow-y-auto p-8 md:p-12">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-2xl font-semibold">Featured Designs</h3>
                                        <div className="flex gap-2">

                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {openProduct.subProducts?.map((sub: any, idx: number) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1 + idx * 0.05 }}
                                                className="group/item space-y-4"
                                            >
                                                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted relative shadow-md group-hover/item:shadow-xl transition-all duration-500">
                                                    <img
                                                        src={sub.image}
                                                        alt={sub.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                        <p className="text-white text-sm line-clamp-3 mb-4 translate-y-4 group-hover/item:translate-y-0 transition-transform duration-300 font-light">
                                                            {sub.description}
                                                        </p>

                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg leading-tight group-hover/item:text-primary transition-colors">{sub.title}</h4>
                                                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Premium Series</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </DialogContent>
                    </Dialog>
                )}
            </AnimatePresence>
        </main>
    );
};

export default ProductsPage;
