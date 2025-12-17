import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Mail } from 'lucide-react';
import { SectionHeader } from '../ui';

const ContactSection = ({ content }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-32 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <SectionHeader title={content.title} />

                <h2 className="text-4xl md:text-6xl font-['Syne'] font-bold mb-8 leading-tight">
                    {content.description.split('\n').map((line, i) => (
                        <span key={i} className="block">{line}</span>
                    ))}
                </h2>

                <div className="flex flex-col items-center gap-6 mt-12">
                    <button
                        onClick={handleCopy}
                        className="group relative flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
                    >
                        <Mail size={20} className="text-gray-400 group-hover:text-emerald-400" />
                        <span className="text-xl md:text-2xl font-mono text-gray-300 group-hover:text-white transition-colors">
                            {content.email}
                        </span>
                        <div className="pl-4 border-l border-white/10 text-gray-400 group-hover:text-emerald-400">
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                        </div>

                        <AnimatePresence>
                            {copied && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full mt-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-emerald-500 text-black text-xs font-bold"
                                >
                                    COPIED!
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    <div className="flex gap-6 mt-8">
                        {/* Social Links placeholder or real ones from content if available */}
                        {/* Assuming content.socials exists or hardcoding common ones */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
