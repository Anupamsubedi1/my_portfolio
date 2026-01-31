'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function TravelGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of all travel photos
  const travelPhotos = [
    '/travels/travel-1.jpg',
    '/travels/travel-2.jpg',
    '/travels/travel-3.jpg',
    '/travels/travel-4.jpg',
    '/travels/travel-5.jpg',
    '/travels/travel-6.jpg',
    '/travels/travel-7.jpg',
    '/travels/travel-8.jpg',
    '/travels/travel-9.jpg',
  ];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % travelPhotos.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + travelPhotos.length) % travelPhotos.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Travel Gallery
              </span>
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Exploring the beautiful landscapes of Nepal 🏔️
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {travelPhotos.map((photo, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-2xl shadow-lg group"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={photo}
                alt={`Travel photo ${index + 1}`}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium">Photo {index + 1}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors z-[201]"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Previous Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors z-[201]"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>

              {/* Next Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors z-[201]"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.button>

              {/* Image Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={travelPhotos[currentIndex]}
                      alt={`Travel photo ${currentIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium"
              >
                {currentIndex + 1} / {travelPhotos.length}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
