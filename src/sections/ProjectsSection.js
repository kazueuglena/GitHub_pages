import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../ui';

const ProjectsSection = ({ content, setSelectedDetail }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % content.items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + content.items.length) % content.items.length);
    };

    return (
        <section id="projects" className="py-32 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020408] to-[#0A100D] pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/5 blur-3xl rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SectionHeader title={content.title} subtitle="Featured Works" />

                <div className="relative">
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="grid lg:grid-cols-2 gap-0"
                            >
                                {/* Image Info */}
                                <div className="relative aspect-[4/3] lg:aspect-auto h-full min-h-[400px]">
                                    <img
                                        src={content.items[currentIndex].image}
                                        alt={content.items[currentIndex].title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/80" />
                                </div>

                                {/* Content Info */}
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs tracking-wider">
                                            PROJECT
                                        </div>
                                        <span className="text-gray-400 text-xs font-mono">{content.items[currentIndex].period}</span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                        {content.items[currentIndex].title}
                                    </h3>

                                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                        {content.items[currentIndex].description}
                                    </p>

                                    <div className="flex items-center gap-6 mt-auto">
                                        <button
                                            onClick={() => setSelectedDetail(content.items[currentIndex])}
                                            className="group flex items-center gap-3 text-white hover:text-emerald-400 transition-colors"
                                        >
                                            <span className="text-sm tracking-widest uppercase border-b border-transparent group-hover:border-emerald-400 pb-0.5">View Details</span>
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8">
                        <div className="flex gap-2">
                            {content.items.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-12 h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-emerald-500' : 'bg-white/10 hover:bg-white/20'}`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <button onClick={prevSlide} className="p-3 rounded-full border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-white hover:text-emerald-400">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextSlide} className="p-3 rounded-full border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-white hover:text-emerald-400">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                        >
                            <span>{content.view_all_button}</span>
                            <ExternalLink size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
