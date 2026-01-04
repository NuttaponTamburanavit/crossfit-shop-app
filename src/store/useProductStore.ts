import { create } from 'zustand';
import { Product, FilterState } from '@/types/product';
import { products } from '@/data/products';

interface ProductStore extends FilterState {
  products: Product[];
  filteredProducts: Product[];
  
  // Actions
  setSearch: (search: string) => void;
  setCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setSort: (sort: FilterState['sort']) => void;
  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  search: '',
  category: null,
  priceRange: [0, 1000],
  sort: 'newest',
  sizes: [],
  colors: [],
};

const filterProducts = (products: Product[], filters: FilterState): Product[] => {
  let result = [...products];

  // Search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Category
  if (filters.category && filters.category !== 'All') {
    result = result.filter((p) => p.category === filters.category);
  }

  // Price Range
  result = result.filter(
    (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  );

  // Sizes
  if (filters.sizes.length > 0) {
    result = result.filter((p) =>
      p.sizes ? p.sizes.some((s) => filters.sizes.includes(s)) : false
    );
  }

  // Colors
  if (filters.colors.length > 0) {
    result = result.filter((p) =>
      p.colors ? p.colors.some((c) => filters.colors.includes(c)) : false
    );
  }

  // Sort
  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
      break;
  }

  return result;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: products,
  filteredProducts: products, // Initial state needs to apply default sort if needed, but simple assignment is fine for now
  ...initialFilters,

  setSearch: (search) => {
    set((state) => {
      const newFilters = { ...state, search };
      return {
        ...newFilters,
        filteredProducts: filterProducts(state.products, newFilters),
      };
    });
  },

  setCategory: (category) => {
    set((state) => {
      const newFilters = { ...state, category };
      return {
        ...newFilters,
        filteredProducts: filterProducts(state.products, newFilters),
      };
    });
  },

  setPriceRange: (range) => {
    set((state) => {
      const newFilters = { ...state, priceRange: range };
      return {
        ...newFilters,
        filteredProducts: filterProducts(state.products, newFilters),
      };
    });
  },

  setSort: (sort) => {
    set((state) => {
      const newFilters = { ...state, sort };
      return {
        ...newFilters,
        filteredProducts: filterProducts(state.products, newFilters),
      };
    });
  },

  toggleSize: (size) => {
    set((state) => {
      const sizes = state.sizes.includes(size)
        ? state.sizes.filter((s) => s !== size)
        : [...state.sizes, size];
      const newFilters = { ...state, sizes };
      return {
        ...newFilters,
        filteredProducts: filterProducts(state.products, newFilters),
      };
    });
  },

  toggleColor: (color) => {
    set((state) => {
      const colors = state.colors.includes(color)
        ? state.colors.filter((c) => c !== color)
        : [...state.colors, color];
      const newFilters = { ...state, colors };
      return {
        ...newFilters,
        filteredProducts: filterProducts(state.products, newFilters),
      };
    });
  },

  resetFilters: () => {
    set((state) => ({
      ...initialFilters,
      filteredProducts: filterProducts(state.products, initialFilters),
    }));
  },
}));
