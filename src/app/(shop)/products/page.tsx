'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/button';
import ProductCard from '@/components/molecules/productCard';
import ProductFilter from '@/components/organisms/productFilter';
import { useProductStore } from '@/store/useProductStore';

export default function ProductsPage() {
  const { filteredProducts, setSort, sort } = useProductStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-neutral-50 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-neutral-900">Shop All</h1>
            <p className="text-neutral-500 mt-1">
              Showing {filteredProducts.length} results
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Filters
            </Button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium focus:outline-none focus:border-primary"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <ProductFilter />
          </div>

          {/* Mobile Filter Drawer */}
          {isFilterOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsFilterOpen(false)}>
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <ProductFilter />
              </motion.div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-neutral-300">
                <p className="text-neutral-500 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
