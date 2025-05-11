"use client"

import { motion, useInView, useScroll } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);
  const ref = useRef(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isInView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
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
    // 이미지 높이를 측정하여 애니메이션 기준점으로 사용
    if (imageRef.current) {
      const img = imageRef.current;
      // 이미지가 로드된 후 높이 측정
      if (img.complete) {
        setImageHeight(img.clientHeight);
      } else {
        img.onload = () => {
          setImageHeight(img.clientHeight);
        };
      }
    }
  }, []);

  useEffect(() => {
    // 스크롤 위치가 이미지 높이의 80% 이상이면 메뉴 표시
    if (scrollPosition >= imageHeight * 0.8) {
      setIsEntered(true);
    } else {
      setIsEntered(false);
    }
  }, [scrollPosition, imageHeight]);

  return (
    <div className="overflow-y-scroll no-scrollbar relative">
      {/* 배경 이미지 */}
      <div className="w-full" style={{ position: 'relative' }}>
        <Image
          ref={imageRef as any}
          src="/images/museum-background.png"
          alt="박물관 배경"
          width={1000}
          height={1500}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* 내용 컨테이너 */}
      <div className="absolute top-0 left-0 w-full h-full z-10">
        {/* 첫 화면 */}
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

        {/* 메뉴 컨테이너 */}
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
