'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/atoms/button';
import {
  sectionStyles,
  backgroundStyles,
  contentStyles,
  scrollIndicatorStyles
} from './index.style';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className={sectionStyles}>
      {/* Background with Parallax */}
      <motion.div style={{ y }} className={backgroundStyles.container}>
        <div className={backgroundStyles.image} />
        <div className={backgroundStyles.overlay} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className={contentStyles.container}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={contentStyles.badge}
        >
          Premium CrossFit Equipment
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={contentStyles.title}
        >
          UNLOCK YOUR
          <span className={contentStyles.titleAccent}>POTENTIAL</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={contentStyles.description}
        >
          Elite gear for elite athletes. Shop premium CrossFit equipment,
          apparel, and accessories designed for peak performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={contentStyles.buttons}
        >
          <Button size="lg" variant="primary">Shop Now</Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            Explore Collection
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className={scrollIndicatorStyles.container}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={scrollIndicatorStyles.content}
        >
          <span className={scrollIndicatorStyles.text}>Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
