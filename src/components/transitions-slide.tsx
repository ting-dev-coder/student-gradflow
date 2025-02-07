import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TransitionsSlideProps {
  children: ReactNode;
  opened: boolean;
}
const TransitionsSlide = ({ children, opened }: TransitionsSlideProps) => {
  return (
    <motion.div
      initial={{ opacity: 1, flex: 1, display: 'flex', height: '100%' }}
      animate={{
        opacity: opened ? 0 : 1,
        flex: opened ? 0 : 1,
        width: 0,
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionsSlide;
