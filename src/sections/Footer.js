import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ content }) => {
    return (
        <footer className="py-20 border-t border-white/5 bg-black/50 backdrop-blur-sm relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-16">
                    <div className="col-span-2 md:col-span-1">
                        <h2 className="text-2xl font-bold font-['Syne'] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Kazuhiro Komatsu
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Exploring the roots of intelligence through plants and AI.
                        </p>
                    </div>

                    {content.columns.map((col, idx) => (
                        <div key={idx}>
                            <h4 className="text-white font-bold mb-6">{col.title}</h4>
                            <ul className="space-y-4">
                                {col.items.map((item, i) => (
                                    <li key={i}>
                                        <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors text-sm">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
                    <p className="text-gray-600 text-xs text-center md:text-left">
                        &copy; 2025 Kazuhiro Komatsu. All Rights Reserved.
                    </p>
                    <p className="text-gray-700 text-xs mt-2 md:mt-0">
                        Designed with Botanical Intelligence.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
