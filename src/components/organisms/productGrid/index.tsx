'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/molecules/productCard';

const products = [
  {
    id: '1',
    name: 'Pro Training Barbell 20kg',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600',
    category: 'Weightlifting',
    rating: 5,
    isNew: true,
  },
  {
    id: '2',
    name: 'CrossFit Nano X3 Training Shoes',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600',
    category: 'Footwear',
    rating: 4,
  },
  {
    id: '3',
    name: 'Competition Kettlebell Set',
    price: 189.99,
    originalPrice: 229.99,
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600',
    category: 'Weightlifting',
    rating: 5,
  },
  {
    id: '4',
    name: 'Performance Tank Top',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    category: 'Apparel',
    rating: 4,
    isNew: true,
  },
  {
    id: '5',
    name: 'Olympic Weight Plates 25kg',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600',
    category: 'Weightlifting',
    rating: 5,
  },
  {
    id: '6',
    name: 'Leather Lifting Belt',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
    category: 'Accessories',
    rating: 4,
  },
  {
    id: '7',
    name: 'Speed Jump Rope Pro',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600',
    category: 'Accessories',
    rating: 5,
    isNew: true,
  },
  {
    id: '8',
    name: 'Compression Training Shorts',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1562771379-eafdca7a02f8?w=600',
    category: 'Apparel',
    rating: 4,
  },
];

export default function ProductGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Top Picks
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mt-2">
            Best Sellers
          </h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            Discover our most popular CrossFit gear, trusted by athletes worldwide.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="/products"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-neutral-900 text-neutral-900 font-semibold rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
          >
            View All Products
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
