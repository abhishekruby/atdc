'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We add a minimal timeout for demonstration of preloader,
    // or wait for document ready state.
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 1200); // 1200ms delay to ensure smooth transition
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface"
        >
          <div className="flex flex-col items-center">
            {/* Minimalist Progress Line */}
            <div className="relative mb-6 overflow-hidden w-24 h-[3px] bg-surface-container-high rounded-full">
              <motion.div 
                animate={{ 
                  x: ["-100%", "100%"]
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeInOut", 
                  repeat: Infinity 
                }}
                className="absolute top-0 left-0 w-full h-full bg-secondary rounded-full"
              />
            </div>
            
            {/* Elegant Typography Stagger */}
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-primary font-black text-4xl tracking-[0.2em]"
              >
                ATDC
              </motion.h2>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-secondary font-bold tracking-[0.3em] text-[10px] mt-3 uppercase"
            >
              Diagnostic Excellence
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
