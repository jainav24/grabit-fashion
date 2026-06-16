import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [videoSrc] = useState(() => 
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
      ? '/Loading_vertical.mp4'
      : '/Loading.mp4'
  );
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setIsFinished(true);
    // Wait for the swipe-up animation to finish before calling onComplete
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isFinished ? (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          exit={{
            y: '-100%',
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1], // Smooth cubic-bezier for premium swipe
            },
          }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ) : (
        /* Brief overlay that swipes up */
        <motion.div
          key="swipe"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[9999] bg-black"
        />
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
