import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '../ui';

const NewsSection = ({ content }) => {
    return (
        <section id="news" className="py-24 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SectionHeader title={content.title} subtitle="Latest Updates" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {content.items.slice(0, 3).map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-white/5 border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-colors duration-500"
                        >
                            <div className="aspect-video overflow-hidden">
                                {item.images && item.images.length > 0 ? (
                                    <img
                                        src={item.images[0]}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-emerald-900/20" />
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-emerald-400 text-xs font-mono">{item.date}</span>
                                    <div className="h-[1px] flex-1 bg-white/10" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-emerald-300 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                    {item.summary}
                                </p>
                                <Link
                                    to={`/news/${index}`}
                                    className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                                >
                                    <span>{content.details_button || "Read More"}</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        to="/news"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 transition-all duration-300 group"
                    >
                        <span className="tracking-widest text-sm">{content.view_more_button}</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
