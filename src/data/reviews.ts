import { Review, ReviewSummary } from '@/types/review';

// Mock reviews for Pro Training Barbell 20kg
export const barbellReviews: Review[] = [
  {
    id: 'r1',
    userName: 'Marcus Johnson',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    date: '2026-01-05',
    title: 'Best barbell I\'ve owned',
    comment: 'This barbell is absolutely fantastic. The knurling is perfect - aggressive enough for heavy lifts but won\'t tear your hands apart. The chrome finish is beautiful and the rotation is smooth. Worth every penny for serious lifters.',
    helpful: 24,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400',
    ],
  },
  {
    id: 'r2',
    userName: 'Sarah Mitchell',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    date: '2025-12-28',
    title: 'Competition quality at home',
    comment: 'I use this for Olympic lifting and it performs just like the bars at my gym. The whip is perfect for cleans and snatches. Very impressed with the build quality and the dual knurl marks help with hand placement.',
    helpful: 18,
    verified: true,
  },
  {
    id: 'r3',
    userName: 'David Chen',
    userAvatar: 'https://i.pravatar.cc/150?img=33',
    rating: 4,
    date: '2025-12-15',
    title: 'Great bar, minor shipping issue',
    comment: 'The barbell itself is excellent - solid construction, good spin, and the chrome coating looks premium. Only giving 4 stars because it arrived with a small scratch on the sleeve, but it doesn\'t affect performance. Customer service was responsive.',
    helpful: 12,
    verified: true,
  },
  {
    id: 'r4',
    userName: 'Emily Rodriguez',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    date: '2025-12-10',
    title: 'Perfect for my home gym',
    comment: 'Upgraded from a cheaper bar and the difference is night and day. The balance and feel during lifts is so much better. The bushing rotation is smooth and quiet. Highly recommend for anyone serious about their training.',
    helpful: 31,
    verified: true,
  },
  {
    id: 'r5',
    userName: 'Jake Thompson',
    userAvatar: 'https://i.pravatar.cc/150?img=15',
    rating: 5,
    date: '2025-11-22',
    title: 'Excellent for powerlifting',
    comment: 'I primarily use this for squats, bench, and deadlifts. The bar has minimal whip which is exactly what I want for powerlifting. The knurling provides great grip even without chalk. Very happy with this purchase.',
    helpful: 15,
    verified: true,
  },
  {
    id: 'r6',
    userName: 'Rachel Kim',
    userAvatar: 'https://i.pravatar.cc/150?img=20',
    rating: 4,
    date: '2025-11-08',
    title: 'Solid bar, a bit pricey',
    comment: 'This is a quality barbell with excellent craftsmanship. The only reason I\'m not giving 5 stars is the price point - it\'s a bit steep compared to other options. That said, you definitely get what you pay for in terms of quality and durability.',
    helpful: 8,
    verified: false,
  },
  {
    id: 'r7',
    userName: 'Tom Anderson',
    userAvatar: 'https://i.pravatar.cc/150?img=52',
    rating: 5,
    date: '2025-10-30',
    title: 'Game changer for my training',
    comment: 'After using this bar for 2 months, I can confidently say it\'s improved my lifts. The consistent diameter and quality construction make every rep feel the same. The chrome finish has held up perfectly with regular use.',
    helpful: 22,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400',
    ],
  },
  {
    id: 'r8',
    userName: 'Lisa Wang',
    userAvatar: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    date: '2025-10-15',
    title: 'Professional grade equipment',
    comment: 'As a CrossFit coach, I\'ve used countless barbells and this one ranks among the best. The build quality is exceptional, the rotation is smooth, and it can handle heavy loads without any flex issues. Highly recommend for both home and commercial gyms.',
    helpful: 19,
    verified: true,
  },
  {
    id: 'r9',
    userName: 'Chris Martinez',
    userAvatar: 'https://i.pravatar.cc/150?img=68',
    rating: 3,
    date: '2025-09-28',
    title: 'Good but not great for the price',
    comment: 'It\'s a solid barbell with good construction, but I expected a bit more for the price. The knurling could be slightly more aggressive for my preference. Still a good bar, just not exceptional.',
    helpful: 5,
    verified: true,
  },
  {
    id: 'r10',
    userName: 'Amanda Foster',
    userAvatar: 'https://i.pravatar.cc/150?img=26',
    rating: 5,
    date: '2025-09-12',
    title: 'Worth the investment',
    comment: 'I was hesitant about the price but after using it for several weeks, I\'m convinced it was worth it. The quality is outstanding and it feels like it will last for years. The smooth rotation makes Olympic lifts much more comfortable on the wrists.',
    helpful: 27,
    verified: true,
  },
];

// Review summary for Pro Training Barbell 20kg
export const barbellReviewSummary: ReviewSummary = {
  averageRating: 4.7,
  totalReviews: 10,
  ratingDistribution: {
    5: 7,
    4: 2,
    3: 1,
    2: 0,
    1: 0,
  },
};

// Helper function to get reviews by product slug
export const getReviewsByProductSlug = (slug: string): Review[] => {
  if (slug === 'pro-training-barbell-20kg') {
    return barbellReviews;
  }
  return [];
};

// Helper function to get review summary by product slug
export const getReviewSummaryByProductSlug = (slug: string): ReviewSummary | null => {
  if (slug === 'pro-training-barbell-20kg') {
    return barbellReviewSummary;
  }
  return null;
};
