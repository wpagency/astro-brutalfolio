import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrutalCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 1024) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Check if hovering over interactive elements
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, [role="button"], .hover-target, input, textarea, select');
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 400,
          mass: 0.5,
        }}
      >
        <div className="w-full h-full bg-brutal-yellow border-2 border-brutal-black"></div>
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998]"
        animate={{
          x: mousePos.x - 24,
          y: mousePos.y - 24,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 1,
        }}
      >
        <div className="w-full h-full border-4 border-brutal-black opacity-30"></div>
      </motion.div>

      {/* Click effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed w-16 h-16 pointer-events-none z-[9997]"
            style={{ left: mousePos.x - 32, top: mousePos.y - 32 }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="w-full h-full border-4 border-brutal-yellow"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


