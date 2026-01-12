'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/button';
import ProductCard from '@/components/molecules/productCard';
import ProductTabs from '@/components/organisms/productTabs';
import ProductSpecs from '@/components/organisms/productSpecs';
import ReviewSystem from '@/components/organisms/reviewSystem';
import { products } from '@/data/products';
import { getReviewsByProductSlug, getReviewSummaryByProductSlug } from '@/data/reviews';
import { useCartStore } from '@/store/useCartStore';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  const { addItem } = useCartStore();

  const product = products.find((p) => p.slug === slug);
  const reviews = getReviewsByProductSlug(slug);
  const reviewSummary = getReviewSummaryByProductSlug(slug);

  if (!product) {
    notFound();
  }

  // Set default state
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      if (product.sizes?.length) setSelectedSize(product.sizes[0]);
      if (product.colors?.length) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      slug: product.slug,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Stock status
  const getStockStatus = () => {
    if (product.stock === 0) return { text: 'Out of Stock', color: 'text-red-600' };
    if (product.stock < 10) return { text: `Only ${product.stock} left in stock`, color: 'text-orange-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  };

  const stockStatus = getStockStatus();

  // Prepare tabs content
  const tabs = [
    {
      id: 'description',
      label: 'Description',
      content: (
        <div className="prose prose-neutral max-w-none">
          <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
            {product.fullDescription || product.description}
          </p>
          {product.features && product.features.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.warranty && (
            <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-bold text-neutral-900 mb-2">Warranty</h4>
              <p className="text-sm text-neutral-700">{product.warranty}</p>
            </div>
          )}
          {product.shipping && (
            <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-bold text-neutral-900 mb-2">Shipping Information</h4>
              <p className="text-sm text-neutral-700">{product.shipping}</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  // Add specifications tab if available
  if (product.specifications && product.specifications.length > 0) {
    tabs.push({
      id: 'specifications',
      label: 'Specifications',
      content: <ProductSpecs specifications={product.specifications} />,
    });
  }

  // Add reviews tab if available
  if (reviews.length > 0 && reviewSummary) {
    tabs.push({
      id: 'reviews',
      label: `Reviews (${reviewSummary.totalReviews})`,
      content: <ReviewSystem reviews={reviews} summary={reviewSummary} />,
    });
  }

  return (
    <div className="bg-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden"
            >
              <Image
                src={activeImage || product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[product.image, ...(product.images || [])].slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === img
                    ? 'border-primary'
                    : 'border-transparent hover:border-neutral-200'
                    }`}
                >
                  <Image src={img} alt={`${product.name} view ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-bold rounded-full uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-yellow-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-200 fill-current'
                      }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-neutral-500">
                {product.rating.toFixed(1)} ({product.reviews} Reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-3xl font-bold text-neutral-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-400 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span className={`text-sm font-bold ${stockStatus.color}`}>{stockStatus.text}</span>
            </div>

            <p className="text-neutral-600 leading-relaxed mb-8">{product.description}</p>

            {/* Selectors */}
            <div className="space-y-6 mb-8 border-t border-b border-neutral-100 py-8">
              {product.sizes && (
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 mb-3">SIZE</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-12 flex items-center justify-center border rounded-lg px-4 text-sm font-medium transition-all ${selectedSize === size
                          ? 'border-primary bg-primary text-white'
                          : 'border-neutral-200 text-neutral-900 hover:border-neutral-900'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && (
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 mb-3">COLOR</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`h-12 px-6 flex items-center justify-center border rounded-lg text-sm font-medium transition-all ${selectedColor === color
                          ? 'border-primary text-primary bg-primary/5'
                          : 'border-neutral-200 text-neutral-900 hover:border-neutral-900'
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex sm:flex-row flex-col gap-4">
              <div className="flex items-center border border-neutral-200 rounded-lg h-14 w-full sm:w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-neutral-500 hover:text-neutral-900"
                >
                  -
                </button>
                <div className="flex-1 text-center font-medium">{quantity}</div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-neutral-500 hover:text-neutral-900"
                >
                  +
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1 h-14 text-lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {isAdded ? 'Added to Cart!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>

            {/* Features/Tags */}
            {product.tags && (
              <div className="mt-8 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-24">
          <ProductTabs tabs={tabs} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
