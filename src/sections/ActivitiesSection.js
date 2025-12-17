import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionHeader } from '../ui';

const ActivitiesSection = ({ content, setSelectedDetail }) => {
    return (
        <section id="activities" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SectionHeader title={content.title} subtitle="Involvements" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedDetail(item)}
                            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-neutral-900/40 hover:border-emerald-500/30 transition-all duration-500"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                            <div className="absolute inset-0 p-6 flex flex-col justify-end items-start">
                                <span className="inline-block px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs mb-2 backdrop-blur-md">
                                    {item.event}
                                </span>
                                <h3 className="text-xl font-bold mb-1 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.details}</p>

                                <div className="flex items-center gap-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="text-sm border-b border-white/30 pb-0.5">Details</span>
                                    {item.link && (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-white transition-colors">
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ActivitiesSection;
