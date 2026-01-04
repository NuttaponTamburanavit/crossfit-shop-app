'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section ref={containerRef} className="py-20 bg-neutral-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image with Parallax */}
          <motion.div
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <motion.div style={{ y: imageY }} className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800"
                alt="CrossFit training"
                fill
                className="object-cover scale-110"
              />
            </motion.div>
            {/* Accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-6">
              Built for Athletes,
              <br />
              <span className="text-primary">By Athletes</span>
            </h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              We started as CrossFit athletes frustrated with gear that couldn&apos;t
              keep up. So we created our own. Every product is designed with one
              goal: to help you push beyond your limits.
            </p>
            <p className="text-neutral-400 leading-relaxed mb-8">
              From competition-grade barbells to performance apparel, we obsess
              over every detail. Because when you&apos;re giving 100%, your gear
              should too.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '50K+', label: 'Athletes' },
                { value: '99%', label: 'Satisfaction' },
                { value: '24/7', label: 'Support' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-neutral-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
