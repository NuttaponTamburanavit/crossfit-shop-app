// ProductCard Styles - Encapsulated styling logic

export const cardStyles = 'group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300';

export const imageContainerStyles = {
  container: 'relative aspect-square overflow-hidden bg-neutral-100',
  image: 'object-cover group-hover:scale-110 transition-transform duration-500',
  quickAdd: 'absolute bottom-3 left-3 right-3',
};

export const badgeStyles = {
  container: 'absolute top-3 left-3 flex flex-col gap-2',
  new: 'px-3 py-1 bg-primary text-white text-xs font-bold rounded-full',
  discount: 'px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full',
};

export const contentStyles = {
  container: 'p-4',
  category: 'text-xs text-neutral-500 uppercase tracking-wider mb-1',
  title: 'font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors',
};

export const ratingStyles = {
  container: 'flex items-center gap-1 mb-2',
  starFilled: 'w-4 h-4 text-yellow-400',
  starEmpty: 'w-4 h-4 text-neutral-200',
  count: 'text-xs text-neutral-500 ml-1',
};

export const priceStyles = {
  container: 'flex items-center gap-2',
  current: 'text-lg font-bold text-neutral-900',
  original: 'text-sm text-neutral-400 line-through',
};
