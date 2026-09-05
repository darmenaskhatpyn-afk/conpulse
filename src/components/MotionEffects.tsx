import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

// Top scroll progress bar
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 origin-left z-50 pointer-events-none shadow-[0_0_8px_rgba(251,191,36,0.6)]"
    />
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  amount?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 32,
  className = '',
  amount = 0.15
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'scale':
        return { opacity: 0, scale: 0.92, y: 15 };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getTarget = () => {
    switch (direction) {
      case 'scale':
        return { opacity: 1, scale: 1, y: 0 };
      default:
        return { opacity: 1, x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getTarget()}
      viewport={{ once: false, amount, margin: '-20px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  amount?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className = '',
  amount = 0.1
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount, margin: '-30px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'scale' | 'fade';
}> = ({ children, className = '', direction = 'up' }) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : 0,
      scale: direction === 'scale' ? 0.92 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

// Word-by-word animated headline for headings
interface AnimatedWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export const AnimatedWords: React.FC<AnimatedWordsProps> = ({
  text,
  className = '',
  wordClassName = 'inline-block mr-[0.25em]',
  delay = 0,
  highlightWords = [],
  highlightClassName = 'text-amber-500'
}) => {
  const words = text.split(' ');

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.035,
            delayChildren: delay
          }
        }
      }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => {
        const isHighlight = highlightWords.some(hw => 
          word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
              visible: { 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px)',
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } 
              }
            }}
            className={`${wordClassName} ${isHighlight ? highlightClassName : ''}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
};
