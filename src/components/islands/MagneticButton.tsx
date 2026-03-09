import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', href, onClick }: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPosition({
      x: x * 0.2, // Magnetic strength
      y: y * 0.2
    });
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
      href={href}
      onClick={onClick}
      className={`btn-brutal-magnetic ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovering ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      <motion.span
        className="block"
        animate={{
          scale: isHovering ? 0.95 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 10,
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
}


