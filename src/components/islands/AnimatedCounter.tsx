import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = end * easeOutQuart;

      setCount(decimals > 0 ? parseFloat(currentCount.toFixed(decimals)) : Math.floor(currentCount));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, decimals, isInView]);

  return (
    <span ref={ref} className={className}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}{suffix}
    </span>
  );
}


