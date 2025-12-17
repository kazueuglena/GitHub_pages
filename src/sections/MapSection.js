import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import { SectionHeader } from '../ui';

const MapSection = ({ content, setSelectedDetail }) => {
    const [activePin, setActivePin] = useState(null);

    return (
        <section id="map" className="py-32 relative bg-neutral-900/30">
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                {/* Simplified World Map Background or Grid */}
                <img src="/images/world-map.png" alt="" className="w-full h-full object-cover grayscale opacity-30" onError={(e) => e.target.style.display = 'none'} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#020408]/80 to-[#020408]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <SectionHeader title={content.title} subtitle={content.description} />

                <div className="relative w-full aspect-[2/1] bg-[#050A08] border border-white/5 rounded-3xl shadow-2xl overflow-hidden group">
                    {/* Map Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* Locations */}
                    {content.locations.map((loc) => (
                        <div
                            key={loc.id}
                            className="absolute"
                            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                        >
                            <button
                                onClick={() => setActivePin(activePin === loc.id ? null : loc.id)}
                                className="relative flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2 z-20 group/pin"
                            >
                                <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                                <span className={`absolute inset-0 rounded-full transition-colors duration-300 ${activePin === loc.id ? 'bg-emerald-500' : 'bg-emerald-500/50 group-hover/pin:bg-emerald-500'}`} />
                                <MapPin size={16} className="text-white relative z-10" />
                            </button>

                            <AnimatePresence>
                                {activePin === loc.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute left-1/2 bottom-full mb-4 -translate-x-1/2 w-64 bg-gray-900/90 border border-emerald-500/30 backdrop-blur-md rounded-xl p-4 shadow-xl z-30"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-white font-bold">{loc.name}</h4>
                                            <button onClick={(e) => { e.stopPropagation(); setActivePin(null); }} className="text-gray-400 hover:text-white">
                                                <X size={14} />
                                            </button>
                                        </div>
                                        <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                                            <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-gray-300 text-xs leading-relaxed mb-3">
                                            {loc.details}
                                        </p>
                                        <button
                                            onClick={() => setSelectedDetail(loc)}
                                            className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                                        >
                                            Read Full Story
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MapSection;
