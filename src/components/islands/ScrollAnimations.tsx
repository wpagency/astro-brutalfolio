import { useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up'
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  const directionOffset = {
    up: { y: 60 },
    down: { y: -60 },
    left: { x: 60 },
    right: { x: -60 }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          ...directionOffset[direction],
          rotate: direction === 'left' ? -5 : direction === 'right' ? 5 : 0
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          transition: {
            duration: 0.8,
            delay,
            ease: [0.17, 0.67, 0.83, 0.67] // Brutal easing
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ScrollAnimations() {
  useEffect(() => {
    // Add stagger animations to elements with data-animate attribute
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');

            // Add brutal shake effect on some elements
            if (entry.target.hasAttribute('data-shake')) {
              entry.target.style.animation = 'shake 0.5s ease-out';
            }
          }, index * 100); // Stagger effect
        }
      });
    }, observerOptions);

    // Observe all elements with animate class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(40px) rotate(-2deg);
        transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      }

      .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0) rotate(0);
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-10px) rotate(-1deg); }
        20% { transform: translateX(10px) rotate(1deg); }
        30% { transform: translateX(-10px) rotate(-1deg); }
        40% { transform: translateX(10px) rotate(1deg); }
        50% { transform: translateX(0) rotate(0); }
      }

      .brutal-parallax {
        transition: transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      }
    `;
    document.head.appendChild(style);

    // Parallax effect on scroll with throttling and requestAnimationFrame
    let scrollAnimationFrameId: number | null = null;

    const handleScroll = () => {
      // Cancel previous animation frame if still pending (throttling)
      if (scrollAnimationFrameId !== null) {
        return;
      }

      // Schedule scroll animation on next frame for better performance
      scrollAnimationFrameId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;

        document.querySelectorAll('.parallax-slow').forEach(el => {
          const speed = 0.5;
          const yPos = -(scrolled * speed);
          (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
        });

        document.querySelectorAll('.parallax-fast').forEach(el => {
          const speed = 1.5;
          const yPos = -(scrolled * speed);
          (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
        });

        // Rotate on scroll
        document.querySelectorAll('.rotate-on-scroll').forEach(el => {
          const rotation = scrolled * 0.1;
          (el as HTMLElement).style.transform = `rotate(${rotation}deg)`;
        });

        scrollAnimationFrameId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      style.remove();
    };
  }, []);

  return null;
}


