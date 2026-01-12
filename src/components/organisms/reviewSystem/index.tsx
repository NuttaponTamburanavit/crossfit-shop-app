'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Review, ReviewSummary } from '@/types/review';

interface ReviewSystemProps {
  reviews: Review[];
  summary: ReviewSummary;
}

type SortOption = 'recent' | 'highest' | 'lowest';

export default function ReviewSystem({ reviews, summary }: ReviewSystemProps) {
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [showAll, setShowAll] = useState(false);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getPercentage = (count: number) => {
    return summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-neutral-50 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-6xl font-black text-neutral-900 mb-2">
              {summary.averageRating.toFixed(1)}
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${i < Math.floor(summary.averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-neutral-300 fill-current'
                    }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-sm text-neutral-600">
              Based on {summary.totalReviews} review{summary.totalReviews !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="text-sm font-medium text-neutral-700 w-12">
                  {rating} star{rating !== 1 ? 's' : ''}
                </div>
                <div className="flex-1 h-3 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-500"
                    style={{
                      width: `${getPercentage(summary.ratingDistribution[rating as keyof typeof summary.ratingDistribution])}%`,
                    }}
                  />
                </div>
                <div className="text-sm text-neutral-600 w-12 text-right">
                  {summary.ratingDistribution[rating as keyof typeof summary.ratingDistribution]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-neutral-900">Customer Reviews</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="recent">Most Recent</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {displayedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {review.userAvatar ? (
                    <Image
                      src={review.userAvatar}
                      alt={review.userName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold">
                      {review.userName.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-neutral-900">{review.userName}</h4>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-neutral-300 fill-current'
                          }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-neutral-500 ml-2">{formatDate(review.date)}</span>
                  </div>

                  {/* Review Title */}
                  <h5 className="font-bold text-neutral-900 mb-2">{review.title}</h5>

                  {/* Review Comment */}
                  <p className="text-neutral-700 leading-relaxed mb-4">{review.comment}</p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden">
                          <Image src={img} alt={`Review image ${idx + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Helpful Counter */}
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {reviews.length > 5 && !showAll && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 border-2 border-neutral-900 text-neutral-900 font-bold rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
          >
            Load More Reviews ({reviews.length - 5} more)
          </button>
        </div>
      )}
    </div>
  );
}
