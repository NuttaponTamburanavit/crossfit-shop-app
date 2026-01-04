'use client';

import { motion } from 'framer-motion';
import Button from '@/components/atoms/button';
import { useProductStore } from '@/store/useProductStore';
import { categories } from '@/data/products';
import {
  filterStyles,
  sectionStyles,
  checkboxStyles
} from './index.style';

export default function ProductFilter() {
  const {
    category,
    priceRange,
    sizes,
    setCategory,
    setPriceRange,
    toggleSize,
    toggleColor,
    colors,
    resetFilters,
  } = useProductStore();

  const handlePriceChange = (index: 0 | 1, value: string) => {
    const val = parseInt(value) || 0;
    const newRange = [...priceRange] as [number, number];
    newRange[index] = val;
    setPriceRange(newRange);
  };

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'];
  const availableColors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Navy', 'Grey'];

  return (
    <aside className={filterStyles.container}>
      <div className={filterStyles.header}>
        <h3 className="font-bold text-lg">Filters</h3>
        <button onClick={resetFilters} className={filterStyles.resetButton}>
          Reset
        </button>
      </div>

      {/* Categories */}
      <div className={sectionStyles.wrapper}>
        <h4 className={sectionStyles.title}>Categories</h4>
        <div className="flex flex-col gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c === 'All' ? null : c)}
              className={`${sectionStyles.categoryItem} ${(c === 'All' && !category) || category === c
                ? 'text-primary font-bold'
                : 'text-neutral-600'
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className={sectionStyles.wrapper}>
        <h4 className={sectionStyles.title}>Price Range</h4>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, e.target.value)}
            className={filterStyles.input}
            placeholder="Min"
          />
          <span className="text-neutral-400">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
            className={filterStyles.input}
            placeholder="Max"
          />
        </div>
      </div>

      {/* Sizes */}
      <div className={sectionStyles.wrapper}>
        <h4 className={sectionStyles.title}>Sizes</h4>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`${checkboxStyles.button} ${sizes.includes(size)
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className={sectionStyles.wrapper}>
        <h4 className={sectionStyles.title}>Colors</h4>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`${checkboxStyles.button} ${colors.includes(color)
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
