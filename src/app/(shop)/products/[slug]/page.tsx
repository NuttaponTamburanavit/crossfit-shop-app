'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/button';
import ProductCard from '@/components/molecules/productCard';
import { products } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  const { addItem } = useCartStore();

  const product = products.find((p) => p.slug === params.slug);

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
      slug: product.slug, // Ensure cart item has slug for linking back
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-white pt-24 pb-20">
      <div className="container mx-auto px-4">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
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

            {/* Thumbnails (Mocking multiple images by reusing the main one + others if available) */}
            <div className="grid grid-cols-4 gap-4">
              {[product.image, ...(product.images || [])].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary' : 'border-transparent hover:border-neutral-200'
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
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-200 fill-current'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-neutral-500">{product.reviews} Reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-bold text-neutral-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-400 line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="text-neutral-600 leading-relaxed mb-8">
              {product.description}
            </p>

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
              >
                {isAdded ? 'Added to Cart!' : 'Add to Cart'}
              </Button>
            </div>

            {/* Features/Tags */}
            {product.tags && (
              <div className="mt-8 flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          <div className="bg-neutral-50 rounded-2xl p-8 text-center">
            <p className="text-neutral-500">Reviews functionality coming soon.</p>
          </div>
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
