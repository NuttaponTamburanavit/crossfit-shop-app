export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  stock: number;
  sizes?: string[];
  colors?: string[];
  tags?: string[];
}

export interface FilterState {
  search: string;
  category: string | null;
  priceRange: [number, number];
  sort: 'newest' | 'price-asc' | 'price-desc' | 'rating';
  sizes: string[];
  colors: string[];
}
