'use client';

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
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ id, name, price, image });
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
      className={cardStyles}
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
          {isNew && <span className={badgeStyles.new}>NEW</span>}
          {discount > 0 && <span className={badgeStyles.discount}>-{discount}%</span>}
        </div>

        {/* Quick Add Button */}
        <motion.div
          variants={{
            initial: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.2 }}
          className={imageContainerStyles.quickAdd}
        >
          <Button onClick={handleAddToCart} variant="primary" size="sm" className="w-full">
            Add to Cart
          </Button>
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
