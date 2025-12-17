import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const GradientText = ({ children, className = "" }) => (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 ${className}`}>
        {children}
    </span>
);

export const AnimatedText = ({ text, className = "" }) => {
    return (
        <span className={`inline-block overflow-hidden ${className}`}>
            <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                viewport={{ once: true }}
                className="inline-block"
            >
                {text}
            </motion.span>
        </span>
    );
};

export const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{ x: cursorXSpring, y: cursorYSpring }}
        >
            <div className="w-full h-full rounded-full border border-white/50 bg-white/10 backdrop-blur-[1px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-emerald-400 rounded-full" />
        </motion.div>
    );
};

export const SectionHeader = ({ title, subtitle }) => (
    <div className="mb-12 md:mb-20">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
        >
            <div className="w-12 h-[1px] bg-emerald-500/50" />
            <span className="text-emerald-400 tracking-[0.2em] text-sm font-medium uppercase">{title}</span>
        </motion.div>
        {subtitle && (
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-['Syne'] font-bold leading-tight"
            >
                {subtitle}
            </motion.h2>
        )}
    </div>
);
