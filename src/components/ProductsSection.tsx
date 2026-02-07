import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Load all product images from assets
const productImagesRaw = import.meta.glob('@/assets/products/**/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' });

const getCategoryImages = (category: string) => {
  return Object.keys(productImagesRaw)
    .filter(path => path.includes(`/${category}/`))
    .map(path => productImagesRaw[path]);
};

const productCategories = [
  {
    id: 'glass',
    title: 'Premium Glass Solutions',
    category: 'Glass Partition',
    images: getCategoryImages('glass')
  }, {
    id: 'plywood',
    title: 'Plywood & Boards',
    category: 'Commercial Ply',
    images: getCategoryImages('plywood')
  }, {
    id: 'hardware',
    title: 'Designer Hardware',
    category: 'Locks & Handles',
    images: getCategoryImages('hardware')
  }, {
    id: 'accessories',
    title: 'Others',
    category: 'Smart Solutions',
    images: getCategoryImages('accessories')
  }
];

import ProductCard from './ProductCard';

const ProductsSection = () => {
  const navigate = useNavigate();

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

    const elements = document.querySelectorAll('.product-card');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" className="section-container bg-muted/30">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-4 max-w-2xl">
          <h2 className="heading-lg text-foreground">Our Premium Collections</h2>
          <p className="body-lg text-muted-foreground">
            Sourced from the world's finest manufacturers. Explore our exclusive range of materials and accessories.
          </p>
        </div>
        <Button
          variant="default"
          className="hidden md:inline-flex items-center rounded-full px-6"
          onClick={() => navigate('/products')}
        >
          View Catalogue
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productCategories.map((prod, index) => (
          <ProductCard
            key={index}
            {...prod}
            navigate={navigate}
          />
        ))}
      </div>

      <div className="mt-12 text-center md:hidden">
        <Link to="/products">
          <Button size="lg" className="rounded-full w-full">
            View Catalogue
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProductsSection;