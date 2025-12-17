import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NodeIntro = ({ onFinish }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer1 = setTimeout(() => setStep(1), 1000); // 1秒後にテキスト表示
        const timer2 = setTimeout(() => setStep(2), 4000); // 4.0秒後にフェードアウト開始 (+1.5s)
        const timer3 = setTimeout(() => onFinish(), 5000); // 5.0秒後に終了 (+1.5s)

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onFinish]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="relative flex flex-col items-center">
                {/* 中央で脈動するノード */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: step >= 1 ? [1, 1.2, 1] : 0,
                        opacity: step >= 1 ? 1 : 0
                    }}
                    transition={{ duration: 0.8, times: [0, 0.5, 1], repeat: step === 1 ? Infinity : 0 }}
                    className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] mb-8"
                />

                {/* テキスト */}
                <div className="overflow-hidden h-8 flex items-center justify-center">
                    <AnimatePresence mode='wait'>
                        {step === 1 && (
                            <motion.span
                                key="text1"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-xl font-light tracking-[0.2em] font-['Syne',_sans-serif] text-emerald-100/80"
                            >
                                CONNECTING...
                            </motion.span>
                        )}
                        {step === 2 && (
                            <motion.span
                                key="text2"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-xl font-light tracking-[0.2em] font-['Syne',_sans-serif] text-emerald-100/80"
                            >
                                ESTABLISHED
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                {/* 装飾的なライン */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: step >= 1 ? 1 : 0 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                />
            </div>
        </motion.div>
    );
};

export default NodeIntro;
