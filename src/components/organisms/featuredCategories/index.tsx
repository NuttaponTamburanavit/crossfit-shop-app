'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: '1',
    name: 'Weightlifting',
    slug: 'weightlifting',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600',
    count: 45,
  },
  {
    id: '2',
    name: 'Training Footwear',
    slug: 'footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    count: 32,
  },
  {
    id: '3',
    name: 'Performance Apparel',
    slug: 'apparel',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600',
    count: 78,
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600',
    count: 56,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Shop by Category
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mt-2">
            Featured Categories
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link
                href={`/categories/${category.slug}`}
                className="group relative block aspect-[4/5] rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-neutral-300 text-sm">
                    {category.count} Products
                  </p>

                  {/* Arrow */}
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="absolute bottom-6 right-6 w-10 h-10 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-5 h-5 text-white"
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
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
