'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '@/store/useProductStore';
import { useUIStore } from '@/store/useUIStore';
import ProductCard from '@/components/molecules/productCard';
import { Product } from '@/types/product';
import { useDebounce } from '@/hooks/useDebounce';

// ...

export default function SearchModal() {
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const { products } = useProductStore();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300); // 300ms delay
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery(''); // Reset query when closed
    }
  }, [isSearchOpen]);

  // Search logic
  useEffect(() => {
    if (debouncedQuery.length > 0) {
      const searchBox = debouncedQuery.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchBox) ||
          p.category.toLowerCase().includes(searchBox) ||
          p.tags?.some((t) => t.toLowerCase().includes(searchBox))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, products]);

  const handleClose = () => {
    setSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <div className="min-h-screen px-4 py-8 md:py-20 max-w-7xl mx-auto flex flex-col items-center">

              {/* Search Container */}
              <div className="w-full max-w-3xl relative mb-12">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for gear, training..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full text-3xl md:text-5xl font-black bg-transparent border-b-2 border-neutral-200 py-4 text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-primary transition-colors text-center"
                />

                <button
                  onClick={handleClose}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-all"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Results Gallery */}
              <div className="w-full">
                {query && results.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {results.map((product) => (
                      <div key={product.id} onClick={handleClose}>
                        <ProductCard {...product} />
                      </div>
                    ))}
                  </motion.div>
                ) : query && results.length === 0 ? (
                  <div className="text-center text-neutral-500 mt-12">
                    <p className="text-xl">No results found for "{query}"</p>
                    <p className="mt-2">Try checking your spelling or using different keywords.</p>
                  </div>
                ) : (
                  // Suggested / Trending State (Empty query)
                  <div className="w-full max-w-4xl mx-auto opacity-60 hover:opacity-100 transition-opacity">
                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6 text-center">Popular Searches</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {['Barbells', 'Nano X3', 'Kettlebells', 'Jump Rope', 'Apparel'].map(term => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-5 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary transition-colors font-medium"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
