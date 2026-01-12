'use client';

import { ProductSpecification } from '@/types/product';
import { motion } from 'framer-motion';

interface ProductSpecsProps {
  specifications: ProductSpecification[];
}

export default function ProductSpecs({ specifications }: ProductSpecsProps) {
  return (
    <div className="space-y-8">
      {specifications.map((specGroup, groupIndex) => (
        <motion.div
          key={specGroup.group}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.1 }}
          className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
        >
          <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-900">{specGroup.group}</h3>
          </div>
          <div className="divide-y divide-neutral-100">
            {specGroup.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors"
              >
                <div className="text-sm font-medium text-neutral-600">{item.label}</div>
                <div className="text-sm font-semibold text-neutral-900">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
