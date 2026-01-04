'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/button';
import { useCartStore } from '@/store/useCartStore';
import {
  cardStyles,
  imageContainerStyles,
  badgeStyles,
  contentStyles,
  ratingStyles,
  priceStyles
} from './index.style';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  isNew?: boolean;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating = 0,
  isNew = false,
}: ProductCardProps) {
  const { addItem, removeItem, items } = useCartStore();
  const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);
  // mounted check for hydration safety since we access store items
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isInCart = mounted && items.some((item) => item.id === id);

  const handleAddToCart = () => {
    addItem({ id, name, price, image });
  };

  const handleRemoveClick = () => {
    if (isConfirmingRemove) {
      removeItem(id);
      setIsConfirmingRemove(false);
    } else {
      setIsConfirmingRemove(true);
      // Reset confirmation after 3 seconds if not clicked
      setTimeout(() => setIsConfirmingRemove(false), 3000);
    }
  };

  // Ensure consistent rendering
  const discount = (originalPrice && originalPrice > price)
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial="initial"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      variants={{
        initial: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { y: -5 }
      }}
      transition={{ duration: 0.3 }}
      className={`${cardStyles} ${isInCart ? 'ring-2 ring-primary/50' : ''}`}
    >
      {/* Image Container */}
      <div className={imageContainerStyles.container}>
        <Image
          src={image}
          alt={name}
          fill
          className={imageContainerStyles.image}
        />

        {/* Badges */}
        <div className={badgeStyles.container}>
          {isInCart && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-neutral-900 text-white px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              IN CART
            </motion.span>
          )}
          {isNew && !isInCart && <span className={badgeStyles.new}>NEW</span>}
          {discount > 0 && <span className={badgeStyles.discount}>-{discount}%</span>}
        </div>

        {/* Quick Add / Remove Button */}
        <motion.div
          variants={{
            initial: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.2 }}
          className={imageContainerStyles.quickAdd}
        >
          {isInCart ? (
            <Button
              onClick={handleRemoveClick}
              variant={isConfirmingRemove ? 'secondary' : 'outline'}
              size="sm"
              className={`w-full ${isConfirmingRemove ? 'bg-red-500 text-white hover:bg-red-600 border-red-500' : 'bg-white/90 backdrop-blur border-white/50'}`}
            >
              {isConfirmingRemove ? 'Confirm Remove?' : 'Remove from Cart'}
            </Button>
          ) : (
            <Button onClick={handleAddToCart} variant="primary" size="sm" className="w-full">
              Add to Cart
            </Button>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className={contentStyles.container}>
        <p className={contentStyles.category}>{category}</p>
        <h3 className={contentStyles.title}>{name}</h3>

        {/* Rating */}
        {rating > 0 && (
          <div className={ratingStyles.container}>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={i < rating ? ratingStyles.starFilled : ratingStyles.starEmpty}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className={ratingStyles.count}>({rating})</span>
          </div>
        )}

        {/* Price */}
        <div className={priceStyles.container}>
          <span className={priceStyles.current}>${price.toFixed(2)}</span>
          {originalPrice && (
            <span className={priceStyles.original}>${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
