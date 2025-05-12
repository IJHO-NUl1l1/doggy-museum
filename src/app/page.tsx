"use client";

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.clientHeight);
    }
  }, [imageRef]);

  useEffect(() => {
    if (scrollPosition >= imageHeight * 0.8) {
      setIsEntered(true);
    } else {
      setIsEntered(false);
    }
  }, [scrollPosition, imageHeight]);

  return (
    <div className="overflow-y-scroll no-scrollbar relative">
      <div className="w-full" style={{ position: 'relative' }} ref={imageRef}>
        <Image
          src="/images/museum-background.png"
          alt="박물관 배경"
          width={1000}
          height={1500}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-screen flex items-center justify-center"
        >
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl text-white font-bold mb-4"
            >
              Doggy Museum
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white text-lg md:text-xl"
            >
              Scroll down to explore
            </motion.div>
          </div>
        </motion.div>

        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50">
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={isEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.5 }}
              className="text-white text-2xl font-semibold mb-8"
            >
              Explore
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={isEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.5 }}
              className="text-white text-xl space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="cursor-pointer transition-all duration-300 hover:text-yellow-400"
              >
                History
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="cursor-pointer transition-all duration-300 hover:text-yellow-400"
              >
                Art
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="cursor-pointer transition-all duration-300 hover:text-yellow-400"
              >
                Gallery
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
