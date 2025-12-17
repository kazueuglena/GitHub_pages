import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedText = ({ text }) => (
    <AnimatePresence mode="wait">
        <motion.span key={text} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {text}
        </motion.span>
    </AnimatePresence>
);

export default AnimatedText;
